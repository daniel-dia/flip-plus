module FlipPlus.Menu.View {
    export class ProductListItem extends PIXI.Container{

        private purchaseButton: gameui.Button;
        private purchasedIcon: PIXI.DisplayObject;
        private loadingIcon: PIXI.DisplayObject;

        constructor(productId: string, name: string, description: string, localizedPrice: string, image?: string) {
            super();

            // adds BG
            this.addChild(gameui.AssetsManager.getBitmap("menu/storeItem").set({ regX: 1204 / 2, regY: 277 / 2 }));

            // adds Button
            this.addChild(gameui.AssetsManager.getBitmap("menu/storeItem").set({ regX: 1204 / 2, regY: 277 / 2 }));

            // adds image icon
            if (image) {
                var i = gameui.AssetsManager.getBitmap(image);
                i.set({ x: -400, regY: 150, regX: 150 });
                i.regX = i.width / 2;
                i.regY = i.height / 2;
                this.addChild(i);
            }

            // adds text
            this.addChild(gameui.AssetsManager.getBitmapText(name, "fontStrong", 0x333071).set({ x: -160, y: -70 }));
            this.purchaseButton = new gameui.ImageButton("menu/purchaseButton", () => { this.emit("pressed"); });
            this.purchaseButton.x = 370;

            // adds price
            var t: PIXI.extras.BitmapText = gameui.AssetsManager.getBitmapText(localizedPrice, "fontStrong", 0xffffff, 0.8);
            t.y = -90;
            this.purchaseButton.addChild(t);
            t.regX = t.textWidth / 2;
             

            // adds buy text
            var t: PIXI.extras.BitmapText = gameui.AssetsManager.getBitmapText(StringResources.menus.buy, "fontWhite", 0x86c0f1);
            t.y= 20 ;
            this.purchaseButton.addChild(t);
            t.regX = t.textWidth / 2;

            this.addChild(this.purchaseButton);
        }

        public setPurchasing() {
            this.disable()
            ///this.loadingIcon.visible = true;
        }

        public loading() {
            this.disable();
            //this.loadingIcon.visible = true;
        }

        public setNotAvaliable() {
            this.purchaseButton.fadeOut();
            //this.purchasedIcon.visible = false;
            //this.loadingIcon.visible = false;
        }

        public setAvaliable() { }

        public setPurchased(timeOut: boolean = false) {
            this.purchaseButton.fadeOut();
            //this.purchasedIcon.visible = true;
            //this.loadingIcon.visible = false;
            gameui.AudiosManager.playSound("Interface Sound-11");
            if (timeOut) setTimeout(() => { this.setNormal(); }, 1000);
        }

        public setNormal() {
            this.purchaseButton.fadeIn();
            //this.purchasedIcon.visible = false;
            //this.loadingIcon.visible = false;
        }

        public enable() {
            this.purchaseButton.fadeIn();
            this.loadingIcon.visible = false;
        }

        public disable() {
            //this.purchasedIcon.visible = false;
            this.purchaseButton.fadeOut();
        }
    }
}