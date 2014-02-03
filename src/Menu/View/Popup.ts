/// <reference path="../../../lib/easeljs.d.ts" />

/// <reference path="../../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../../Gbase/UI/Button.ts" />

/// <reference path="../../Assets.ts" /> 

// Module


module InvertCross.Menu.View {

    // View Class
    export class Popup extends Gbase.UI.UIItem{

        private text: createjs.Text;
        private closeinterval;

        //class contructor
        constructor() {
            super();
            this.drawObject();
            
            //centralize the popup on screen
            this.width = DefaultWidth;
            this.height = DefaultHeight;
            this.x = DefaultWidth / 2;
            this.y = DefaultHeight / 2;
            this.centralize();
            
            //hide popup
            this.visible = false;

            //add callback
            this.addEventListener("click", () => {
                this.closePopUp();
                clearTimeout(this.closeinterval);
            });

        }

        //public method to invoke the popup
        public showtext(text: string, timeout: number= 10000,delay:number=0) {

            //updates text
            this.text.text = text;

            //shows the popus
            this.closeinterval = setTimeout(() => {
                this.fadeIn();
            },delay);;

            //create a interval for closing the popopu
            this.closeinterval = setTimeout(() => {
                this.closePopUp();
            }, timeout+delay);
        }


        //method for close popup 
        private closePopUp() {

            //hide the popup{
            this.fadeOut();

            //dispatch a event for parent objects
            this.dispatchEvent("onclose");
        }


        //desenha os objetos do popup
        private drawObject() {
            
            //draw background
            var bg = new createjs.Shape();
            bg.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, DefaultWidth, DefaultHeight).endFill();
            bg.graphics.beginFill("rgb(100,100,100)").beginStroke("#FFF").setStrokeStyle(4).drawRect(DefaultWidth * .2, DefaultHeight*.4, DefaultWidth*.6, DefaultHeight*.2).endFill();
            this.addChild(bg);

            //create a text
            this.text = new createjs.Text("TESTE", defaultFontFamilyNormal, defaultFontColor);
            this.text.textAlign = "center";
            this.text.textBaseline = "50%";
            this.text.x = DefaultWidth / 2;
            this.text.y = DefaultHeight / 2;
            this.addChild(this.text);
        }
    }
}
