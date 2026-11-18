```
CROSSFADE — a two-deck DJ app that suggests what to mix next
=============================================================

OPEN IT
  Online:  https://kyancloud02.github.io/crossfade/  (nothing to install)

  Or run it offline on your own computer:
  Mac:     double-click "Start Crossfade (Mac).command"
           (first time: if macOS blocks it, right-click it → Open → Open)
  Windows: double-click "Start Crossfade (Windows).bat"
  Your browser opens at http://127.0.0.1:8765 — keep the little terminal
  window open while you play. Needs Python (built into most Macs;
  Windows: python.org/downloads). Chrome or Edge recommended.

ADD MUSIC  (+ Add music button)
  • Links    – paste YouTube or SoundCloud links, one per line.
  • Files    – drop MP3/WAV/AIFF/FLAC files. BPM, key and energy are
               detected automatically, and you get full tempo, sync, EQ
               and key lock.
  • Spotify  – imports your Liked Songs and playlists (one-time setup of
               a free Spotify developer app; steps are in the tab).
               Spotify doesn't let other apps mix its audio, so those
               songs play through a matching YouTube upload.
  • Search   – search YouTube inside the app (needs a free YouTube API
               key; steps are in the tab). The key also lets Spotify songs
               find their YouTube version automatically.
  • CSV      – Exportify / rekordbox / Serato / Mixed In Key exports.

HOW SUGGESTIONS WORK
  "Up next" ranks your whole library against what's playing:
  • Key: Camelot-wheel compatibility (same key, ±1, relative maj/min…)
  • Tempo: within a few % (half/double time counts)
  • Energy flow: Build ↗ / Hold → / Cool down ↘
  • Vibe: shared genres and playlists
  • What you like: finished mixes and 👍/👎 teach it over time
  Tracks from YouTube/Spotify don't come with BPM/key. Hit TAP on a deck
  in time with the beat (or ✎ to type them in) and suggestions get much
  sharper.

AUTO DJ
  Toggle it on and it queues the best match on the free deck and mixes it
  in for the "Mix length" before each track ends.

KEYS:  Q / P play deck A / B · ← → crossfader · M mix to the other deck

LIMITS
  YouTube: no EQ; tempo snaps to the speeds YouTube allows.
  SoundCloud: volume and crossfader only. Some uploads block embedding;
  Crossfade will try another version or ask you for a link.
  Your library is stored in the browser you use it in (it doesn't sync
  between computers or between the online and offline copies).
```
