@echo off

for /r %%i in (*-small.*) do (
    del "%%i"
)