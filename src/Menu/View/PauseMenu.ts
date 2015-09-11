module FlipPlus.Menu.View {
    export class PauseMenu extends gameui.UIItem {
        private skipPriceText: createjs.Text;
        private skipPriceIcon: createjs.DisplayObject;

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


            this.addChild(new gameui.IconTextButton("menu/icleave", StringResources.leave.toUpperCase(), defaultFontFamilyNormal, "white", "menu/btmenu", () => {
                this.dispatchEvent("leave")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++;

            var skipBt = new gameui.IconTextButton("menu/icskip", StringResources.skip.toUpperCase(), defaultFontFamilyNormal, "white", "menu/btmenu", () => {
                this.dispatchEvent("skip");
            }, undefined, "left")
            skipBt.set({ y: p0 + p * s });
            skipBt.text.y = -40;
            this.addChild(skipBt);
            this.skipPriceText = new createjs.Text("", defaultFontFamilyNormal, "white").set({ x: skipBt.text.x, textAlign: "left" });
            this.skipPriceIcon = gameui.AssetsManager.getBitmap("puzzle/icon_coin").set({ x: skipBt.text.x + 100, y: 20, scaleX: 0.8, scaleY: 0.8 })
            skipBt.addChild(this.skipPriceIcon);
            skipBt.addChild(this.skipPriceText );
            p++


            this.addChild(new gameui.IconTextButton("menu/icrestart", StringResources.restart.toUpperCase(), defaultFontFamilyNormal, "white", "menu/btmenu", () => {
                this.dispatchEvent("restart")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++


            this.addChild(new gameui.IconTextButton("menu/iccontinue", StringResources.continue.toUpperCase(), defaultFontFamilyNormal, "white", "menu/btmenu", () => {
                this.dispatchEvent("continue")
            }, undefined, "left").set({ y: p0 + p * s }));
            p++
        }

        public updateSkipPrice(price: number) {
            this.skipPriceText.text = price.toString();
            this.skipPriceIcon.x = this.skipPriceText.x + this.skipPriceText.getMeasuredWidth() + 30; 
        }
    }
}
