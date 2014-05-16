//declare var images: any;
//declare var Media: any;
//declare var assetscale: number;
//declare var spriteSheets : number;

module Gbase {

    // Class
    export class AssetsManager{

        private loader: createjs.LoadQueue;
        private spriteSheets: Array<any>;
        private imagesArray: Array<HTMLImageElement>;
        private assetsManifest: Array<any>;

        constructor(assetsManifest: Array<any>, spriteSheets?: Array<any>) {
            this.spriteSheets = spriteSheets ? spriteSheets : [];
            this.assetsManifest = assetsManifest;
            this.loadAssets();
        }

        public loadAssets(): createjs.LoadQueue {

            //create a image array
            this.imagesArray = new Array();

            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);
            
            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image") this.imagesArray[evt.item.id] = <HTMLImageElement>evt.result;
                return true;
            });

            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest);

           return this.loader;
        }

        public getImagesArray(): Array<HTMLImageElement> {
            return this.imagesArray;
        }

        public getBitmap(name: string): createjs.DisplayObject {
            if (spriteSheets[name])
                return this.getSprite(name,false);
            else
                return new createjs.Bitmap(this.getImage(name));
        }

        private getImage(name: string): HTMLImageElement {
            return <HTMLImageElement>this.loader.getResult(name);
        }
        
        //DEPRECIATED
        //get a movie clip
        public getMovieClip(name: string): createjs.Sprite {
            var t: createjs.Sprite = new window[name];
            return t;
        }

        //return a sprite according to the image
        public getSprite (name: string, play:boolean=true): createjs.Sprite {
            var data = spriteSheets[name];
            for (var i in data.images) if (typeof data.images[i] == "string") data.images[i] = this.getImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play) sprite.play();
            return sprite;
        }

        // -----------------------------------  Audio ------------------------------

        private currentMusic: createjs.SoundInstance;

        public playSound(name: string) {
            if (!InvertCross.InvertCrossaGame.settings.getSoundfx()) return;

            //wp8// this.mediaDic[name].play()
            createjs.Sound.play(name);
        }

        private currentMusicname: string;

        public playMusic(name: string) {
            if (!InvertCross.InvertCrossaGame.settings.getMusic()) return;

            //WP8//var media = this.mediaDic[name];
            if (name == "") name = this.currentMusicname;
            if (this.currentMusicname == name) {
                if (this.currentMusic.playState == createjs.Sound.PLAY_SUCCEEDED)//wp8commenthere//
                    return;
            }

            if (this.currentMusic != null)
                this.currentMusic.stop();

            this.currentMusic = createjs.Sound.play(name, "none", 0, 0, -1);
            //wp8//this.currentMusic = media;
            //wp8//media.play()
            this.currentMusicname = name;

        }

        public stopMusic() {
            if (this.currentMusic != null)
                this.currentMusic.stop();
        }
    }
}