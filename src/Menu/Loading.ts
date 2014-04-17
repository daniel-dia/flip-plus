declare var images: any;

// Module
module InvertCross.Menu {
    // Class

    export class Loading extends Gbase.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
        }

        public initializeImages() {

            var loader = InvertCross.Assets.loadAssets();
            var text = new createjs.Text("", "600 90px Myriad Pro", "#FFF");
            text.x = DefaultWidth / 2;
            text.y = DefaultHeight / 2;
            text.textAlign = "center"
             
            this.view.addChild(text);


            //add update% functtion
            loader.addEventListener("progress", (evt: Object): boolean => {
                text.text = "Loading\n" + Math.floor(evt["progress"]*100).toString() + "%";
                return true;
            });
            
            //creates load complete action
            loader.addEventListener("complete", (evt: Object): boolean => {
                if (this.loaded) this.loaded();
                return true;
            });
        }

    }
}