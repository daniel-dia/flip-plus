var aagameui;
(function (aagameui) {
    var AssetsManager = (function () {
        function AssetsManager() {
        }
        AssetsManager.loadAssets = function (assetsManifest, spriteSheets, imagesArray) {
            this.spriteSheets = spriteSheets ? spriteSheets : [];
            this.assetsManifest = assetsManifest;

            this.imagesArray = new Array();

            this.loader = new createjs.LoadQueue(false);

            this.loader.installPlugin(createjs.Sound);

            this.loader.addEventListener("fileload", function (evt) {
                if (evt.item.type == "image")
                    imagesArray[evt.item.id] = evt.result;
                return true;
            });

            return this.loader;
        };

        AssetsManager.getImagesArray = function () {
            return this.imagesArray;
        };

        AssetsManager.getBitmap = function (name) {
            if (this.spriteSheets[name])
                return this.getSprite(name, false);

            var image = this.getLoadedImage(name);
            if (image)
                return new createjs.Bitmap(image);

            return new createjs.Bitmap(name);
        };

        AssetsManager.getLoadedImage = function (name) {
            for (var i in this.assetsManifest) {
                if (this.assetsManifest[i]["id"] == name)
                    return this.assetsManifest[i]["src"];
            }
            return this.loader.getResult(name);
        };

        AssetsManager.getSprite = function (name, play) {
            if (typeof play === "undefined") { play = true; }
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
        return AssetsManager;
    })();
    aagameui.AssetsManager = AssetsManager;
})(aagameui || (aagameui = {}));
//# sourceMappingURL=GameUiAssetsManager.js.map
