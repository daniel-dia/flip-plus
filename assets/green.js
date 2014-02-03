with (createjs) {
    (function (window) {
        DInv = function () {
            this.initialize();
        }
        DInv._SpriteSheet = new SpriteSheet({ images: ["assets/green.png"], frames: [[0, 0, 141, 141, 0, 0, 0]] });
        var DInv_p = DInv.prototype = new Sprite();
        DInv_p.Sprite_initialize = DInv_p.initialize;
        DInv_p.initialize = function () {
            this.Sprite_initialize(DInv._SpriteSheet);
            this.paused = false;
        }
        window.DInv = DInv;


        DInv_DNor = function () {
            this.initialize();
        }
        DInv_DNor._SpriteSheet = new SpriteSheet({
            images: ["assets/green.png"],
            frames: [[141, 0, 141, 140, 0, 0, -0.09999999999999964],
		   [282, 0, 105, 148, 0, -16, 3.9000000000000004],
		   [387, 0, 65, 152, 0, -38, 5.9],
		   [452, 0, 32, 157, 0, -51, 7.9],
		   [0, 157, 65, 152, 0, -35, 5.9],
		   [65, 157, 105, 148, 0, -16, 3.9000000000000004],
		   [170, 157, 141, 140, 0, 0, -0.09999999999999964]],
            frequency: 30
        });
        var DInv_DNor_p = DInv_DNor.prototype = new Sprite();
        DInv_DNor_p.Sprite_initialize = DInv_DNor_p.initialize;
        DInv_DNor_p.initialize = function () {
            this.Sprite_initialize(DInv_DNor._SpriteSheet);
            this.paused = false;
        }
        window.DInv_DNor = DInv_DNor;


        DNor = function () {
            this.initialize();
        }
        DNor._SpriteSheet = new SpriteSheet({ images: ["assets/green.png"], frames: [[311, 157, 140, 140, 0, 0, 0]] });
        var DNor_p = DNor.prototype = new Sprite();
        DNor_p.Sprite_initialize = DNor_p.initialize;
        DNor_p.initialize = function () {
            this.Sprite_initialize(DNor._SpriteSheet);
            this.paused = false;
        }
        window.DNor = DNor;
        DNor_DInv = function () {
            this.initialize();
        }
        DNor_DInv._SpriteSheet = new SpriteSheet({
            images: ["assets/green.png"], frames:
            [[170, 157, 141, 140, 0, 0, -0.09999999999999964],
            [65, 157, 105, 148, 0, -16, 3.9000000000000004],
            [0, 157, 65, 152, 0, -35, 5.9],
            [452, 0, 32, 157, 0, -51, 7.9],
            [0, 309, 66, 152, 0, -38, 5.9],
            [66, 309, 105, 148, 0, -16, 3.9000000000000004],
            [171, 309, 141, 139, 0, 0, -0.09999999999999964]]
        }); var DNor_DInv_p = DNor_DInv.prototype = new Sprite();
        DNor_DInv_p.Sprite_initialize = DNor_DInv_p.initialize;
        DNor_DInv_p.initialize = function () {
            this.Sprite_initialize(DNor_DInv._SpriteSheet);
            this.paused = false;
        }
        window.DNor_DInv = DNor_DInv;
        Inv = function () {
            this.initialize();
        }
        Inv._SpriteSheet = new SpriteSheet({ images: ["assets/green.png"], frames: [[312, 309, 141, 141, 0, 0, 0]] });
        var Inv_p = Inv.prototype = new Sprite();
        Inv_p.Sprite_initialize = Inv_p.initialize;
        Inv_p.initialize = function () {
            this.Sprite_initialize(Inv._SpriteSheet);
            this.paused = false;
        }
        window.Inv = Inv;
        Inv_Nor = function () {
            this.initialize();
        }
        Inv_Nor._SpriteSheet = new SpriteSheet({
            images: ["assets/green.png"], frames:
            [[0, 461, 141, 141, 0, 0, -0.09999999999999964],
            [141, 461, 105, 148, 0, -16, 3.9000000000000004],
            [246, 461, 66, 152, 0, -38, 5.9],
            [312, 461, 32, 157, 0, -51, 7.9],
            [344, 461, 66, 152, 0, -35, 5.9],
            [0, 618, 106, 148, 0, -16, 3.9000000000000004],
            [106, 618, 141, 141, 0, 0, -0.09999999999999964]]
        });
        var Inv_Nor_p = Inv_Nor.prototype = new Sprite();
        Inv_Nor_p.Sprite_initialize = Inv_Nor_p.initialize;
        Inv_Nor_p.initialize = function () {
            this.Sprite_initialize(Inv_Nor._SpriteSheet);
            this.paused = false;
        }
        window.Inv_Nor = Inv_Nor;
        Nor = function () {
            this.initialize();
        }
        Nor._SpriteSheet = new SpriteSheet({ images: ["assets/green.png"], frames: [[247, 618, 140, 141, 0, 0, 0]] });
        var Nor_p = Nor.prototype = new Sprite();
        Nor_p.Sprite_initialize = Nor_p.initialize;
        Nor_p.initialize = function () {
            this.Sprite_initialize(Nor._SpriteSheet);
            this.paused = false;
        }
        window.Nor = Nor;
        Nor_Inv = function () {
            this.initialize();
        }
        Nor_Inv._SpriteSheet = new SpriteSheet({
            images: ["assets/green.png"], frames:
            [[106, 618, 141, 141, 0, 0, -0.09999999999999964],
            [0, 618, 106, 148, 0, -16, 3.9000000000000004],
            [344, 461, 66, 152, 0, -35, 5.9],
            [312, 461, 32, 157, 0, -51, 7.9],
            [246, 461, 66, 152, 0, -38, 5.9],
            [141, 461, 105, 148, 0, -16, 3.9000000000000004],
            [0, 461, 141, 141, 0, 0, -0.09999999999999964]]
        });
        var Nor_Inv_p = Nor_Inv.prototype = new Sprite();
        Nor_Inv_p.Sprite_initialize = Nor_Inv_p.initialize;
        Nor_Inv_p.initialize = function () {
            this.Sprite_initialize(Nor_Inv._SpriteSheet);
            this.paused = false;
        }
        window.Nor_Inv = Nor_Inv;
    }(window));


}