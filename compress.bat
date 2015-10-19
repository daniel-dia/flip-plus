@echo off
del LudeiPackage.zip

"C:\Program Files\7-Zip\7z" a LudeiPackage.zip index.html assets scripts style data fonts
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d LudeiPackage.zip *.mp3 -r
"C:\Program Files\7-Zip\7z" d LudeiPackage.zip *.xmp -r
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d LudeiPackage.zip *.bat -r
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d LudeiPackage.zip assets/images
"C:\Program Files\7-Zip\7z" d LudeiPackage.zip assets/imagens

timeout 10