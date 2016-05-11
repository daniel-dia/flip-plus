declare var spriteSheets: any;
declare var imageManifest;
declare var logoManifest;
declare var audioManifest;
declare var WPAudioManager;

declare var fontTitle;
declare var fontBlue;
declare var font;

declare function createSpriteSheetFromFont(font: any, path: string);

// Module
module FlipPlus.Menu {
    // Class

    export class Loading extends gameui.ScreenState {

        private beach: PIXI.DisplayObject;
        public loaded: () => any;

        constructor() {
            super();
            PIXI.RETINA_PREFIX = /@(.+)x.+((png)|(jpg)|(xml)|(fnt))$/;
            assetscale = 1;
            if (window.innerWidth <= 1070) assetscale = 0.5;
            if (window.innerWidth <= 384) assetscale = 0.25;
            if (levelCreatorMode) { assetscale = 1 }

            this.preLoad();
        } 
        
        private preLoad() {

            var imagePath = "assets/images@" + assetscale + "x/";
            
            //creates load complete action
            gameui.AssetsManager.onComplete = () => {
                this.addBeach();
                gameui.AssetsManager.reset();
                this.load();

            }
            gameui.AssetsManager.loadAssets(logoManifest, imagePath);
        } 

        private load() {
            var imagePath = "assets/images@" + assetscale + "x/";
            var audioPath = "assets/sound/";

            //creates load complete action
            gameui.AssetsManager.onComplete = () => {
                if (this.loaded) this.loaded();
            }
        
            //add update % functtion
            gameui.AssetsManager.onProgress = (progress: number) => {
                loadinBar.update(progress)
            };
            
            //load audio
            if (!levelCreatorMode && typeof WPAudioManager == 'undefined') {
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.registerSounds(audioManifest, audioPath);
            }

             
            gameui.AssetsManager.loadAssets(imageManifest, imagePath);
            gameui.AssetsManager.loadFontSpriteSheet("fontWhite", "fontWhite.fnt");
            gameui.AssetsManager.loadFontSpriteSheet("fontBlue", "fontBlue.fnt");
            gameui.AssetsManager.loadFontSpriteSheet("fontTitle", "fontTitle.fnt");
            gameui.AssetsManager.loadFontSpriteSheet("fontStrong", "fontStrong.fnt");

            gameui.AssetsManager.loadSpriteSheet("agua", "agua.json");
            gameui.AssetsManager.loadSpriteSheet("bolinhas", "bolinhas.json");
            gameui.AssetsManager.loadSpriteSheet("touch", "Touch.json");

            gameui.Button.setDefaultSoundId("button");


            // adds a loading bar
            var loadinBar = new LoadingBar(imagePath);
            this.content.addChild(loadinBar);
            loadinBar.x = defaultWidth / 2;
            loadinBar.y = defaultHeight / 2 + 500;


        }
        
        private addBeach() {
            var logo = new lib_logo.LogoScreen();
            this.content.addChild(logo);

            this.beach = logo["instance"]["instance_14"];

            FlipPlusGame.gameScreen.resizeGameScreen(window.innerWidth, window.innerHeight);

        }

        public redim(headerY: number, footerY: number, width: number, height: number) {
            super.redim(headerY, footerY, width, height);
            if (this.beach) this.beach.y = -headerY / 4 - 616 + 77 / 4 + 9;
        }
        
    }



    class LoadingBar extends PIXI.Container {

        private barMask;

        constructor(imagePath: string) {
            super();

            //var text = gameui.AssetsManager.getBitmapText(StringResources.menus.loading.toUpperCase(), "fontWhite");// defaultFontFamilyNormal, 0xFFFFFF);
            var bg = gameui.AssetsManager.getBitmap(imagePath + "loadingbj.png");
            var bar = gameui.AssetsManager.getBitmap(imagePath + "loadingBar.png");

            this.addChild(bg)
            //this.addChild(text)
            this.addChild(bar);
            var w = 795;
            var h = 104;

            //text.pivot.x = text.getLocalBounds().width / 2;
            bar.pivot.x = Math.floor(bg.pivot.x = w / 2)
            bar.pivot.y = Math.floor(bg.pivot.y = h / 2)
            
            //text.y = -200;

            this.barMask = new PIXI.Graphics().beginFill(0xFF0000, 1).drawRect(0, -h / 2, w, h).endFill();;

            this.barMask.x = -w / 2;
            bar.mask = this.barMask;
            this.addChild(this.barMask);
            this.update(0);
        }

        public update(value: number) {
            this.barMask.scale.x = value / 100;
        }
    }
}
