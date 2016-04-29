module FlipPlus.Menu.View {

    // View Class
    export class PopupConfirm extends Popup {
               
        // class contructor
        constructor() {
            super(true);
        }

        public showConfirmMessage(message:string,accept:()=>void) {

            this.showsPopup(0, 0);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = gameui.AssetsManager.getBitmapText(message, "fontWhite");
            this.addChild(textDO);
            textDO.pivot.x = textDO.getLocalBounds().width / 2;
            textDO.x = defaultWidth / 2;
            
            textDO.y = 550;
            
            // Add Buttons
            var btYes = new gameui.BitmapTextButton(StringResources.menus.no, "fontWhite", "menu/btoptions", () => { this.closePopUp(); });
            var btNo = new gameui.BitmapTextButton(StringResources.menus.yes, "fontWhite", "menu/btoptions", () => { this.closePopUp(); accept(); });

            this.addChild(btYes);
            this.addChild(btNo);
            btYes.x = 1136;
            btNo.x = 400;
            btYes.y = btNo.y = 1100;

        }
        
    }
}
