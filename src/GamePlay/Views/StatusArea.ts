module InvertCross.GamePlay.Views {

    export class StatusArea extends createjs.Container{

        private text1: createjs.Text;
        private text2: createjs.Text;
        private text3: createjs.Text;

        private bg1: createjs.DisplayObject;
        private bg2: createjs.DisplayObject;
        private bg3: createjs.DisplayObject;

        private iconepuzzle: createjs.DisplayObject;
        private iconemoves: createjs.DisplayObject;
        private iconetime: createjs.DisplayObject;

        private rightIcon: createjs.Container;
        private rightIconMC: createjs.MovieClip;

        private mode;

        constructor() {
            super();
            this.createSprites();
            this.setMode("puzzle");
        }

        private createSprites() {

            //Background
            this.bg1 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle2");
            //this.bg2 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle1");
            this.bg3 = Gbase.AssetsManager.getBitmap("puzzle/painelpuzzle2"); this.bg3.scaleX = -1;

            this.bg1.x = DefaultWidth * 0.01;
            //this.bg2.x = DefaultWidth * 0.5; this.bg2.x -= this.bg2.getBounds().width / 2;
            this.bg3.x = DefaultWidth * 0.98;             

            this.bg1.y = 30;
            //this.bg2.y = 30;
            this.bg3.y = 30;

            this.addChild(this.bg1);
            //this.addChild(this.bg2);
            this.addChild(this.bg3);

            //Icons
            this.rightIcon = new createjs.Container();
            var rightIconContainer = new createjs.Container();

            this.iconepuzzle = Gbase.AssetsManager.getBitmap("puzzle/iconepuzzle");
            this.iconemoves = Gbase.AssetsManager.getBitmap("puzzle/iconemoves");
            this.iconetime = Gbase.AssetsManager.getBitmap("puzzle/iconetime");
         
            this.iconepuzzle.x = DefaultWidth * 0.01 + 3;

            rightIconContainer.x = DefaultWidth * 0.98; rightIconContainer.scaleX = -1;
            this.iconepuzzle.y = 33;
            rightIconContainer.y = 33;

            this.rightIcon.regX = this.rightIcon.x = this.iconemoves.getBounds().width / 2;
            this.rightIcon.regY = this.rightIcon.y = this.iconemoves.getBounds().height / 2;

            this.addChild(this.iconepuzzle);
            this.rightIcon.addChild(this.iconemoves);
            this.rightIcon.addChild(this.iconetime);
            rightIconContainer.addChild(this.rightIcon);
            this.addChild(rightIconContainer);
            
            //Text
            this.text1 = new createjs.Text("", defaultFontFamilyStrong, "#FFF");
            this.text2 = new createjs.Text("", defaultFontFamilyNormal, "#888");
            this.text3 = new createjs.Text("", defaultFontFamilyStrong, "#FFF");
                        
            this.text1.x = DefaultWidth * 0.17; 
            this.text2.x = DefaultWidth * 0.5; 
            this.text3.x = DefaultWidth * 0.83;

            this.text1.textAlign = this.text2.textAlign = this.text3.textAlign = "center";

            this.text1.y = this.text2.y = this.text3.y =65;
            
            this.addChild(this.text1);
            this.addChild(this.text2);
            this.addChild(this.text3);

            this.createAlertAnimation();
        }

        //creates a movieClip animation for the alert button
        private createAlertAnimation() {
            var instance = this.rightIcon;
            this.rightIconMC = new createjs.MovieClip(createjs.MovieClip.SYNCHED,0,false);
            
            this.rightIconMC.timeline.addTween(createjs.Tween.get(instance)
                .to({ scaleX: 1.18, scaleY: 1.18, rotation: 19.2 }, 4).
                to({ scaleX: 1.16, scaleY: 1.16, rotation: -13.3 }, 8).
                to({ scaleX: 1.2, scaleY: 1.2, rotation: 19.2 }, 8).
                to({ scaleX: 1, scaleY: 1, rotation: 0 }, 4).
                to({ startPosition: 0 }, 35).wait(1));
          

        }

        public setText1(text: string) { this.bg1.visible = !(text == "" || text == null); this.text1.text = text; }
        public setText2(text: string) { /*this.bg2.visible = !(text == "" || text == null)*/; this.text2.text = text; }

        public setText3(text: string) {
            this.bg3.visible = !(text == "" || text == null);
            this.text3.text = text;

            //if time<10 , set a alert
            if (this.mode == "time" && parseInt(text) < 10)
                 this.rightIconMC.timeline.gotoAndPlay(0);
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