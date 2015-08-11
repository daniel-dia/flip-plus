var assetscale;

createjs.Bitmap.prototype.draw = function (ctx, ignoreCache) {

    if (this.DisplayObject_draw(ctx, ignoreCache) || !this.image) { return true; }
    var img = this.image, rect = this.sourceRect;
    ctx.scale(1 / assetscale, 1 / assetscale)
    if (rect) {
        // some browsers choke on out of bound values, so we'll fix them:
        var x1 = rect.x, y1 = rect.y, x2 = x1 + rect.width, y2 = y1 + rect.height, x = 0, y = 0, w = img.width, h = img.height;
        if (x1 < 0) { x -= x1; x1 = 0; }
        if (x2 > w) { x2 = w; }
        if (y1 < 0) { y -= y1; y1 = 0; }
        if (y2 > h) { y2 = h; }
        ctx.drawImage(img, x1 * assetscale, y1 * assetscale, (x2 - x1) * assetscale, (y2 - y1) * assetscale, x, y, x2 - x1, y2 - y1);
    } else {
        ctx.drawImage(img, 0, 0);
    }
    return true;
};

 createjs.Bitmap.prototype.isVisible = function () {
    var image = this.image;
    var hasContent = this.cacheCanvas || (image && (image.complete || image.getContext || image.readyState >= 2));
    return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0 && hasContent);
};

createjs.Bitmap.prototype.getBounds = function () {
    var rect = this.DisplayObject_getBounds();
    if (rect) { return rect; }
    var image = this.image, o = this.sourceRect || image;
    var hasContent = (image && (image.complete || image.getContext || image.readyState >= 2));
    return hasContent ? this._rectangle.setValues(0, 0, o.width * 1 / assetscale, o.height * 1 / assetscale) : null;
};

createjs.DisplayObject.prototype.cache = function (x, y, width, height, scale) {
    // draw to canvas.
    scale = scale || assetscale;
    if (!this.cacheCanvas) { this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"); }
    this._cacheWidth = width;
    this._cacheHeight = height;
    this._cacheOffsetX = x;
    this._cacheOffsetY = y;
    this._cacheScale = scale;
    this.updateCache(); 
};

 

createjs.DisplayObject.prototype.uncache = function () {
    var x = this.cacheCanvas;
    
    this._cacheDataURL = this.cacheCanvas = null;
    this.cacheID = this._cacheOffsetX = this._cacheOffsetY = this._filterOffsetX = this._filterOffsetY = 0;
    this._cacheScale = 1;

    if (x && x.dispose) {
        x.dispose();
        x.dispose();
        setTimeout(function () { x.dispose(); }, 1000)
    }


};

createjs.Sprite.prototype.draw = function (ctx, ignoreCache) {
    if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
    this._normalizeFrame();
    var o = this.spriteSheet.getFrame(this._currentFrame | 0);
    if (!o) { return false; }
    var rect = o.rect;
    if (rect.width && rect.height) { ctx.drawImage(o.image, rect.x * assetscale, rect.y * assetscale, rect.width * assetscale, rect.height * assetscale, -o.regX , -o.regY , rect.width, rect.height); }
    return true;
};


createjs.BitmapText.prototype._updateText = function () {
    var x = 0, y = 0, o = this._oldProps, change = false, spaceW = this.spaceWidth, lineH = this.lineHeight, ss = this.spriteSheet;
    var pool = createjs.BitmapText._spritePool, kids = this.children, childIndex = 0, numKids = kids.length, sprite;

    for (var n in o) {
        if (o[n] != this[n]) {
            o[n] = this[n];
            change = true;
        }
    }
    if (!change) { return; }

    var hasSpace = !!this._getFrame(" ", ss);
    if (!hasSpace && !spaceW) { spaceW = this._getSpaceWidth(ss); }
    if (!lineH) { lineH = this._getLineHeight(ss); }

    for (var i = 0, l = this.text.length; i < l; i++) {
        var character = this.text.charAt(i);
        if (character == " " && !hasSpace) {
            x += spaceW;
            continue;
        } else if (character == "\n" || character == "\r") {
            if (character == "\r" && this.text.charAt(i + 1) == "\n") { i++; } // crlf
            x = 0;
            y += lineH  ;
            continue;
        }

        var index = this._getFrameIndex(character, ss);
        if (index == null) { continue; }

        if (childIndex < numKids) {
            sprite = kids[childIndex];
        } else {
            kids.push(sprite = pool.length ? pool.pop() : new createjs.Sprite());
            sprite.parent = this;
            numKids++;
        }
        sprite.spriteSheet = ss;
        sprite.gotoAndStop(index);
        sprite.x = x;
        sprite.y = y;
        childIndex++;

        x += sprite.getBounds().width + this.letterSpacing / assetscale;
    }
    while (numKids > childIndex) {
        // faster than removeChild.
        pool.push(sprite = kids.pop());
        sprite.parent = null;
        numKids--;
    }
    if (pool.length > createjs.BitmapText.maxPoolSize) { pool.length = createjs.BitmapText.maxPoolSize; }
};



