@echo off
del LudeiPackage.zip

"C:\Program Files\7-Zip\7z" a CocoonPackage.zip index.html assets scripts style data fonts
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip *.mp3 -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip *.xmp -r
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip *.bat -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip *.db -r
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip assets/images
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage.zip assets/imagens

timeout 2