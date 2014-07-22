module gameui {

    // Class
    export class aAssetsManager {

        private static loader: createjs.LoadQueue;
        private static spriteSheets: Array<any>;
        private static imagesArray: Array<HTMLImageElement>;
        private static assetsManifest: Array<any>;

        public static loadAssets(assetsManifest: Array<any>, spriteSheets?: Array<any>, imagesArray?: Array<HTMLImageElement>): createjs.LoadQueue {

            //cleans previous loaded assets.
            this.cleanAssets();

            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.imagesArray = imagesArray ? imagesArray : new Array();
            this.assetsManifest = assetsManifest;

            //creates a preload queue
            this.loader = new createjs.LoadQueue();

            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image") imagesArray[evt.item.id] = <HTMLImageElement>evt.result;
                return true;
            });

            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest);

            return this.loader;
        }

        // cleans all sprites in the bitmap array;
        public static cleanAssets() {

           if (this.loader)
               this.loader.reset();
           
           if (this.imagesArray);
           for (var i in this.imagesArray) {
                delete this.imagesArray[i];
           }
            
        }

        public static getImagesArray(): Array<HTMLImageElement> {
            return this.imagesArray;
        }

        //gets a image from assets
        public static getBitmap(name: string): createjs.DisplayObject {

            //if image id is described in spritesheets
            if (this.spriteSheets[name])
                return this.getSprite(name, false);

            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);

            //or else try grab by filename
            return new createjs.Bitmap(name);

        }

        //Get a preloaded Image from assets
        private static getLoadedImage(name: string): HTMLImageElement {
            return <HTMLImageElement>this.loader.getResult(name);
        }

        //DEPRECIATED
        //get a movie clip
        public static getMovieClip(name: string): createjs.Sprite {
            var t: createjs.Sprite = new window[name];
            return t;
        }

        //return a sprite according to the image
        public static getSprite(name: string, play: boolean= true): createjs.Sprite {
            var data = this.spriteSheets[name];
            for (var i in data.images) if (typeof data.images[i] == "string") data.images[i] = this.getLoadedImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play) sprite.play();
            return sprite;
        }

    }
}