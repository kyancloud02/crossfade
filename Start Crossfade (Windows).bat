@echo off
cd /d "%~dp0"
echo Starting Crossfade at http://127.0.0.1:8765  (leave this window open; close it to stop)
start "" http://127.0.0.1:8765/
python -m http.server 8765 --bind 127.0.0.1 2>nul || py -m http.server 8765 --bind 127.0.0.1
if errorlevel 1 (echo. & echo Python is needed: install it from https://www.python.org/downloads/ then run this again. & pause)
