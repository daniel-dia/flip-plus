var images: Array<HTMLImageElement>;

module gameui {

    // Class
    export class AssetsManager{

        private static loader: createjs.LoadQueue;
        private static spriteSheets: Array<any>;
        private static bitmapFontSpriteSheetDataArray: Array<createjs.SpriteSheet>;
        private static assetsManifest: Array<any>;
        private static defaultMouseEnabled: boolean = false;

        public static onProgress: (progress: number) => void;
        public static onComplete: () => void;

        //load assets
        public static loadAssets(
            manifest: Array<any>,
            path: string= "", 
            spriteSheets?: Array<any>){

            // initialize objects
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.bitmapFontSpriteSheetDataArray = this.bitmapFontSpriteSheetDataArray ? this.bitmapFontSpriteSheetDataArray: new Array();
            this.assetsManifest = manifest;


            if (!images) images = new Array();
		
            if (!this.loader) {
                //creates a preload queue
                this.loader = new createjs.LoadQueue(false);

				//install sound plug-in for sounds format
                this.loader.installPlugin(createjs.Sound);
				createjs.Sound.alternateExtensions = ["mp3"];

                
                // Adds callbacks
                //this.loader.addEventListener("filestart", (evt: any) => { console.log("loading " + evt.item.src) })
                this.loader.addEventListener("error ", (evt: any) => { console.log("error " + evt.item.src) })
                this.loader.addEventListener("fileerror ", (evt: any) => { console.log("ferror " + evt.item.src) })
                this.loader.addEventListener("complete", (evt: any) => { if (this.onComplete) this.onComplete(); })
                this.loader.addEventListener("progress", (evt: any) => { if (this.onProgress) this.onProgress(evt.progress) })
                this.loader.addEventListener("fileload", (evt: any): boolean => {
                    if (evt.item.type == "image")
                        images[evt.item.id] = <HTMLImageElement>evt.result;
                    return true;
                });
 
            }

            //loads entire manifest 
            this.loader.loadManifest(manifest, true, path); 
        }
        
        // load a font spritesheet
        public static loadFontSpriteSheet(id:string,spritesheetData: any) {
            this.bitmapFontSpriteSheetDataArray[id] = new createjs.SpriteSheet(spritesheetData);
        }

        // cleans all sprites in the bitmap array;
        public static cleanAssets() {
            if (images);
            for (var i in images) {
                var img = <any>images[i]
                if (img.dispose)img.dispose();
                delete images[i]
            }
        }

        // return loaded image array
        public static getImagesArray(): Array<HTMLImageElement> {
            return images;
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
        public static getBitmapText(text:string, bitmapFontId:string):createjs.BitmapText { 
            var bitmapText = new createjs.BitmapText(text, this.bitmapFontSpriteSheetDataArray[bitmapFontId]);
            bitmapText.lineHeight = 100;
            bitmapText.letterSpacing = 7;
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
        public static getSprite (name: string, play:boolean=true): createjs.Sprite {
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