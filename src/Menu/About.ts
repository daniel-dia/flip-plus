declare var Windows;

module FlipPlus.Menu {
    export class About extends GenericMenu {

        private currentY

        constructor(previousScreen?: gameui.ScreenState) {
            
            var originY = defaultHeight / 2 + 200;
            var originX = defaultWidth / 2;

            super(StringResources.menus.about, previousScreen,null, originX, originY);
            
            this.currentY = -500;
            // add studio
            this.addLogo(); 
            this.addSeparator();
            this.addText("Created by DIA Studio");
            this.addSeparator();
            //this.addFeedback()

            // add creators
            this.addSeparator();
            this.addTitl("Game Designer")
            this.addText("Daniel Santos & Thiago Ferraz")
            
            this.addSeparator();
            this.addTitl("Game Artist")
            this.addText("Thiago Ferraz")

            this.addSeparator();
            this.addTitl("Game Developer")
            this.addText("Daniel Santos")
            
            // add credits note
            this.addVersion(version)

             
        }

        private addSeparator() {
            this.currentY += 50;
        }

        private addTitl(text: string) {
            var tx = gameui.AssetsManager.getBitmapText(text.toUpperCase(), "fontStrong",0,0.6);
            tx.y = this.currentY;
            tx.regX = tx.textWidth / 2;
            this.currentY += tx.textHeight * tx.scaleY;
            this.content.addChild(tx);
            return tx;
        }

        private addText(text: string) {
            var tx = gameui.AssetsManager.getBitmapText(text, "fontBlue",null,0.8);
            tx.y = this.currentY;
            tx.regX = tx.textWidth / 2;
            this.currentY += tx.textHeight * tx.scaleY;
            this.content.addChild(tx);
            return tx;
        }

        private addFeedback() {
            var bt = new gameui.BitmapTextButton(StringResources.menus.feedback, "fontBlue", null, () => { 
                var url = "mailto://feedback@diastudio.com.br";

                if (typeof Windows !== 'undefined')
                    Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url))
                else if (typeof Cocoon !== 'undefined')
                    Cocoon.App.openURL(url);
                else
                    window.open(url);

            });

            this.content.addChild(bt);
            bt.y = this.currentY + bt.bitmapText.height /2;
            this.currentY += bt.bitmapText.height;
            return bt;
        }

        private addLogo() {
            var bt = new gameui.ImageButton("Logo Small Round", () => {
                var url = "http://www.diastudio.com.br";

                if (typeof Windows !== 'undefined') 
                    Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(url))
                else if (typeof Cocoon !== 'undefined') 
                    Cocoon.App.openURL(url);
                else
                    window.open(url);
             
            });
            this.content.addChild(bt);
            bt.scaleY = bt.scaleX= 0.6;

            bt.y = this.currentY + (bt.height)   / 2;
            this.currentY += bt.height;
            return bt;
        }

        private addVersion(text) {

            var tx = gameui.AssetsManager.getBitmapText(text, "fontWhite", null, 0.8);
            tx.y = -100;
            tx.x = 1500;
            tx.scaleX = tx.scaleY = 0.6;
            tx.regX = tx.textWidth;
            this.footer.addChild(tx);
        }
    }
}
