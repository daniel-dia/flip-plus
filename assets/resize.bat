@echo off
setlocal enabledelayedexpansion
call:copyAndResize images_1x images_0.5x 50%%%% 
call:copyAndResize images_1x images_0.25x 25%%%% 
goto:eof

:copyAndResize
echo. Resising "%~1"  "%~2"  at "%~3"
for /f %%a in ('xcopy "%~1"  "%~2" /L /D /S /Y') do @(
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
	)
)
 
goto:eof
