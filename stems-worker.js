// Crossfade stem splitter — runs Meta's Demucs (HTDemucs, MIT) in the browser via ONNX Runtime Web.
import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.31.1/dist/ort.min.mjs';
import { DemucsProcessor } from './vendor/demucs-web/index.js';

ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.31.1/dist/';
ort.env.wasm.numThreads = self.crossOriginIsolated ? Math.min(4, navigator.hardwareConcurrency || 2) : 1;

let proc = null, backend = null, curId = 0;
const post = (m, t) => self.postMessage(m, t || []);

async function pickBackend() {
  try { if (navigator.gpu) { const a = await navigator.gpu.requestAdapter(); if (a) return 'gpu'; } } catch (e) {}
  return 'cpu';
}
async function fetchModel(url, id) {
  let cache = null;
  try { cache = await caches.open('crossfade-models-v1'); const hit = await cache.match(url); if (hit) return await hit.arrayBuffer(); } catch (e) {}
  const r = await fetch(url);
  if (!r.ok) throw new Error('model download failed (HTTP ' + r.status + ')');
  const total = +r.headers.get('Content-Length') || 172e6;
  const reader = r.body.getReader(); const chunks = []; let got = 0;
  for (;;) { const { done, value } = await reader.read(); if (done) break; chunks.push(value); got += value.length;
    post({ type: 'progress', id, stage: 'download', p: Math.min(1, got / total), backend }); }
  const buf = new Uint8Array(got); let o = 0; for (const c of chunks) { buf.set(c, o); o += c.length; }
  try { if (cache) await cache.put(url, new Response(buf.slice())); } catch (e) {}
  return buf.buffer;
}
function makeProc(eps) {
  return new DemucsProcessor({ ort, sessionOptions: { executionProviders: eps },
    onProgress: p => post({ type: 'progress', id: curId, stage: 'split', p: p.progress, backend }) });
}
async function init(url, id) {
  backend = await pickBackend();
  post({ type: 'progress', id, stage: 'download', p: 0, backend });
  const buf = await fetchModel(url, id);
  post({ type: 'progress', id, stage: 'init', p: 0, backend });
  if (backend === 'gpu') {
    try { proc = makeProc(['webgpu', 'wasm']); await proc.loadModel(buf.slice(0)); return; }
    catch (e) { console.warn('WebGPU failed, falling back to CPU', e); backend = 'cpu'; }
  }
  proc = makeProc(['wasm']); await proc.loadModel(buf);
}
self.onmessage = async e => {
  const m = e.data; if (m.type !== 'split') return;
  const id = m.id;
  try {
    if (!proc) await init(m.modelUrl, id);
    curId = id;
    post({ type: 'progress', id, stage: 'split', p: 0, backend });
    const r = await proc.separate(m.left, m.right);
    const out = {}, tr = [];
    for (const k of ['drums', 'bass', 'other', 'vocals']) { out[k] = { left: r[k].left, right: r[k].right }; tr.push(r[k].left.buffer, r[k].right.buffer); }
    post({ type: 'done', id, stems: out, backend }, tr);
  } catch (err) {
    post({ type: 'error', id, message: String((err && err.message) || err) });
  }
};
