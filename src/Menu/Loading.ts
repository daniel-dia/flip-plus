declare var spriteSheets: any;
declare var imageManifest;
declare var audioManifest;
declare var WPAudioManager;

// Module
module FlipPlus.Menu {
    // Class

    export class Loading extends gameui.ScreenState {

        public loaded: () => any;

        constructor() {
            super();
 

            assetscale = 0.5;
            if (window.innerWidth <= 1024) assetscale = 0.5;
            if (window.innerWidth <= 420) assetscale = 0.25;   
            if (levelCreatorMode) { assetscale = 1 }

            var imagePath = "assets/images_" + assetscale + "x/";
            var audioPath = "assets/sound/";

             
            //load audio
            if (!levelCreatorMode && typeof WPAudioManager == 'undefined') {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSounds(audioManifest, audioPath);
            }

            gameui.AssetsManager.loadAssets(imageManifest, imagePath, spriteSheets);
            gameui.Button.setDefaultSoundId("button");

            var text = new createjs.Text("", "600 90px Arial", "#FFF");
            text.x = defaultWidth / 2;
            text.y = defaultHeight / 2;
            text.textAlign = "center"
            this.content.addChild(text);
            
            //add update % functtion
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