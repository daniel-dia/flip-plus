module FlipPlus.Menu.View {

    // View Class
    export class PopupBot extends Popup{

        //public method to invoke the popup
        public showBotText(text: string, timeout: number= 5000, delay:number=0) {
            super.showsPopup(timeout, delay);
            //clean everything
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popupTutorial")
            bg.x = 150;
            bg.y = 250;
            this.addChild(bg);

            //create a text
            //create a titleShadow
            var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            textDO.y =defaultHeight * 0.3;
            
            //updates text
            textDO.text = text.toUpperCase();

            this.addsClickIndicator();
        }

        addsClickIndicator() {
            //add click indicator
            var ind = gameui.AssetsManager.getSprite("touch")
            this.addChild(ind);
            ind.x = 1250;
            ind.y = 900;
        }
    }
}
