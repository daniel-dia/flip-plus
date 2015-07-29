module FlipPlus.Menu.View {

    // View Class
    export class PopupHelper extends Popup{

       
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
            var textDO = new createjs.Text(stringResources.help_restart, defaultFontFamilyNormal, "white");
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
            textDO.x = 1000 ;

            // Add Buttons
            var bt = new gameui.TextButton(stringResources.help_restart_bt, defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
            });
            this.addChild(bt);
            bt.x = 1000;
            bt.y = 1100;
         
        }

        public showSkipPessage(price: number, callback: () => void) {
            this.showsPopup(0, 0);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            // create a text
            var textDO = new createjs.Text(stringResources.help_skip, defaultFontFamilyNormal, "white");
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            // add Image
            var img = gameui.AssetsManager.getBitmap("menu/imskip")
            this.addChild(img)
            img.x = 80
            img.y = 540;

            // updates title and text values
            textDO.y = 550;
            textDO.x = 1000;

            // Add Buttons
            var cancelButton = new gameui.TextButton(stringResources.help_skip_bt, defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
              
            });
            this.addChild(cancelButton);
            cancelButton.x = defaultWidth/4
            cancelButton.y = 1150

            // Add Buttons
            var skipButton = new gameui.TextButton(stringResources.skip, defaultFontFamilyNormal, "white", "menu/btoptions", () => {
                this.closePopUp();
                callback();

            });

            skipButton.text.y -= 50;
            skipButton.addChild(a);
            skipButton.addChild(b);
            skipButton.addChild(c);

            this.addChild(skipButton);
            skipButton.x = defaultWidth / 4 * 3
            skipButton.y = 1150;


            var a = gameui.AssetsManager.getBitmap("puzzle/icon_skip");
            var b = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            var c = new createjs.Text(price.toString(), defaultFontFamilyNormal, "white");

            a.x = -300;
            a.y -= 75;
            b.x = -120;
            b.y = 10
            b.scaleX = 0.8;
            b.scaleY = 0.8;
            c.x = 30;


        }
 
    }
}
