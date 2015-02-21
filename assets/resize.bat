@echo off
call:copyAndResize images images_0.5x 50%%%% 
call:copyAndResize images images_0.25x 25%%%% 
goto:eof

:copyAndResize
echo. Resising "%~1"  "%~2"  at "%~3"
for /f %%a in ('xcopy "%~1"  "%~2" /L /D /Y') do @(
	if exist "%%a" (
		echo. %%a 
		xcopy "%%a" "%~2" /D /Y /Q > nul
		convert %~2/%%~nxa -resize %~3 %~2/%%~nxa 
	)
)

goto:eof
@pause
