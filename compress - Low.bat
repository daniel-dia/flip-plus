@echo off
del CocoonPackage_low.zip

"C:\Program Files\7-Zip\7z" a CocoonPackage_low.zip index.html assets scripts style data fonts
timeout 1
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.mp3 -r
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.xmp -r
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.tmp -r
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.map -r
timeout 1
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.bat -r
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.db -r
timeout 1
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/images
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/imagens
timeout 1
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/images@1x
timeout 1