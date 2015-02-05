module FlipPlus.Menu.View {

    // View Class
    export class Popup extends gameui.UIItem{

        private closeinterval;
        //class contructor
        constructor() {
            super();
            this.drawObject();
            
            //centralize the popup on screen
            this.width = defaultWidth;
            this.height = defaultHeight;
            this.x = defaultWidth / 2;
            this.y = defaultHeight / 2;
            this.centralize();

            //set Hit Area
            var hit = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0,0, defaultWidth, defaultHeight));
            this.hitArea = hit;

            //hide popup
            this.visible = false;

            //add callback
            this.addEventListener("click", () => {
                this.closePopUp();
                clearTimeout(this.closeinterval);
            });

        }

        //public method to invoke the popup
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
            titleShadow.text  = titleDO.text = title.toUpperCase();
            textDO.text = text;

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            titleShadow.y = titleDO.y + 15;
            textDO.y = b + 300;

            this.addsClickIndicaator();
       }
        
        public showTimeAttack(title: string, text: string, time: string, boards:string,text2:string,text3:string, timeout: number= 7000, delay: number= 0) {

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
            titleShadow.text = titleDO.text = title.toUpperCase();
            textDO.text = text;
            textDO1.text = text2;
            textDO2.text = text3;
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
            boardsDO.x = defaultWidth - 500;

            this.addsClickIndicaator();
        }
        
        public showflips(title: string, text: string, flips: string, timeout: number= 7000, delay: number= 0) {
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
            var flipsDO = new createjs.Text("", defaultNumberHighlight, "white");
            flipsDO.textAlign = "center";
            flipsDO.textBaseline = "middle";
            flipsDO.x = defaultWidth / 2;
            this.addChild(flipsDO);

            //updates title and text values
            titleShadow.text = titleDO.text = title.toUpperCase();
            textDO.text = text;
            textDO2.text = "";
            flipsDO.text = flips;

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            titleShadow.y = titleDO.y + 15;
            textDO.y = 300 + b;
            textDO2.y = 600 + b;
            flipsDO.y = 450 + b;


            this.addsClickIndicaator();
        }

        showsPopup(timeout:number, delay:number) {

            //shows the popus
            this.closeinterval = setTimeout(() => {

                gameui.AudiosManager.playSound("Open")

                this.fadeIn(1,0.5);
            }, delay);;

            //create a interval for closing the popopu
            this.closeinterval = setTimeout(() => {
                this.closePopUp();
            }, timeout + delay);

            //dispatch a event for parent objects
            this.dispatchEvent("onshow");
        }

        addsClickIndicaator() {
            //add click indicator
            var ind = gameui.AssetsManager.getSprite("touch")
            this.addChild(ind);
            ind.x = 1350;
            ind.y = 1100;
        }

        //method for close popup 
        private closePopUp() {

            gameui.AudiosManager.playSound("Close")

            //hide the popup{
            this.fadeOut(1,0.5);

            //dispatch a event for parent objects
            this.dispatchEvent("onclose");
        }
        
        //desenha os objetos do popup
        private drawObject() {
            


        }
    }
}
