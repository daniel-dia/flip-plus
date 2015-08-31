module FlipPlus.Menu.View {

    // View Class
    export class PopupHelper extends Popup {
               
        // class contructor
        constructor() {
            super(true);
        }

        public showRestartMessage() {

            this.showsPopup(0, 0);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = new createjs.Text(StringResources.help_restart, defaultFontFamilyNormal, "white");
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            // add Image
            var img = gameui.AssetsManager.getBitmap("menu/imrestart")
            this.addChild(img)
            img.x = 80
            img.y = 540;

            // updates title and text values
      
            textDO.y = 550;
            textDO.x = 1000;

            // Add Buttons
            var bt = new gameui.TextButton(StringResources.help_restart_bt, defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
            });
            this.addChild(bt);
            bt.x = 1000;
            bt.y = 1100;

        }

        public showItemMessage(item: string, price: number, accept: () => void, cancel: () => void, customImage?: string) {
            this.showsPopup(0, 0);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = new createjs.Text(StringResources["help_" + item], defaultFontFamilyNormal, "white");
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            textDO.y = 550;
            textDO.x = 1000;
            this.addChild(textDO);

            // add Image
            var img = gameui.AssetsManager.getBitmap(customImage || "menu/imitem")
            this.addChild(img)
            img.x = 80
            img.y = 740;
            img.regY = img.getBounds().height / 2;

            // Add cancel Buttons
            var cancelButton = new gameui.TextButton(StringResources.help_cancel_bt, defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
                cancel();
            });
            this.addChild(cancelButton);
            cancelButton.x = defaultWidth / 4
            cancelButton.y = 1150

            // Add ok Buttons
            var acceptBt = new gameui.TextButton(StringResources["help_" + item + "_bt"], defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
                accept();
            });
            this.addChild(acceptBt);
            acceptBt.text.y -= 50;
            acceptBt.x = defaultWidth / 4 * 3
            acceptBt.y = 1150;

            //add stuff on button
            acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + item).set({ x: -170, y: 0 }));
            acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_coin").set({ x: 90, y: 20, scaleX: 0.8, scaleY: 0.8 }));
            acceptBt.addChild(new createjs.Text(price.toString(), defaultFontFamilyNormal, "white").set({ x: 10 }));

        }
    }
}
