# Crossfade

A two-deck DJ app in your browser that suggests what to mix next.

**Open it:** https://kyancloud02.github.io/crossfade/ (once GitHub Pages is on), or run it offline with the Start file for your computer.

## What's in it
- **Two decks** you can play at the same time, with a crossfader (centre = both full), channel volume, tempo, SYNC, key lock, CUE, TAP-for-BPM
- **Knobs** for Low / Mid / High (with kill), Filter (low-pass ↔ high-pass), Echo (beat-synced) and Reverb
- **Stems**: split a song into **Drums / Bass / Melody / Vocals** with a knob and MUTE for each. It uses Meta's Demucs AI model running in your browser; the 172 MB model downloads once, and each song is split once and saved
- **Hot cues** (4 per track) and **beat loops** (1–16 beats), plus 4-beat jumps
- **Up next**: ranks your library by key compatibility (Camelot wheel), tempo, energy flow (Build / Hold / Cool down) and genre, and learns from your 👍/👎
- **Auto DJ**: queues the best match and mixes it in, with an automatic **bass swap** halfway through
- Music from **YouTube, SoundCloud, Spotify, audio files and CSV**, including YouTube playlists, SoundCloud sets and Spotify playlists/albums (paste the link)

## What works with each source
| | Play & mix | BPM/key auto-detect | EQ / Filter / FX | Stems |
|---|---|---|---|---|
| Audio files | ✅ | ✅ | ✅ | ✅ |
| SoundCloud | ✅ | TAP | full-control mode only* | full-control mode only* |
| YouTube | ✅ | TAP | — | — |
| Spotify | ✅ via YouTube match | TAP | — | — |

\*SoundCloud full control needs your own SoundCloud developer app (currently requires Artist Pro). YouTube and Spotify never let web apps access their audio, so a song's audio file is the way to get every control.

## Keys
`Q` / `P` play A / B · `←` `→` crossfader · `M` mix to the other deck · `1`–`4` mute deck A stems · `7`–`0` mute deck B stems

## Run offline
Mac: double-click `Start Crossfade (Mac).command` (first time: right-click → Open). Windows: double-click `Start Crossfade (Windows).bat` (needs Python). It opens http://127.0.0.1:8765. Splitting stems still needs internet the first time, to download the model.

Stem splitting uses [demucs-web](https://github.com/timcsy/demucs-web) (MIT) and Meta's [Demucs](https://github.com/facebookresearch/demucs) (MIT).
