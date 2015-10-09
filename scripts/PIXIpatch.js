Object.defineProperties(PIXI.DisplayObject.prototype, {
    scaleX: {
        get: function () {
            return this.scale.x;
        },
        set: function (v) {
            this.scale.x = v;
        }
    },
    scaleY: {
        get: function () {
            return this.scale.y;
        },
        set: function (v) {
            this.scale.y = v;
        }
    },
    mouseEnabled: {
        get: function () {
            return this.interactive
        },
        set: function (v) {
            this.interactive =v;
            this.interactiveChildren=v;
        }
    },
    regX: {
        get: function () {
            return this.pivot.x;
        },
        set: function (v) {
            this.pivot.x = v;
        }
    },
    regY: {
        get: function () {
            return this.pivot.y;
        },
        set: function (v) {
            this.pivot.y = v;
        }
    },
    rotation_d: {
        get: function () {
            return this.rotation * 180 / Math.PI;
        },
        set: function (v) {
            this.rotation = v / 180 * Math.PI;
        }
    },
    set:{
        get: function () {
            return function (props) {
                for (var n in props) { this[n] = props[n]; }
                return this;
            };
        },
    },
    addEventListener: {
        get: function () {
            return this.on
        },
    },
    addEventListenerOnce: {
        get: function () {
            return this.once
        },
    },
});

PIXI.DisplayObject.prototype.set = function (props) {
    for (var n in props) { this[n] = props[n]; }
    return this;
};

PIXI.Sprite.prototype.initialize = PIXI.Sprite.prototype.constructor
PIXI.Container.prototype.initialize = PIXI.Container.prototype.constructor
createjs.Container = PIXI.Container;
createjs.Bitmap = PIXI.Sprite;
PIXI.DisplayObject.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
    
    this.x = x || 0;
    this.y = y || 0;
    this.pivot.x = regX || 0;
    this.pivot.y = regY || 0;
    this.scale.x = scaleX == null ? 1 : scaleX;
    this.scale.y = scaleY == null ? 1 : scaleY;
    this.rotation_d = rotation || 0;

    /// Do something with this
    //this.skewX = skewX || 0;
    //this.skewY = skewY || 0;
}
PIXI.Container.prototype.cont_add = PIXI.Container.prototype.addChild;
PIXI.Container.prototype.addChild = function(child) {
  	if (child == null) { return child; }
  	var l = arguments.length; 
  	
  	if (l > 1) {
  	    for (var i = 0; i < l; i++) {
  	        if(arguments[i])this.cont_add(arguments[i]);
  	    }
  			return arguments[l-1];
  	}

  	return this.cont_add(child)
  };


