@echo off
SET PATH=%PATH%;C:\Users\artsj_000\Documents\Trabalhos\Games\Tools\pngquant

setlocal enabledelayedexpansion
call:copyAndResize images images@1x 100%%%% 
call:copyAndResize images images@0.5x 50%%%% 
call:copyAndResize images images@0.25x 25%%%% 
echo DONE
PAUSE

goto:eof

:copyAndResize
echo. Resising "%~1"  "%~2"  at "%~3"
for /f "tokens=*" %%a in ('xcopy "%~1"  "%~2" /L /D /S /Y') do @(
	if exist "%%a" (
		echo. %%a 
				
		set find=%~1
		set replace=%~2
		
		set np=%%~dpa
		call set np=%%np:!find!=!replace!%%
		
		set nf=%%a
		call set nf=%%nf:!find!=!replace!%%

		xcopy "%%a" "!np!" /D /Y /Q > nul
		convert "!nf!" -resize %~3 "!nf!"
		pngquant --force --quality=35-85 "!nf!" --ext .png
	)
)
 
goto:eof
