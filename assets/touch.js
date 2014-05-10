with (createjs) {
    (function (window) {
        touch = function () {
            this.initialize();
        }
        touch._SpriteSheet = new SpriteSheet({ });
        var touch_p = touch.prototype = new BitmapAnimation();
        touch_p.BitmapAnimation_initialize = touch_p.initialize;
        touch_p.initialize = function () {
            this.BitmapAnimation_initialize(touch._SpriteSheet);
            this.paused = false;
        }
        window.touch = touch;
    }(window));


}