var gameui;
(function (gameui) {
    var aAssetsManager = (function () {
        function aAssetsManager() {
        }
        aAssetsManager.loadAssets = function (assetsManifest, spriteSheets, imagesArray) {
            this.cleanAssets();
            this.spriteSheets = spriteSheets ? spriteSheets : new Array();
            this.imagesArray = imagesArray ? imagesArray : new Array();
            this.assetsManifest = assetsManifest;
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.addEventListener("fileload", function (evt) {
                if (evt.item.type == "image")
                    imagesArray[evt.item.id] = evt.result;
                return true;
            });
            this.loader.loadManifest(this.assetsManifest);
            return this.loader;
        };
        aAssetsManager.cleanAssets = function () {
            if (this.loader)
                this.loader.reset();
            if (this.imagesArray)
                ;
            for (var i in this.imagesArray) {
                delete this.imagesArray[i];
            }
        };
        aAssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };
        aAssetsManager.getBitmap = function (name) {
            if (this.spriteSheets[name])
                return this.getSprite(name, false);
            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);
            return new createjs.Bitmap(name);
        };
        aAssetsManager.getLoadedImage = function (name) {
            return this.loader.getResult(name);
        };
        aAssetsManager.getMovieClip = function (name) {
            var t = new window[name];
            return t;
        };
        aAssetsManager.getSprite = function (name, play) {
            if (play === void 0) { play = true; }
            var data = this.spriteSheets[name];
            for (var i in data.images)
                if (typeof data.images[i] == "string")
                    data.images[i] = this.getLoadedImage(data.images[i]);
            var spritesheet = new createjs.SpriteSheet(data);
            var sprite = new createjs.Sprite(spritesheet);
            if (play)
                sprite.play();
            return sprite;
        };
        return aAssetsManager;
    })();
    gameui.aAssetsManager = aAssetsManager;
})(gameui || (gameui = {}));
//# sourceMappingURL=AssetsManager.js.map