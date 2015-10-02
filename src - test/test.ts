declare var imageManifest

class Test {

    public static init() {
        var gs = new gameui.GameScreen("gameDiv", 500, 500)

        gameui.AssetsManager.loadAssets(imageManifest, "assets/images_1x/")
        gameui.AssetsManager.loadFontSpriteSheet("fontTitle", "fontTitle.fnt");

        gameui.AssetsManager.onProgress = (n) => { console.log(n) }
        gameui.AssetsManager.onComplete = () => {
            var s = new gameui.ScreenState();
            var img = gameui.AssetsManager.getBitmap("Bonus1/back");
            s.content.addChild(img);

            PIXI.DisplayObject.prototype.scale
            var s2 = new gameui.ScreenState();
            var img2 = gameui.AssetsManager.getBitmap("Bonus1/barrel7")
            s2.content.addChild(img2);
            img2.x = 100;

            var btx = gameui.AssetsManager.getBitmapText("TESTE", "fontTitle");
           s2.content.addChild(btx);
           btx.y = 100;
           btx.x = 100;

            var b = new gameui.ImageButton("Bonus1/barrel7", () => { alert("X")});
            s2.content.addChild(b);                                   
            gs.switchScreen(s);                                       
                                                                      
   
            setTimeout(() => {
                gs.switchScreen(s2)


            }, 1000);
        }
    }

}