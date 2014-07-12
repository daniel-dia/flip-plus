
 module aagameui {

    // Class
    export class AssetsManager{

        private static loader: createjs.LoadQueue;
        private static spriteSheets: Array<any>;
        private static imagesArray: Array<HTMLImageElement>;
        private static assetsManifest: Array<any>;

        public static loadAssets(assetsManifest: Array<any>, spriteSheets?: Array<any>,imagesArray?:Array<HTMLImageElement>): createjs.LoadQueue {

            this.spriteSheets = spriteSheets ? spriteSheets : [];
            this.assetsManifest = assetsManifest;

            //create a image array
            this.imagesArray = new Array();

            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);
            
            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image") imagesArray[evt.item.id] = <HTMLImageElement>evt.result;
                return true;
            });

            //loads entire manifest
            //this.loader.loadManifest(this.assetsManifest);

           return this.loader;
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
            for (var i in this.assetsManifest) {
                if (this.assetsManifest[i]["id"] == name)
                    return this.assetsManifest[i]["src"];
            }
            return <HTMLImageElement>this.loader.getResult(name);
        }

        //return a sprite according to the image
        public static getSprite (name: string, play:boolean=true): createjs.Sprite {
            var data = this.spriteSheets[name];
            for (var i in data.images) if (typeof data.images[i] == "string") data.images[i] = this.getLoadedImage(data.images[i]);

            var spritesheet = new createjs.SpriteSheet(data);

            var sprite = new createjs.Sprite(spritesheet);
            if (play) sprite.play();
            return sprite;
        }
        
    }
}