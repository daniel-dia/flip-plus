module InvertCross.Menu.View {

    // View Class
    export class PopupBot extends Popup{

        //public method to invoke the popup
        public showBotText(text: string, timeout: number= 5000, delay:number=0) {
            super.showsPopup(timeout, delay);
            //clean everything
            this.removeAllChildren();

            //draw background
            var bg = Assets.getBitmap("popups/popupTutorial")
            bg.x = 150;
            bg.y = 250;
            this.addChild(bg);

            //create a text
            //create a titleShadow
            var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = DefaultWidth / 2;
            this.addChild(textDO);

            textDO.y =DefaultHeight * 0.3;
            
            //updates text
            textDO.text = text.toUpperCase();

            this.addsClickIndicaator();
        }

        addsClickIndicaator() {
            //add click indicator
            var ind = Assets.getSprite("touch")
            this.addChild(ind);
            ind.x = 1250;
            ind.y = 900;
        }
    }
}
