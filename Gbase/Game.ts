declare function getQueryVariable(variable: string);
declare function setMobileScale(a: number);
declare var assetscale: number;

module InvertCross {

    export class Game {

        public static screenViewer: ScreenViewer;

        public static stage: createjs.Stage;
        public static myCanvas: HTMLCanvasElement;

        public static defaultWidth: number = DefaultWidth;
        public static defaultHeight: number = DefaultHeight;

        public static canvasWidth: number = DefaultWidth;
        public static canvasHeight: number = DefaultHeight;

        public static fpsMeter: createjs.Text;

        //-----------------------------------------------------------------------

        public static initialize() {

            this.myCanvas = <HTMLCanvasElement> document.getElementById("myCanvas");
            var ctx: any = this.myCanvas.getContext("2d");
            this.stage = new createjs.Stage(this.myCanvas);

            createjs.Touch.enable(this.stage);

            createjs.Ticker.addEventListener("tick", () => {
                //ctx.msImageSmoothingEnabled = false;
                //ctx.webkitImageSmoothingEnabled = false;
                //ctx.mozImageSmoothingEnabled = false;

                this.stage.update();
                this.fpsMeter.text = Math.floor(createjs.Ticker.getMeasuredFPS()) + " FPS";
            } );

            createjs.Ticker.setFPS(60);

            this.screenViewer = new InvertCross.ScreenViewer(this.stage);
            this.stage.addChild(this.screenViewer.viewer);

            //Framerate meter
            this.fpsMeter = new createjs.Text("FPS", " 18px Arial ", "#fff");
            this.fpsMeter.x = 0;
            this.fpsMeter.y = 0;
            this.stage.addChild(this.fpsMeter);

            //set screen size
            var r = parseInt(getQueryVariable("res"));

            if (r) var windowWidth = r;
            else var windowWidth = window.innerWidth;

            assetscale = 1;
            if (windowWidth <= 1024) assetscale = 0.5;
            if (windowWidth <= 420) assetscale = 0.25;            

            console.log("using scale at " + assetscale + "x");
            this.redim(windowWidth,window.innerHeight);
            window.onresize = () => { this.redim(windowWidth, window.innerHeight); };
        }



        private static tick() {
            this.stage.update();
        }

        public static redim(deviceWidth: number, deviceHeight: number,updateCSS:boolean=true) {

            console.log("render at" + deviceWidth + "px");

            this.myCanvas.width = deviceWidth;
            this.myCanvas.height = deviceHeight;

            this.screenViewer.updateViewerScale(deviceWidth,deviceHeight,DefaultWidth,DefaultHeight);

            if(updateCSS) setMobileScale(deviceWidth)
        }
    }
}

