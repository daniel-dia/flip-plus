module gameui {

    // Class
    export class AssetsManager {

        private static loader: createjs.LoadQueue;
        private static spriteSheets: Array<any>;
        private static imagesArray: Array<HTMLImageElement>;
        private static bitmapFontSpriteSheetDataArray: Array<createjs.SpriteSheet>;
        private static assetsManifest: Array<any>;
        private static defaultMouseEnabled: boolean = false;

        //load assets
        public static loadAssets(assetsManifest: Array<any>, path: string= "", spriteSheets?: Array<any>, imagesArray?: Array<HTMLImageElement>): createjs.LoadQueue {

            //cleans previous loaded assets.
            this.cleanAssets();

            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.imagesArray = imagesArray ? imagesArray : new Array();
            this.bitmapFontSpriteSheetDataArray = new Array();
            this.assetsManifest = assetsManifest;

            //creates a preload queue
            this.loader = new createjs.LoadQueue(false);

            //install sound plug-in for sounds format
            this.loader.installPlugin(createjs.Sound);

            //create eventListeners
            this.loader.addEventListener("fileload", (evt: any): boolean => {
                if (evt.item.type == "image")
                    this.imagesArray[evt.item.id] = <HTMLImageElement>evt.result;
                return true;
            });

            //loads entire manifest
            this.loader.loadManifest(this.assetsManifest, true, path);

            return this.loader;
        }

        // load a font spritesheet
        public static loadFontSpriteSheet(id: string, spritesheetData: any) {
            this.bitmapFontSpriteSheetDataArray[id] = new createjs.SpriteSheet(spritesheetData);
        }

        // cleans all sprites in the bitmap array;
        public static cleanAssets() {
            if (this.imagesArray);
            for (var i in this.imagesArray) {
                var img = <any>this.imagesArray[i]
                if (img.dispose) img.dispose();
                delete this.imagesArray[i]
            }
        }

        // return loaded image array
        public static getImagesArray(): Array<HTMLImageElement> {
            return this.imagesArray;
        }

        //gets a image from assets
        public static getBitmap(name: string): createjs.DisplayObject {

            //if image id is described in spritesheets
            if (this.spriteSheets)
                if (this.spriteSheets[name])
                    return this.getSprite(name, false);

            //if image is preloaded
            var image = this.getLoadedImage(name);
            if (image) {
                var imgobj = new createjs.Bitmap(image);
                imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
                return imgobj;
            }

            //or else try grab by filename
            var imgobj = new createjs.Bitmap(name);
            imgobj.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return imgobj;

        }
        //get a bitmap Text
        public static getBitmapText(text: string, bitmapFontId: string): createjs.BitmapText {
            var bitmapText = new createjs.BitmapText(text, this.bitmapFontSpriteSheetDataArray[bitmapFontId]);
            bitmapText.lineHeight = 100;
            bitmapText.mouseEnabled = AssetsManager.defaultMouseEnabled;
            return bitmapText;

        }

        //Get a preloaded Image from assets
        private static getLoadedImage(name: string): HTMLImageElement {
            if (this.loader)
                return <HTMLImageElement>this.loader.getResult(name);
            return null;
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





        // #endregion
    }
}