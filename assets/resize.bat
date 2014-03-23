xcopy images_1x images_0.5x /y /s
cd images_0.5x
for /r %%f in (*.*) do convert %%f -resize 50%% %%f
cd..

xcopy images_1x images_0.25x /y /s
cd images_0.25x
for /r %%f in (*.*) do convert %%f -resize 25%% %%f
cd..

@pause