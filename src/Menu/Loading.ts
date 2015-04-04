declare var images: any;
declare var spriteSheets: any;
declare var imagesManifest;
declare var soundsManifest;

// Module
module FlipPlus.Menu {
    // Class

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
 

            var imagePath = "assets/images_" + assetscale + "x/";
            var audioPath = "assets/sound/";

             
            gameui.AssetsManager.loadAssets(soundsManifest, audioPath);
            gameui.AssetsManager.loadAssets(imagesManifest, imagePath, spriteSheets, images);
            
            gameui.Button.setDefaultSoundId("button");

            var text = new createjs.Text("", "600 90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center"

            this.content.addChild(text);


            //add update% functtion
            gameui.AssetsManager.onProgress= (progress: number)=> {
                text.text = stringResources.ld + "\n" + Math.floor(progress * 100).toString() + "%";
               
            };

            //creates load complete action
            gameui.AssetsManager.onComplete = () => {
                if (this.loaded) this.loaded();
            }
        }

    }
}