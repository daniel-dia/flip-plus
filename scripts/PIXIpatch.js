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

