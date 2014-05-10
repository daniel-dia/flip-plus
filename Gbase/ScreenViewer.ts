module InvertCross {
    // Class
    export class ScreenViewer{
        
        //TODO add Comment Here
        public viewer: createjs.Container;

        private headerPosition: number;
        private footerPosition: number;
        private viewerOffset: number;

        public currentScreen: Gbase.ScreenState;

        constructor(stage: createjs.Stage) {
            this.viewer = new createjs.Container();

        }

        public updateScale(scale: number) {
            this.viewer.scaleX = this.viewer.scaleY = scale;
        }

        //switch current screen, optionaly with a pre defined transition
        public switchScreen(newScreen: Gbase.ScreenState, parameters?:any, transition?: Transition) {

            //applies a default trainsition
            //TODO to it better
            if (!transition) transition = new Transition();

            //save oldscreen
            var oldScreen = this.currentScreen;

            //if transition
            if (transition && oldScreen) {

                //and transition = fade
                if (transition.type == "fade") {

                    //fade between transitions
                    newScreen.content.alpha = 0;
                    newScreen.content.mouseEnabled = false;
                    oldScreen.content.mouseEnabled = false;
                    createjs.Tween.get(newScreen.content).to({ alpha: 1 }, transition.time).call(() => {
                        newScreen.content.mouseEnabled = true;
                        oldScreen.content.mouseEnabled = true;
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
            this.viewer.addChild(newScreen.view);

            newScreen.header.y = this.headerPosition;
            newScreen.footer.y = this.footerPosition;

            this.currentScreen = newScreen;

            
        }

        private removeOldScreen(oldScreen:Gbase.ScreenState) {
            if (oldScreen!= null) {
                oldScreen.desactivate();
                this.viewer.removeChild(oldScreen.content);
                oldScreen = null;
            }
        }

        public updateViewerScale(realWidth: number, realHeight: number, defaultWidth: number, defaultHeight: number) {

            var scale = realWidth / defaultWidth;
            var currentHeight = realHeight / scale;
            var currentWidth = realWidth / scale;

            //set header and footer positions
            this.headerPosition = -(currentHeight - defaultHeight) / 2;
            this.footerPosition = defaultHeight + (currentHeight - defaultHeight) / 2;

            //set the viewer offset to centralize in window
            this.viewer.scaleX = this.viewer.scaleY = scale;
            this.viewer.y = this.viewerOffset = (currentHeight - defaultHeight) / 2 * scale;

            //updates current screen
            if (this.currentScreen){
                this.currentScreen.footer.y = this.footerPosition;
                this.currentScreen.header.y = this.headerPosition;
            }
        }
    }

    export class Transition {
        public time: number = 300;
        public type: string = "fade"; // none,fade
    }
}


