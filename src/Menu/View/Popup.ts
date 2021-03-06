module FlipPlus.Menu.View {

    // View Class
    export class Popup extends gameui.UIItem {
        private ind : PIXI.extras.MovieClip;
        private closeinterval;
        private disabledInput = false;
        // class contructor
        constructor(disableInput: boolean = false) {
            super();
            this.disabledInput = disableInput;
            
            //centralize the popup on screen
            this.width = defaultWidth;
            this.height = defaultHeight;
            this.x = defaultWidth / 2;
            this.y = defaultHeight / 2;
            this.pivot = this.position;
            this.visible = false;

        }

        protected addCloseCallback() {
            this.once("click", () => {
                this.closePopUp();
            });

            this.once("tap", () => {
                this.closePopUp(); 
            });
        }

        // public method to invoke the popup
        public showTextImage(title: string, text?: string, image?: string, timeout: number = 7000, delay: number = 0) {

            //clean display Object
            this.removeChildren();

            this.showsPopup(timeout, delay);
            
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


            //create a text
            if (image) {
                var imageDO = gameui.AssetsManager.getBitmap(image);
                imageDO.x = defaultWidth / 2;
                imageDO.regX = imageDO.width / 2;
                imageDO.y = defaultHeight / 2 + 100;
                this.addChild(imageDO);
            }
            //updates title and text values
            if (text) {
                textDO.text = text;
                textDO.pivot.x = textDO.getLocalBounds().width / 2;
                titleDO.text = title.toUpperCase();
                titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            }

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = b + 300;
        }

        // show a simple text
        public showtext(title: string, text?: string, timeout: number = 7000, delay: number = 0) {

            //clean display Object
            this.removeChildren();

            this.showsPopup(timeout, delay);
            
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
                textDO.pivot.x = textDO.getLocalBounds().width / 2;
                titleDO.text = title.toUpperCase();
                titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            }

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = b + 300;
        }
        
        // shows a poput with a purchase button
        public showtextBuy(title: string, text: string, previousScreen: gameui.ScreenState, timeout: number = 7000, delay: number = 0) {


            //clean display Object
            this.removeChildren();

            this.showsPopup(timeout, delay);
            
            //draw background
            var bg = gameui.AssetsManager.getBitmap("popups/popup")
            bg.x = 0;
            bg.y = 100;
            this.addChild(bg);

            //create a title    
            var titleDO = gameui.AssetsManager.getBitmapText("", "fontTitle");
            this.addChild(titleDO);
            titleDO.x = defaultWidth / 2;
            titleDO.y = - 400;

            //create a text
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.y = - 200;
            textDO.x = defaultWidth / 2;
            this.addChild(textDO);


            //updates title and text values
            if (text) {
                textDO.text = text;
                textDO.pivot.x = textDO.getLocalBounds().width / 2;
                titleDO.text = title.toUpperCase();
                titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            }

            //add buton to store
            this.addChild(
                new gameui.BitmapTextButton(StringResources.menus.shop, "fontWhite", "menu/btmenu", () => {
                    FlipPlusGame.showShopMenu(previousScreen);
                })
            ).set({ x: defaultWidth / 2, y: defaultHeight / 2 })

            var b = defaultHeight / 2 - 600;

            titleDO.y = b
            textDO.y = b + 200;
            
        }
        
        // show a popup for timeAttack
        public showTimeAttack(time: string, boards: string, timeout: number = 7000, delay: number = 0) {


            //clean display Object
            this.removeChildren();


            this.showsPopup(timeout, delay);

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
            titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            textDO.text = StringResources.gp_pz_Popup1Text1;
            textDO1.text = StringResources.gp_pz_Popup1Text2;
            textDO2.text = StringResources.gp_pz_Popup1Text3;
            timeDO.text = time;
            boardsDO.text = boards;

            titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            textDO.regX = textDO.getLocalBounds().width / 2;
            textDO1.regX = textDO1.getLocalBounds().width / 2;
            textDO2.regX = textDO2.getLocalBounds().width / 2;
            timeDO.regX = timeDO.getLocalBounds().width / 2;
            boardsDO.regX = boardsDO.getLocalBounds().width / 2;

            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = 300 + b;
            textDO1.y = 450 + b;
            textDO2.y = 600 + b;
            timeDO.y = 450 + b;
            boardsDO.y = 450 + b;

            timeDO.x = 500;

            timeDO.x = defaultWidth / 2 + 400;
            boardsDO.x = defaultWidth / 2 - 400;

            
        }
        
        // shows a popup for taps level
        public showTaps(taps: string, timeout: number = 7000, delay: number = 0) {


            //clean display Object
            this.removeChildren();

            this.showsPopup(timeout, delay);

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


            titleDO.pivot.x = titleDO.getLocalBounds().width / 2;
            textDO.pivot.x = textDO.getLocalBounds().width / 2;;
            textDO2.pivot.x = textDO2.getLocalBounds().width / 2;
            tapsDO.pivot.x = tapsDO.getLocalBounds().width / 2;


            var b = defaultHeight / 2 - 500;

            titleDO.y = 0 + b + 50
            textDO.y = 300 + b;
            textDO2.y = 600 + b;
            tapsDO.y = 450 + b;

        }
         
        // other stuff
        protected showsPopup(timeout: number, delay: number) {
            //set Hit Area
            var hit = new PIXI.Graphics().beginFill(0xFF0000,0).drawRect(0, 0, defaultWidth, defaultHeight);
            this.addChild(hit);
       
            this.interactive = true;
            this.interactiveChildren = true;

            //shows the popus
            this.closeinterval = setTimeout(() => {

                gameui.AudiosManager.playSound("Open")
                this.fadeIn(1, 0.5);

            }, delay);;
            
            //add callback
            if (!this.disabledInput)
                setTimeout(() => {
                    this.addCloseCallback();
                    this.addsClickIndicator();
                },2000)
            
            
            //create a interval for closing the popopu
            if (timeout > 0)
                this.closeinterval = setTimeout(() => {
                    this.closePopUp();
                }, timeout + delay);

            //dispatch a event for parent objects
            this.emit("onshow");
        }

        // method for close popup 
        protected closePopUp() {

            //hide the popup{
            this.fadeOut(1, 0.5);
            this.removesClickIndicator();

            if (this.closeinterval) clearTimeout(this.closeinterval);
            
            //dispatch a event for parent objects
            this.interactive = false;
            this.interactiveChildren = false;
            
            this.emit("onclose");
            
        }

        protected addsClickIndicator() {
            //add click indicator
            
            if (!this.ind) {
                this.ind = gameui.AssetsManager.getMovieClip("touch")
                this.addChild(this.ind);
                this.ind.x = 1350;
                this.ind.y = 1100;
                this.ind.play();
            }
        }

        protected removesClickIndicator() {
             
            //add click indicator
            if (this.ind) {
                this.ind.stop();
                this.removeChild(this.ind);
                this.ind = null;
            }
        }

    }
}
