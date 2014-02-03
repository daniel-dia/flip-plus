with (createjs) {
    (function (window) {

 

        simple_f = function () {
            this.initialize();
        }
        simple_f._SpriteSheet = new SpriteSheet({ images: ["assets/simple.png"], frames: [[78, 91, 74, 75, 0, 0, 0]] });
        var simple_f_p = simple_f.prototype = new Sprite();
        simple_f_p.Sprite_initialize = simple_f_p.initialize;
        simple_f_p.initialize = function () {
            this.Sprite_initialize(simple_f._SpriteSheet);
            this.paused = false;
        }
        window.simple_f = simple_f;
        simple_fa = function () {
            this.initialize();
        }
        simple_fa._SpriteSheet = new SpriteSheet({ images: ["assets/simple.png"], frames: [[166, 83, 75, 75, 0, -0.25, 0.4499999999999993], [414, 2, 82, 76, 0, 4.75, 0.4499999999999993], [166, 2, 83, 79, 0, 6.75, 1.4499999999999993], [335, 2, 77, 81, 0, 3.75, 2.4499999999999993], [78, 244, 65, 82, 0, -2.25, 2.4499999999999993], [2, 316, 46, 82, 0, -12.25, 2.4499999999999993], [481, 80, 24, 96, 0, -24.25, 15.45], [429, 329, 6, 82, 0, -34.25, 2.4499999999999993], [396, 85, 11, 81, 0, -32.25, 2.4499999999999993], [371, 329, 26, 79, 0, -25.25, 1.4499999999999993], [93, 328, 41, 79, 0, -18.25, 1.4499999999999993], [145, 312, 54, 78, 0, -11.25, 1.4499999999999993], [230, 311, 65, 76, 0, -5.25, 0.4499999999999993], [2, 87, 74, 75, 0, -0.25, 0.4499999999999993]] });
        var simple_fa_p = simple_fa.prototype = new Sprite();
        simple_fa_p.Sprite_initialize = simple_fa_p.initialize;
        simple_fa_p.initialize = function () {
            this.Sprite_initialize(simple_fa._SpriteSheet);
            this.paused = false;
        }
        window.simple_fa = simple_fa;
        simple_t = function () {
            this.initialize();
        }
        simple_t._SpriteSheet = new SpriteSheet({ images: ["assets/simple.png"], frames: [[243, 159, 74, 74, 0, 0, 0], [154, 160, 74, 74, 0, 0, 0], [319, 162, 74, 74, 0, 0, 0], [2, 164, 74, 74, 0, 0, 0], [78, 168, 74, 74, 0, 0, 0], [395, 173, 74, 74, 0, 0, 0], [230, 235, 74, 74, 0, 0, 0], [154, 236, 74, 74, 0, 0, 0], [306, 238, 74, 74, 0, 0, 0], [2, 240, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0], [243, 159, 74, 74, 0, 0, 0]] });
        var simple_t_p = simple_t.prototype = new Sprite();
        simple_t_p.Sprite_initialize = simple_t_p.initialize;
        simple_t_p.initialize = function () {
            this.Sprite_initialize(simple_t._SpriteSheet);
            this.paused = false;
        }
        window.simple_t = simple_t;
        simple_ta = function () {
            this.initialize();
        }
        simple_ta._SpriteSheet = new SpriteSheet({ images: ["assets/simple.png"], frames: [[243, 83, 75, 74, 0, -0.25, -0.5500000000000007], [251, 2, 82, 79, 0, 4.75, 3.4499999999999993], [2, 2, 83, 83, 0, 6.75, 6.449999999999999], [87, 2, 77, 87, 0, 3.75, 9.45], [414, 80, 65, 91, 0, -2.25, 12.45], [297, 314, 46, 91, 0, -12.25, 12.45], [345, 314, 24, 91, 0, -24.25, 12.45], [399, 329, 15, 96, 0, -29.25, 15.45], [136, 328, 6, 90, 0, -34.25, 11.45], [416, 329, 11, 89, 0, -32.25, 10.45], [201, 312, 26, 86, 0, -25.25, 8.45], [50, 328, 41, 84, 0, -18.25, 7.449999999999999], [449, 249, 54, 81, 0, -11.25, 4.449999999999999], [382, 249, 65, 78, 0, -5.25, 2.4499999999999993], [320, 85, 74, 75, 0, -0.25, 0.4499999999999993]] });
        var simple_ta_p = simple_ta.prototype = new Sprite();
        simple_ta_p.Sprite_initialize = simple_ta_p.initialize;
        simple_ta_p.initialize = function () {
            this.Sprite_initialize(simple_ta._SpriteSheet);
            this.paused = false;
        }
        window.simple_ta = simple_ta;
    }(window));


}