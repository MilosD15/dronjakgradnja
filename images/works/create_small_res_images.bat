@echo off

for /r %%i in (*.jpg, *.jpeg, *.png) do (
    ffmpeg -i "%%i" -vf scale=20:-1 "%%~dpni-small%%~xi"
)