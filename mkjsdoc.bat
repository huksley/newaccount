@echo off
setlocal enableextensions enabledelayedexpansion
REM set JS=
REM for /r include %%i in (*.js) do echo %%i && set JS=!JS! %%i
REM echo !JS!
jsdoc -c jsdoc.json -d doc -R README.md -P include/package.json -t %AppData%/npm/node_modules/ink-docstrap/template -r include
REM !JS!
