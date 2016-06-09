@echo off
del CocoonPackage_low.zip

"C:\Program Files\7-Zip\7z" a CocoonPackage_low.zip index.html assets scripts style data fonts
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.mp3 -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.xmp -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.tmp -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.map -r
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.bat -r
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip *.db -r
timeout 2
echo ------------------------------------------------------
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/images
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/imagens
timeout 2
"C:\Program Files\7-Zip\7z" d CocoonPackage_low.zip assets/images@1x
timeout 2