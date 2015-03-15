declare function getQueryVariable(variable: string);
declare function setMobileScale(a: number);
declare var assetscale: number;

//TODO remove universal variable defaultWidth and DefaultHeigth

module gameui{

    export class GameScreen {
        
        public stage: createjs.Stage; 

        private defaultWidth: number;
        private defaultHeight: number;

        private canvasWidth: number;
        private canvasHeight: number;

        //Screen arrangement
        public headerPosition: number;
        public footerPosition: number;
        public viewerOffset: number;

        public currentWidth:number;
        public currentHeight:number;

        //Screen state
        public currentScreen: ScreenState;

        //screen content
        private screenContainer: createjs.Container;

        //-----------------------------------------------------------------------

        constructor(canvasId: string, gameWidth: number, gameHeight?: number, fps:number=60, showFps?: boolean) {

            this.defaultWidth = gameWidth;
            this.defaultHeight = gameHeight;

            //Initializes canvas Context            
            this.stage = new createjs.Stage(canvasId);

            createjs.Touch.enable(this.stage);

            var x = 0;
            createjs.Ticker.addEventListener("tick", () => {this.stage.update(); });
            createjs.Ticker.setFPS(fps);
             
            this.screenContainer = new createjs.Container();
            this.stage.addChild(this.screenContainer);

            //Framerate meter
            if (showFps) {
               var fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#000");
                fpsMeter.mouseEnabled = false;
                fpsMeter.x = 0;
                fpsMeter.y = 0;
                this.stage.addChild(fpsMeter);
                createjs.Ticker.addEventListener("tick", () => {
                    fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
                });
            }
        
            //var windowWidth = window.innerWidth;
            this.resizeGameScreen(window.innerWidth, window.innerHeight);
            window.onresize = () => { this.resizeGameScreen(window.innerWidth, window.innerHeight); };
        }

        //switch current screen, optionaly with a pre defined transition
        public switchScreen(newScreen: ScreenState, parameters?: any, transition?: Transition) {

            //save oldscreen
            var oldScreen = this.currentScreen;
            //applies a default trainsition
            if (!transition) transition = new Transition();

            var x = 0;
            var y = 0;
            var alpha = 1;

            //if transition
            if (transition && oldScreen) {


                switch (transition.type) {
                    case "fade":
                        alpha= 0;
                        break;

                    case "top":
                        y = this.currentHeight;
                        break;

                    case "bottom":
                        y = -this.currentHeight;
                        break;

                    case "left":
                        x = -this.currentWidth;
                        break;

                    case "right":
                        x = this.currentWidth;
                        break;

                    case "none":
                        transition.time = 0;
                        break;

                }

                //and transition = fade
                if (transition.type && transition.type != "none") {

                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;

                    //fade between transitions
                    newScreen.view.set({ alpha: alpha, x: -x, y: -y })
                    oldScreen.view.set({ 1: alpha, x: 0, y: 0 })

                    //fade old screen out
                    createjs.Tween.get(oldScreen.view).to({ alpha: alpha, x: x, y: y }, transition.time,createjs.Ease.quadInOut);
                    createjs.Tween.get(newScreen.view).to({ alpha: 1, x: 0, y: 0 }, transition.time, createjs.Ease.quadInOut).call(() => {
                       
                        oldScreen.view.set({ 1: alpha, x: 0, y: 0 })
                        newScreen.view.set({ 1: alpha, x: 0, y: 0 })

                        newScreen.view.mouseEnabled = true;
                        oldScreen.view.mouseEnabled = true;

                        this.removeOldScreen(oldScreen)
                        oldScreen = null;
                    });


                }
                else {
                    this.removeOldScreen(oldScreen);
                    oldScreen = null;
                }
            }

            //if there is no transistion siply remove screen
            else {
                this.removeOldScreen(oldScreen);
                oldScreen = null;
            }

            //adds the new screen on viewer
            newScreen.activate(parameters);
            this.screenContainer.addChild(newScreen.view);

            this.currentScreen = newScreen;

            //updates current screen
            this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth,this.currentHeight);
        }

        //resize GameScreen to a diferent scale
        public resizeGameScreen(deviceWidth: number, deviceHeight: number, updateCSS: boolean= true) {

            
            //keep aspect ratio 
            if (this.defaultHeight) {
                var aspect = this.defaultWidth / this.defaultHeight;
                var aspectReal = deviceWidth / deviceHeight;

                if (aspectReal > aspect) {
                    var s = deviceHeight / this.defaultHeight;
                    deviceWidth = this.defaultWidth * s;
                }
            }

            this.stage.canvas.width = deviceWidth;
            this.stage.canvas.height = deviceHeight;

            this.updateViewerScale(deviceWidth, deviceHeight, this.defaultWidth, this.defaultHeight);
        }

        //updates screen viewer scale
        private updateViewerScale(realWidth: number, realHeight: number, defaultWidth: number, defaultHeight: number) {

            var scale = realWidth / defaultWidth;
            this.currentHeight = realHeight / scale;
            this.currentWidth = realWidth / scale;
            this.defaultWidth = defaultWidth;

            //set header and footer positions
            this.headerPosition = -(this.currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (this.currentHeight - defaultHeight) / 2;

            //set the viewer offset to centralize in window
            this.screenContainer.scaleX = this.screenContainer.scaleY = scale;
            this.screenContainer.y = this.viewerOffset = (this.currentHeight - defaultHeight) / 2 * scale;

            //updates current screen
            if (this.currentScreen) this.currentScreen.redim(this.headerPosition, this.footerPosition, this.currentWidth,this.currentHeight);
        }

        //deletes old screen
        private removeOldScreen(oldScreen: ScreenState) {
            if (oldScreen != null) {
                oldScreen.desactivate();
                this.screenContainer.removeChild(oldScreen.view);
                oldScreen = null;
            }
        }
    }
}

