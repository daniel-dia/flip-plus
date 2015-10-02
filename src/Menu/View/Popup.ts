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
                /// Check var hit = (new PIXI.Graphics().beginFill(0xF00).drawRect(0, 0, defaultWidth, defaultHeight));
                /// Check this.hitArea = hit;

                //hide popup
                this.visible = false;

                //add callback
         
                this.addEventListener("mousedown", () => {
                    this.closePopUp();
                    clearTimeout(this.closeinterval);
                });
            }
        }

        // public method to invoke the popup
        public showtext(title:string, text?: string, timeout: number= 7000,delay:number=0) {

            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a title 
            var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            this.addChild(titleDO);            
            titleDO.x = defaultWidth / 2;
            titleDO.y = defaultHeight / 2;

            //create a text
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);


            //updates title and text values
            if (text) {
                textDO.text = text;
                textDO.pivot.x = textDO.getBounds().width / 2;
                titleDO.text = title.toUpperCase();
                titleDO.pivot.x = titleDO.getBounds().width/2;
            }

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = b + 300;

            this.addsClickIndicator();
       }


        public showtextBuy(title: string, text: string, previousScreen: gameui.ScreenState, timeout: number = 7000, delay: number = 0) {

            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a title 
            var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            this.addChild(titleDO);
            titleDO.x = defaultWidth / 2;
            titleDO.y = defaultHeight / 2;

            //create a text
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);


            //updates title and text values
            if (text) {
                textDO.text = text;
                textDO.pivot.x = textDO.getBounds().width / 2;
                titleDO.text = title.toUpperCase();
                titleDO.pivot.x = titleDO.getBounds().width / 2;
            }

            //add buton to store
            this.addChild(
                new gameui.BitmapTextButton(StringResources.menus.shop, "fontWhite", "menu/btmenu", () => {
                    FlipPlusGame.showShopMenu(previousScreen);
                })
            ).set({ x: defaultWidth / 2, y: defaultHeight /2})

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = b + 300;

            this.addsClickIndicator();
        }


        // show a popup for timeAttack
        public showTimeAttack(time: string, boards:string, timeout: number= 7000, delay: number= 0) {

            this.showsPopup(timeout, delay);

            //clean display Object
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a titleShadow
            var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            titleDO.x = defaultWidth / 2;
            titleDO.y = defaultHeight / 2;
            this.addChild(titleDO);

            //create a text
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            //create a text
            var textDO1 = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO1.x = defaultWidth / 2;
            this.addChild(textDO1);

            //create a text
            var textDO2 = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO2.x = defaultWidth / 2;
            this.addChild(textDO2);

            //create a text
            var timeDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            timeDO.x = defaultWidth / 2;
            this.addChild(timeDO);

            //create a text
            var boardsDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            boardsDO.x = defaultWidth / 2;
            this.addChild(boardsDO);


            //updates title and text values
            titleDO.text = StringResources.gp_pz_Popup1Title.toUpperCase();
            titleDO.pivot.x = titleDO.getBounds().width / 2;
            textDO.text = StringResources.gp_pz_Popup1Text1;
            textDO1.text = StringResources.gp_pz_Popup1Text2;
            textDO2.text = StringResources.gp_pz_Popup1Text3;
            timeDO.text = time;
            boardsDO.text = boards;

            titleDO.pivot.x = titleDO.getBounds().width / 2;
            textDO.   regX  =    textDO.  getBounds().width / 2;
            textDO1.  regX  =    textDO1. getBounds().width / 2;
            textDO2.  regX  =    textDO2. getBounds().width / 2;
            timeDO.   regX  =    timeDO.  getBounds().width / 2;
            boardsDO. regX  =    boardsDO.getBounds().width / 2;

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
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
            this.removeChildren();

            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a titleShadow
            var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle"); 
            titleDO.x = defaultWidth / 2;
            titleDO.y = defaultHeight / 2;
            this.addChild(titleDO);

            //create a text
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);

            //create a text
            var textDO2 = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO2.x = defaultWidth / 2;
            this.addChild(textDO2);

            //create a text
            var tapsDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            tapsDO.x = defaultWidth / 2;
            this.addChild(tapsDO);

            //updates title and text values
            titleDO.text = StringResources.gp_mv_Popup1Title.toUpperCase();
            textDO.text = StringResources.gp_mv_Popup1Text1;
            textDO2.text = StringResources.gp_mv_Popup1Text3;
            tapsDO.text = taps;
            

            titleDO.pivot.x = titleDO.getBounds().width / 2;
            textDO.pivot.x = textDO.getBounds().width / 2;;
            textDO2.pivot.x = textDO2.getBounds().width / 2;
            tapsDO.pivot.x = tapsDO.getBounds().width / 2;


            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
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
            this.emit("onshow");
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
            this.emit("onclose");
        }
        
        // desenha os objetos do popup
        protected drawObject() {
            


        }
    }
}
