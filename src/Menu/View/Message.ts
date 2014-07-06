module FlipPlus.Menu.View {

    // View Class
    export class Message extends gameui.ui.UIItem{

        private closeinterval;

        //class contructor
        constructor() {
            super();
              
            //centralize the popup on screen
            this.width = DefaultWidth;
            this.height = DefaultHeight;
            this.x = DefaultWidth / 2;
            this.y = DefaultHeight / 2;
            this.centralize();
            
            //hide popup
            this.visible = false;

            this.mouseEnabled = false;

        }

        //public method to invoke the popup
        public showtext(text: string, timeout: number= 3000,delay:number=0) {

            //clean everything
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/message")
            bg.x = 0;
            bg.y = DefaultHeight/2 -500;
            this.addChild(bg);

            //create a text
            //create a titleShadow
            var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
            titleShadow.textAlign = "center";
            titleShadow.textBaseline = "middle";
            titleShadow.x = DefaultWidth / 2;
            this.addChild(titleShadow);

            //create a title
            var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
            titleDO.textAlign = "center";
            titleDO.textBaseline = "middle";
            titleDO.x = DefaultWidth / 2;
            this.addChild(titleDO);

            titleShadow.y = titleDO.y = DefaultHeight /2;
            titleShadow.y += 15;

            //updates text
            titleDO.text = titleShadow.text = text.toUpperCase();

            //shows the popus
            this.closeinterval = setTimeout(() => {
                this.fadeIn(1,0.5);
            },delay);;

            //create a interval for closing the popopu
            this.closeinterval = setTimeout(() => {
                this.closePopUp();
                this.dispatchEvent("onclose");
            }, timeout+delay);
        }


        //method for close popup 
        private closePopUp() {
            //hide the popup{
            this.fadeOut(1,0.5);
        }
    }
}
