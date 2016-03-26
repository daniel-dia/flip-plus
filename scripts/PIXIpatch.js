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
PIXI.Container.prototype.Container_addChild = PIXI.Container.prototype.addChild;
PIXI.Container.prototype.addChild = function(child) {
  	if (child == null) { return child; }
  	var l = arguments.length; 
  	
  	if (l > 1) {
  	    for (var i = 0; i < l; i++) {
  	        if (arguments[i]) this.Container_addChild(arguments[i]);
  	    }
  			return arguments[l-1];
  	}

  	return this.Container_addChild(child)
  };



createjs.Container = PIXI.Container;
createjs.Bitmap = PIXI.Sprite;
createjs.DisplayObject.prototype.emit = function () { };
createjs.DisplayObject.prototype.on = function () { };
createjs.DisplayObject.prototype.updateTransform = function () { };
createjs.DisplayObject.prototype.once = function () { };
createjs.DisplayObject.prototype.renderWebGL = function () { };
createjs.DisplayObject.prototype.renderCanvas = function () { };


//============== multiTouch/

InteractionManager.prototype.processTouchStart = function (displayObject, hit, identifier) {

    if (hit) {
        displayObject._touchDown = identifier;
        this.dispatchEvent(displayObject, 'touchstart', this.eventData);
    }
};


/**
 * Is called when a touch ends on the renderer element
 * @param event {Event} The DOM event of a touch ending on the renderer view
 *
 */
InteractionManager.prototype.onTouchEnd = function (event) {
    if (this.autoPreventDefault) {
        event.preventDefault();
    }

    var changedTouches = event.changedTouches;
    var cLength = changedTouches.length;

    for (var i = 0; i < cLength; i++) {
        var touchEvent = changedTouches[i];

        var touchData = this.getTouchData(touchEvent);

        touchData.originalEvent = event;

        //TODO this should be passed along.. no set
        this.eventData.data = touchData;
        this.eventData.stopped = false;


        this.processInteractive(touchData.global, this.renderer._lastObjectRendered, this.processTouchEnd, true, null, touchData.identifier);

        this.returnTouchData(touchData);
    }
};

/**
 * Processes the result of the end of a touch and dispatches the event if need be
 *
 * @param displayObject {Container|Sprite|TilingSprite} The display object that was tested
 * @param hit {boolean} the result of the hit test on the display object
 * @private
 */
InteractionManager.prototype.processTouchEnd = function (displayObject, hit, identifier) {
    if (hit) {
        this.dispatchEvent(displayObject, 'touchend', this.eventData);
        //console.log(identifier + " " + displayObject._touchDown)
        if (displayObject._touchDown == identifier) {
            displayObject._touchDown = false;
            this.dispatchEvent(displayObject, 'tap', this.eventData);
        }
    }
    else {
        if (displayObject._touchDown == identifier) {
            displayObject._touchDown = false;
            this.dispatchEvent(displayObject, 'touchendoutside', this.eventData);
        }
    }
};
 