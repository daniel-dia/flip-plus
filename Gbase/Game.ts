///<reference path="../lib/easeljs.d.ts" />

///<reference path="ScreenState.ts" /> 
///<reference path="ScreenViewer.ts" /> 

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
            
            //var osCanvas = document.createElement("canvas"); // creates a new off-screen canvas element
            //var osContext = osCanvas.getContext('2d'); //the drawing context of the off-screen canvas element


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
            });

            createjs.Ticker.setFPS(60);

            this.screenViewer = new InvertCross.ScreenViewer(this.stage);
            this.stage.addChild(this.screenViewer.viewer);

            //Framerate meter
            this.fpsMeter = new createjs.Text("Teste", " 18px Arial ", "#fff");
            this.fpsMeter.x =0;
            this.fpsMeter.y = 0;
            this.stage.addChild(this.fpsMeter);


            //get screen size: TODO tirar daqui
            var len = window.innerWidth;
            var res = getQueryVariable("res");
            if (res != null) {
                len = parseInt(res);
                if (res == "ipad") len = 1536;
                if (res == "iphone") len = 640;
                if (res == "wxga") len = 768;
                if (res == "wvga") len = 480;
                if (res == "xga") len = 768;
                if (res == "vga") len = 480;
                if (isNaN(len) || !len) len = 768;
            }

            var img = getQueryVariable("img");
            switch (img) {
                case "1": assetscale = 1; break;
                case "0.5": assetscale = 0.5; break;
                case "0.25": assetscale = 0.25; break;
                default: assetscale = 0.5;
            }

            this.redim(len)

            //osCanvas.width = this.myCanvas.width; // match the off-screen canvas dimensions with that of #mainCanvas
            //osCanvas.height = this.myCanvas.height;
        }

        private static tick() {
            this.stage.update();
        }

       private static redim(devicewidth:number) {
             
            var ctx = this.myCanvas.getContext("2d");

            var scalew = devicewidth / this.defaultWidth;
            
            var finalscale = scalew //> scaleh ? scaleh : scalew;

            this.myCanvas.width = devicewidth;
            this.myCanvas.height = Math.floor(this.defaultHeight*finalscale);

            this.myCanvas.style.width = devicewidth+"px"
            this.myCanvas.style.height = Math.floor(this.defaultHeight * finalscale) +"px";

            this.screenViewer.updateScale(finalscale);

            setMobileScale(devicewidth)
        }


    }
}

