@echo off
for /r %%i in (*.jpg, *.jpeg, *.png) do (
    magick "%%i" -strip -quality 60 "%%i"
)