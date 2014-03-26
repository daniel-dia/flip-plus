createjs.Bitmap.prototype.draw = function (ctx, ignoreCache) {
    if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
    var rect = this.sourceRect;
    ctx.save()
    ctx.scale(1/assetscale, 1/assetscale)
    if (rect) {
        ctx.drawImage(this.image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
    } else {
        ctx.drawImage(this.image, 0, 0);
    }
    ctx.restore();
    return true;
};

createjs.Bitmap.prototype.getBounds = function () {
    var rect = this.DisplayObject_getBounds();
    if (rect) { return rect; }
    var o = this.sourceRect || this.image;
    var hasContent = (this.image && (this.image.complete || this.image.getContext || this.image.readyState >= 2));
    return hasContent ? this._rectangle.initialize(0, 0, o.width * 1/assetscale, o.height * 1/assetscale) : null;
};