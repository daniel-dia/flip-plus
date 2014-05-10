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
                    newScreen.view.alpha = 0;
                    newScreen.view.mouseEnabled = false;
                    oldScreen.view.mouseEnabled = false;
                    createjs.Tween.get(newScreen.view).to({ alpha: 1 }, transition.time).call(() => {
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
            this.viewer.addChild(newScreen.view);

            this.currentScreen = newScreen;

            //updates current screen
            if (this.currentScreen) this.currentScreen.redim(this.headerPosition, this.footerPosition);
        }

        private removeOldScreen(oldScreen:Gbase.ScreenState) {
            if (oldScreen!= null) {
                oldScreen.desactivate();
                this.viewer.removeChild(oldScreen.view);
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
            if (this.currentScreen) this.currentScreen.redim(this.headerPosition, this.footerPosition);
        }
    }

    export class Transition {
        public time: number = 300;
        public type: string = "fade"; // none,fade
    }
}


