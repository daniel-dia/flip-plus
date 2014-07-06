with (createjs) {
    createjs.Container.prototype._getObjectsUnderPoint = function (x, y, arr, mouse) {
        //var ctx = createjs.DisplayObject._hitTestContext;
        var mtx = this._matrix;

        // draw children one at a time, and check if we get a hit:
        var l = this.children.length;
        for (var i = l - 1; i >= 0; i--) {
            var child = this.children[i];
            var hitArea = mouse && child.hitArea;
            if (!child.visible || (!hitArea && !child.isVisible()) || (mouse && !child.mouseEnabled)) { continue; }
            // if a child container has a hitArea then we only need to check its hitArea, so we can treat it as a normal DO:
            if (!hitArea && child instanceof Container) {
                var result = child._getObjectsUnderPoint(x, y, arr, mouse);
                if (!arr && result) { return result; }


            } else {
                child.getConcatenatedMatrix(mtx);
                var b = child.getBounds();

                //if (hitArea) {
                //    mtx.appendTransform(hitArea.x, hitArea.y, hitArea.scaleX, hitArea.scaleY, hitArea.rotation, hitArea.skewX, hitArea.skewY, hitArea.regX, hitArea.regY);
                //    mtx.alpha = hitArea.alpha;
                //    b = hitArea.getBounds();
                //    b = hitArea.getTransformedBounds();
                //}

                if (!b) continue;

                var p1 = mtx.transformPoint(b.x, b.y);
                var p2 = mtx.transformPoint(b.x + b.width, b.y + b.height);
                var p3 = mtx.transformPoint(b.x , b.y + b.height);
                var p4 = mtx.transformPoint(b.x + b.width, b.y);
                
                var minX = Math.min(p1.x, p2.x, p3.x, p4.x)
                var maxX = Math.max(p1.x, p2.x, p3.x, p4.x)
                
                var minY = Math.min(p1.y, p2.y, p3.y, p4.y)
                var maxY = Math.max(p1.y, p2.y, p3.y, p4.y)
                         
                if (x > minX && x < maxX  && y > minY && y < maxY) {
                    if (arr) { arr.push(child); }
                    else { return (mouse && !this.mouseChildren) ? this : child; }
                }
                else
                    continue;
            }
        }
        return null;
    };
}