::delete old
::del  "..\Plataform\windows\Flip+ W\index.html" /y /s
del  "..\Plataform\windows\Flip+ W\assets"  /s /f /q
del  "..\Plataform\windows\Flip+ W\scripts"  /s /f /q
del  "..\Plataform\windows\Flip+ W\data"  /s /f /q
del  "..\Plataform\windows\Flip+ W\style"  /s /f /q

SET target="..\Plataform\windows\Flip+ W\"

::copy all
xcopy index.html %target% /y /s 
xcopy assets %target%\assets /y /s /i 
xcopy scripts %target%\scripts /y /s /i 
xcopy data %target%\data /y /s  /i 
xcopy style %target%\style /y /s /i 

::remove unused
del "..\Plataform\windows\Flip+ W\assets\sound\*.ogg" /s /f /q
del "..\Plataform\windows\Flip+ W\assets\images\*" /s /f /q
del "..\Plataform\windows\Flip+ W\assets\images@1x\*" /s /f /q
