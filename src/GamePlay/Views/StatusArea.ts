module FlipPlus.GamePlay.Views {

    export class StatusArea extends PIXI.Container{

        private text1: PIXI.extras.BitmapText; 
        private text3: PIXI.extras.BitmapText;

        private bg1: PIXI.DisplayObject; 
        private bg3: PIXI.DisplayObject;

        private iconepuzzle: PIXI.DisplayObject;
        private iconemoves: PIXI.DisplayObject;
        private iconetime: PIXI.DisplayObject;

        private rightIcon: PIXI.Container;
        private rightIconMC: PIXI.Sprite;

        private mode;

        constructor() {
            super();
            this.createSprites();
            this.setMode("puzzle");
        }

        private createSprites() {

            //Background
            this.bg1 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle2");
            this.bg3 = gameui.AssetsManager.getBitmap("puzzle/painelpuzzle2"); this.bg3.scale.x = -1;

            this.bg1.x = defaultWidth * 0.01;
            this.bg3.x = defaultWidth * 0.98;             

            this.bg1.y = 30;
            this.bg3.y = 30;

            this.addChild(this.bg1);
            this.addChild(this.bg3);

            //Icons
            this.rightIcon = new PIXI.Container();
            var rightIconContainer = new PIXI.Container();

            this.iconepuzzle = gameui.AssetsManager.getBitmap("puzzle/iconepuzzle");
            this.iconemoves = gameui.AssetsManager.getBitmap("puzzle/iconemoves");
            this.iconetime = gameui.AssetsManager.getBitmap("puzzle/iconetime");
         
            this.iconepuzzle.x = defaultWidth * 0.01 + 3;

            rightIconContainer.x = defaultWidth * 0.98; rightIconContainer.scale.x = -1;
            this.iconepuzzle.y = 33;
            rightIconContainer.y = 33;

            this.rightIcon.pivot.x = this.rightIcon.x = this.iconemoves.getLocalBounds().width / 2;
            this.rightIcon.pivot.y = this.rightIcon.y = this.iconemoves.getLocalBounds().height / 2;

            this.addChild(this.iconepuzzle);
            this.rightIcon.addChild(this.iconemoves);
            this.rightIcon.addChild(this.iconetime);
            rightIconContainer.addChild(this.rightIcon);
            this.addChild(rightIconContainer);
            
            //Text
            this.text1 = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");
            this.text3 = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");      
                        
            this.text1.x = defaultWidth * 0.11; 
            this.text3.x = defaultWidth * 0.795;

            //this.text1.textAlign = this.text2.textAlign = this.text3.textAlign = "center";

            this.text1.y =  this.text3.y =55;
            
            this.addChild(this.text1);
            this.addChild(this.text3);

            this.createAlertAnimation();
        }

        //creates a movieClip animation for the alert button
        private createAlertAnimation() {
            
        }

        private animateClock() {
            var f = Math.PI / 180;
            createjs.Tween.get(this.rightIcon)
                .to({ scaleX: 1.18, scaleY: 1.18, rotation: 19.2*f }, 60).
                to({ scaleX: 1.16, scaleY: 1.16, rotation: -13.3 * f }, 120).
                to({ scaleX: 1.2, scaleY: 1.2, rotation: 19.2 * f }, 120).
                to({ scaleX: 1, scaleY: 1, rotation: 0 * f }, 120).
                to({ startPosition: 0 }, 120);
        }

        public setText1(text: string) {
            this.bg1.visible = !(text == "" || text == null);
            this.text1.text = text;
        }

        public setText3(text: string) {
            this.bg3.visible = !(text == "" || text == null);
            this.text3.text = text;

            //if time<10 , set a alert
            if (this.mode == "time" && parseInt(text) < 10)
               this.animateClock();
        }

        //set the behaviour of the puzzle , puzze, draw, moves, time
        public setMode(mode: string) {
            this.mode = mode;

            switch (mode) {
                case "time":
                    this.iconetime.visible = true;
                    this.iconepuzzle.visible = true;
                    this.iconemoves.visible = false;
                    break;
                case "puzzle":
                    this.iconetime.visible = false;
                    this.iconepuzzle.visible = false;
                    this.iconemoves.visible = false;
                    break;
                case "moves": case "flip":
                    this.iconetime.visible = false;
                    this.iconepuzzle.visible = false;
                    this.iconemoves.visible = true;
                    break;
                default:
                    this.iconetime.visible = false;
                    this.iconepuzzle.visible = false;
                    this.iconemoves.visible = false;
            }
        }
    }


    

}