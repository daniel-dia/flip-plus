var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SmokeFX;
(function (SmokeFX) {
    var SmokeFXEmmiter = (function (_super) {
        __extends(SmokeFXEmmiter, _super);
        function SmokeFXEmmiter(imageFile, width, height) {
            var _this = this;
            _super.call(this);
            this.birthrate = 1;
            this.aging = 1000;
            this.ageVariation = 50;
            this.spin = 90;
            this.spinVariation = 180;
            this.speedX = -0.03;
            this.speedY = 0;
            this.speedVariationX = 0;
            this.speedVariationY = 0;
            this.scale = 1;
            this.scaleFinal = 2;
            this.scaleVariation = 0.1;
            this.alpha = 1;
            this.alphaVariation = 0.1;
            this.finalAlpha = 0;
            this.rateCount = 0;
            this.emmiterWidth = 500;
            this.emmiterHeight = 100;
            this.imageFile = imageFile;
            this.emmiterWidth = width;
            this.emmiterHeight = height;
            var test = new createjs.Bitmap(imageFile);
            this.addChild(test);
            createjs.Ticker.addEventListener("tick", function () {
                _this.tickrate();
            });
        }
        SmokeFXEmmiter.prototype.tickrate = function () {
            if (Math.random() > this.birthrate)
                return;
            var imageFile = this.imageFile;
            var x = Math.random() * this.emmiterWidth;
            var y = Math.random() * this.emmiterHeight;
            var speedX = 0.5 - Math.random() * this.speedVariationX + this.speedX;
            var speedY = 0.5 - Math.random() * this.speedVariationY + this.speedY;
            var spin = 0.5 - Math.random() * this.spinVariation + this.spin;
            var age = 0.5 - Math.random() * this.ageVariation + this.aging;
            var alpha = 0.5 - Math.random() * this.alphaVariation + this.alpha;
            var finalAlpha = this.finalAlpha;
            var scale = Math.random() * this.scaleVariation + this.scale;
            var finalScale = Math.random() * this.scaleVariation + this.scaleFinal;
            this.emmit(imageFile, x, y, speedX, speedY, scale, finalScale, spin, age, alpha, finalAlpha);
        };
        SmokeFXEmmiter.prototype.emmit = function (imageFile, x, y, speedX, speedY, scale, finalScale, spin, age, alpha, finalAlpha) {
            var _this = this;
            var asset = new createjs.Bitmap(imageFile);
            this.addChild(asset);
            asset.regX = this.imageRegX;
            asset.regY = this.imageRegY;
            asset.x = x;
            asset.y = y;
            asset.scaleX = asset.scaleY = scale;
            createjs.Tween.get(asset).to({
                x: x + speedX * age / 1000,
                y: y + speedY * age / 1000,
                rotation: spin * age / 1000,
                scaleX: finalScale,
                scaleY: finalScale
            }, age * 1.1).call(function (e) {
                _this.removeChild(asset);
            });
            asset.alpha = 0;
            createjs.Tween.get(asset).to({ alpha: alpha }, age * 0.1).call(function (e) {
                createjs.Tween.get(asset).to({ alpha: finalAlpha }, age * 0.9);
            });
        };
        return SmokeFXEmmiter;
    })(createjs.Container);
    SmokeFX.SmokeFXEmmiter = SmokeFXEmmiter;
})(SmokeFX || (SmokeFX = {}));
//# sourceMappingURL=SmokeFX.js.map