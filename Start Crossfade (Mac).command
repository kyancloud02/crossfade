#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Crossfade at http://127.0.0.1:8765  (leave this window open while you play; close it to stop)"
(sleep 1; open "http://127.0.0.1:8765/") &
python3 -m http.server 8765 --bind 127.0.0.1
