declare var images: any;
declare var spriteSheets: any;

// Module
module FlipPlus.Menu {
    // Class

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
            this.initializeImages()
        }

        public initializeImages() {

            var loader = gameui.AssetsManager.loadAssets(getAssetsManifest(assetscale), spriteSheets, images);

            gameui.ui.Button.setDefaultSoundId("button");

            //var loader = Assets.loadAssets();
            var text = new createjs.Text("", "600 90px Arial", "#FFF");
            text.x = DefaultWidth / 2;
            text.y = DefaultHeight / 2;
            text.textAlign = "center"
             
            this.content.addChild(text);


            //add update% functtion
            loader.addEventListener("progress", (evt: Object): boolean => {
                    text.text = stringResources.ld + "\n" + Math.floor(evt["progress"]*100).toString() + "%";
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