module FlipPlus.Menu.View {
    export class PauseMenu extends gameui.UIItem {
        private skipPriceText: PIXI.extras.BitmapText;
        private skipPriceIcon: PIXI.DisplayObject;

        constructor() {
            super();
            this.visible = false;

            // add menu buttons
            var p0 = -600;
            var p = 0;
            var s = 330;

            var soundMenu = new FlipPlus.Menu.View.SoundMenu();
            soundMenu.y = p0;
            this.addChild(soundMenu);
            p++;


            this.addChild(new gameui.IconBitmapTextButton("menu/icleave", StringResources.leave.toUpperCase(), "fontWhite", "menu/btmenu", () => {
                this.emit("leave")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++;

            var skipBt = new gameui.IconBitmapTextButton("menu/icskip", StringResources.skip.toUpperCase(), "fontWhite", "menu/btmenu", () => {
                this.emit("skip");
            }, undefined, "left")
            skipBt.set({ y: p0 + p * s });
            skipBt.bitmapText.y = -40;
            this.addChild(skipBt);
            this.skipPriceText = gameui.AssetsManager.getBitmapText("", "fontWhite");
            this.skipPriceText.set({ x: skipBt.bitmapText.x });
            this.skipPriceIcon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            this.skipPriceIcon.set({ x: skipBt.bitmapText.x + 100, y: 20, scaleX: 0.8, scaleY: 0.8 })

            skipBt.addChild(this.skipPriceIcon);
            skipBt.addChild(this.skipPriceText );
            p++


            this.addChild(new gameui.IconBitmapTextButton("menu/icrestart", StringResources.restart.toUpperCase(), "fontWhite", "menu/btmenu", () => {
                this.emit("restart")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++


            this.addChild(new gameui.IconBitmapTextButton("menu/iccontinue", StringResources.continue.toUpperCase(), "fontWhite", "menu/btmenu", () => {
                this.emit("continue")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++
        }

        public updateSkipPrice(price: number) {
            this.skipPriceText.text = price.toString();
            this.skipPriceIcon.x = this.skipPriceText.x + this.skipPriceText.getLocalBounds().width + 30; 
        }
    }
}
