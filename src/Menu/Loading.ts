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
 

            assetscale = 1;
            if (window.innerWidth <= 1070) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25; 
            if (levelCreatorMode) { assetscale = 1 }

            var imagePath = "assets/images_" + assetscale + "x/";
            var audioPath = "assets/sound/";

            // adds a loading bar
            var loadinBar = new LoadingBar(imagePath);
            this.content.addChild(loadinBar);
            loadinBar.x = defaultWidth / 2;
            loadinBar.y = defaultHeight / 2;

            //load audio
            if (!levelCreatorMode && typeof WPAudioManager == 'undefined') {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSounds(audioManifest, audioPath);
                //gameui.AssetsManager.loadAssets(audioManifest, audioPath);
            }

            gameui.AssetsManager.loadAssets(imageManifest, imagePath, spriteSheets);
            gameui.Button.setDefaultSoundId("button");

          
            //add update % functtion
            gameui.AssetsManager.onProgress= (progress: number)=> {
                loadinBar.update(progress)
            };

            //creates load complete action
            gameui.AssetsManager.onComplete = () => {
                if (this.loaded) this.loaded();
            }
        }

    }
 
 

    class LoadingBar extends createjs.Container {

        private barMask;

        constructor(imagePath: string) {
            super();

            var text = new createjs.Text(StringResources.menus.loading.toUpperCase(), defaultFontFamilyNormal, "white");
            var bg = gameui.AssetsManager.getBitmap(imagePath + "loadingbj.png");
            var bar = gameui.AssetsManager.getBitmap(imagePath + "loadingBar.png");

            this.addChild(bg)
            this.addChild(text)
            this.addChild(bar);
            var w = 795;
            var h = 104;

            text.regX = text.getBounds().width / 2;
            bar.regX = Math.floor(bg.regX = w / 2 )
            bar.regY = Math.floor(bg.regY = h/ 2  )

            text.y = -200;

            this.barMask = new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, -h/2, w, h));
            this.barMask.x = -w / 2;
            bar.mask = this.barMask;
        }

        public update(value: number) {
            this.barMask.scaleX = value;
        }
    }
}
