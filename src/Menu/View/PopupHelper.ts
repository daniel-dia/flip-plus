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
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = gameui.AssetsManager.getBitmapText(StringResources.help_restart, "fontWhite");
            this.addChild(textDO);
            textDO.pivot.x = textDO.getBounds().width / 2;
            textDO.x = defaultWidth / 2;
            
            // add Image
            var img = gameui.AssetsManager.getBitmap("menu/imrestart")
            this.addChild(img)
            img.x = 80
            img.y = 540;

            // updates title and text values
      
            textDO.y = 550;
            textDO.x = 1000;

            // Add Buttons
            var bt = new gameui.BitmapTextButton(StringResources.help_restart_bt, defaultFontFamilyNormal, "menu/btoptions", () => {
                this.closePopUp();
            });
            this.addChild(bt);
            bt.x = 1000;
            bt.y = 1100;

        }

        public showItemMessage(item: string, price: number, accept: () => void, cancel: () => void, customImage?: string) {
            this.showsPopup(0, 0);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = gameui.AssetsManager.getBitmapText(StringResources["help_" + item], "fontWhite");
            this.addChild(textDO);
            textDO.pivot.x = textDO.getBounds().width / 2;
            
            textDO.y = 550;
            textDO.x = 1100;
            

            // add Image
            var img = gameui.AssetsManager.getBitmap(customImage || "menu/imitem")
            this.addChild(img)
            img.x = 80
            img.y = 740;
            img.pivot.y = img.getBounds().height / 2;

            // Add cancel Buttons
            var cancelButton = new gameui.BitmapTextButton(StringResources.help_cancel_bt, "fontWhite", "menu/btoptions", () => {
                this.closePopUp();
                cancel();
            });
            this.addChild(cancelButton);
            cancelButton.x = defaultWidth / 4
            cancelButton.y = 1150

            // Add ok Buttons
            var acceptBt = new gameui.BitmapTextButton(StringResources[item], "fontWhite", "menu/btoptions", () => {
                this.closePopUp();
                accept();
            });
            this.addChild(acceptBt);
            acceptBt.bitmapText.y -= 50;
            acceptBt.x = defaultWidth / 4 * 3
            acceptBt.y = 1150;

            //add stuff on button
            acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + item).set({ x: -170, y: -10 }));
            acceptBt.addChild(gameui.AssetsManager.getBitmap("puzzle/icon_coin").set({ x: 90, y: 10, scaleX: 0.8, scaleY: 0.8 }));
            acceptBt.addChild(gameui.AssetsManager.getBitmapText(price.toString(), "fontWhite").set({ x: 10 }));

        }
    }
}
