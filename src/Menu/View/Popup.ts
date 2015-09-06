module FlipPlus.Menu.View {

    // View Class
    export class Popup extends gameui.UIItem{

        private closeinterval;
        // class contructor
        constructor(disableInput: boolean=false) {
            super();
            this.drawObject();
            
            //centralize the popup on screen
            this.width = defaultWidth;
            this.height = defaultHeight;
            this.x = defaultWidth / 2;
            this.y = defaultHeight / 2;
            this.centralize();

            if (!disableInput) {
                //set Hit Area
                var hit = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, defaultWidth, defaultHeight));
                this.hitArea = hit;

                //hide popup
                this.visible = false;

                //add callback
         
                this.addEventListener("click", () => {
                    this.closePopUp();
                    clearTimeout(this.closeinterval);
                });
            }
        }

        // public method to invoke the popup
        public showtext(title:string, text?: string, timeout: number= 7000,delay:number=0) {

            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a titleShadow
            var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
            titleShadow.textAlign = "center";
            titleShadow.textBaseline = "middle";
            titleShadow.x = defaultWidth / 2; 
            this.addChild(titleShadow);

            //create a title
            var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor);
            titleDO.textAlign = "center";
            titleDO.textBaseline = "middle";
            titleDO.x = defaultWidth / 2;
            this.addChild(titleDO);

            //create a text
            var textDO = new createjs.Text("", defaultFontFamilyNormal, defaultFontColor);
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);


            //updates title and text values
            if (text) {
                titleShadow.text = titleDO.text = title.toUpperCase();
                textDO.text = text;
            }

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            titleShadow.y = titleDO.y + 15;
            textDO.y = b + 300;

            this.addsClickIndicator();
       }
        
        // show a popup for timeAttack
        public showTimeAttack(time: string, boards:string, timeout: number= 7000, delay: number= 0) {

            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a titleShadow
            var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor );
            titleShadow.textAlign = "center";
            titleShadow.textBaseline = "middle";
            titleShadow.x = defaultWidth / 2; 
            this.addChild(titleShadow);

            //create a title
            var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
            titleDO.textAlign = "center";
            titleDO.textBaseline = "middle";
            titleDO.x = defaultWidth / 2;
            this.addChild(titleDO);

            //create a text
            var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            //create a text
            var textDO1 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO1.textAlign = "center";
            textDO1.textBaseline = "middle";
            textDO1.x = defaultWidth / 2;
            this.addChild(textDO1);

            //create a text
            var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO2.textAlign = "center";
            textDO2.textBaseline = "middle";
            textDO2.x = defaultWidth / 2;
            this.addChild(textDO2);

            //create a text
            var timeDO = new createjs.Text("", defaultNumberHighlight, "white");
            timeDO.textAlign = "center";
            timeDO.textBaseline = "middle";
            timeDO.x = defaultWidth / 2;
            this.addChild(timeDO);

            //create a text
            var boardsDO = new createjs.Text("", defaultNumberHighlight, "white");
            boardsDO.textAlign = "center";
            boardsDO.textBaseline = "middle";
            boardsDO.x = defaultWidth / 2;
            this.addChild(boardsDO);


            //updates title and text values
            titleShadow.text = titleDO.text = StringResources.gp_pz_Popup1Title.toUpperCase();
            textDO.text = StringResources.gp_pz_Popup1Text1;
            textDO1.text = StringResources.gp_pz_Popup1Text2;
            textDO2.text = StringResources.gp_pz_Popup1Text3;
            timeDO.text = time;
            boardsDO.text = boards;

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            titleShadow.y = titleDO.y + 15 ;
            textDO.y = 300 + b;
            textDO1.y = 450 + b;
            textDO2.y = 600 + b;
            timeDO.y = 450+b;
            boardsDO.y = 450+b;

            timeDO.x = 500;

            timeDO.x = defaultWidth / 2 + 400;
            boardsDO.x = defaultWidth / 2 - 400;


            this.addsClickIndicator();
        }
        
        // shows a popup for taps level
        public showTaps(taps: string, timeout: number= 7000, delay: number= 0) {
            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeAllChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a titleShadow
            var titleShadow = new createjs.Text("", defaultFontFamilyHighlight, shadowFontColor);
            titleShadow.textAlign = "center";
            titleShadow.textBaseline = "middle";
            titleShadow.x = defaultWidth / 2; 
            this.addChild(titleShadow);

            //create a title
            var titleDO = new createjs.Text("", defaultFontFamilyHighlight, highlightFontColor); //"#f8e5a2"
            titleDO.textAlign = "center";
            titleDO.textBaseline = "middle";
            titleDO.x = defaultWidth / 2;
            this.addChild(titleDO);

            //create a text
            var textDO = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO.textAlign = "center";
            textDO.textBaseline = "middle";
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            //create a text
            var textDO2 = new createjs.Text("", defaultFontFamilyNormal, alternativeFontColor);
            textDO2.textAlign = "center";
            textDO2.textBaseline = "middle";
            textDO2.x = defaultWidth / 2;
            this.addChild(textDO2);

            //create a text
            var tapsDO = new createjs.Text("", defaultNumberHighlight, "white");
            tapsDO.textAlign = "center";
            tapsDO.textBaseline = "middle";
            tapsDO.x = defaultWidth / 2;
            this.addChild(tapsDO);

            //updates title and text values
            titleShadow.text = titleDO.text = StringResources.gp_mv_Popup1Title.toUpperCase();
            textDO.text = StringResources.gp_mv_Popup1Text1;
            textDO2.text = StringResources.gp_mv_Popup1Text3;
            tapsDO.text = taps;
            

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            titleShadow.y = titleDO.y + 15;
            textDO.y = 300 + b;
            textDO2.y = 600 + b;
            tapsDO.y = 450 + b;

            this.addsClickIndicator();
        }
         
        // other stuff
        protected showsPopup(timeout:number, delay:number) {

            //shows the popus
            this.closeinterval = setTimeout(() => {

                gameui.AudiosManager.playSound("Open")

                this.fadeIn(1,0.5);
            }, delay);;

            //create a interval for closing the popopu
            if (timeout >0)
            this.closeinterval = setTimeout(() => {
                this.closePopUp();
            }, timeout + delay);

            //dispatch a event for parent objects
            this.dispatchEvent("onshow");
        }

        protected addsClickIndicator() {
            //add click indicator
            var ind = gameui.AssetsManager.getSprite("touch")
            this.addChild(ind);
            ind.x = 1350;
            ind.y = 1100;
        }

        // method for close popup 
        protected closePopUp() {

            //hide the popup{
            this.fadeOut(1,0.5);

            //dispatch a event for parent objects
            this.dispatchEvent("onclose");
        }
        
        // desenha os objetos do popup
        protected drawObject() {
            


        }
    }
}
