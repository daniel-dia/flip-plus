
this.createjs = this.createjs || {};

(function () {
    "use strict";


    function MovieClip(mode, startPosition, loop, labels) {
        this.Container_constructor();
        !MovieClip.inited && MovieClip.init(); // static init


        // public properties:

        this.mode = mode || MovieClip.INDEPENDENT;

        this.startPosition = startPosition || 0;

        this.loop = loop;

        this.currentFrame = 0;

        this.timeline = new createjs.Timeline(null, labels, { paused: true, position: startPosition, useTicks: true });

        this.paused = false;

        this.actionsEnabled = true;

        this.autoReset = true;

        this.frameBounds = this.frameBounds || null; // TODO: Deprecated. This is for backwards support of FlashCC

        this.framerate = null;


        // private properties:

        this._synchOffset = 0;

        this._prevPos = -1; // TODO: evaluate using a ._reset Boolean prop instead of -1.

        this._prevPosition = 0;

        this._t = 0;

        this._managed = {};

        //PIXI.ticker.shared.add(this._tick, this);
        var _this = this;
        createjs.Ticker.addEventListener("tick", function (e) { _this._tick(e) })
    }



    var p = createjs.extend(MovieClip, PIXI.Container);


    // constants:

    MovieClip.INDEPENDENT = "independent";
    MovieClip.SINGLE_FRAME = "single";
    MovieClip.SYNCHED = "synched";
    MovieClip.inited = false;


    // static methods:
    MovieClip.init = function () {

        if (MovieClip.inited) { return; }
        // plugins introduce some overhead to Tween, so we only install this if an MC is instantiated.
        MovieClipPlugin.install();
        MovieClip.inited = true;
    };


    // getter / setters:
    p.getLabels = function () {
        return this.timeline.getLabels();
    };
    p.getCurrentLabel = function () {
        this._updateTimeline();
        return this.timeline.getCurrentLabel();
    };
    p.getDuration = function () {
        return this.timeline.duration;
    };

    try {
        Object.defineProperties(p, {
            labels: { get: p.getLabels },
            currentLabel: { get: p.getCurrentLabel },
            totalFrames: { get: p.getDuration },
            duration: { get: p.getDuration }
        });
    } catch (e) { }


    // inserting

    p.initialize = MovieClip; // TODO: Deprecated. This is for backwards support of FlashCC
    p.isVisible = function () {
        // children are placed in draw, so we can't determine if we have content.
        return !!(this.visible && this.alpha > 0 && this.scaleX != 0 && this.scaleY != 0);
    };

    p.draw = function (ctx, ignoreCache) {
        // draw to cache first:
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }
        this._updateTimeline();
        this.Container_draw(ctx, ignoreCache);
        return true;
    };
    p.play = function () {
        this.paused = false;
    };
    p.stop = function () {
        this.paused = true;
    };

    p.gotoAndPlay = function (positionOrLabel) {
        this.paused = false;
        this._goto(positionOrLabel);
    };

    p.gotoAndStop = function (positionOrLabel) {
        this.paused = true;
        this._goto(positionOrLabel);
    };

    p.advance = function (time) {
        // TODO: should we worry at all about clips who change their own modes via frame scripts?
        var independent = MovieClip.INDEPENDENT;
        if (this.mode != independent) { return; }

        var o = this, fps = o.framerate;
        while ((o = o.parent) && fps == null) {
            if (o.mode == independent) { fps = o._framerate; }
        }
        this._framerate = fps;

        var t = (fps != null && fps != -1 && time != null) ? time / (1000 / fps) + this._t : 1;
        var frames = t | 0;
        this._t = t - frames; // leftover time

        while (!this.paused && frames--) {
            this._prevPosition = (this._prevPos < 0) ? 0 : this._prevPosition + 1;
            this._updateTimeline();
        }
    };

    p.clone = function () {
        // TODO: add support for this? Need to clone the Timeline & retarget tweens - pretty complex.
        throw ("MovieClip cannot be cloned.")
    };


    p.toString = function () {
        return "[MovieClip (name=" + this.name + ")]";
    };


    // private methods:

    p._tick = function (evtObj) {
        //ver aqui, deve avançar
        if (this.timeline)
            this._updateTimeline();
        this.advance(evtObj && evtObj.delta);
        //this.Container__tick(evtObj);
    };

    p._goto = function (positionOrLabel) {
        var pos = this.timeline.resolve(positionOrLabel);
        if (pos == null) { return; }
        // prevent _updateTimeline from overwriting the new position because of a reset:
        if (this._prevPos == -1) { this._prevPos = NaN; }
        this._prevPosition = pos;
        this._t = 0;
        this._updateTimeline();
    };

    p._reset = function () {
        this._prevPos = -1;
        this._t = this.currentFrame = 0;
        this.paused = false;
    };


    p._updateTimeline = function () {

        var tl = this.timeline;
        var synched = this.mode != MovieClip.INDEPENDENT;
        tl.loop = (this.loop == null) ? true : this.loop;

        var pos = synched ? this.startPosition + (this.mode == MovieClip.SINGLE_FRAME ? 0 : this._synchOffset) : (this._prevPos < 0 ? 0 : this._prevPosition);
        var mode = synched || !this.actionsEnabled ? createjs.Tween.NONE : null;

        // pre-assign currentFrame so it is available to frame scripts:
        this.currentFrame = tl._calcPosition(pos);

        // update timeline position, ignoring actions if this is a graphic.
        tl.setPosition(pos, mode);

        this._prevPosition = tl._prevPosition;

        if (this._prevPos == tl._prevPos) { return; }

        this.currentFrame = this._prevPos = tl._prevPos;

        for (var n in this._managed) {
            this._managed[n] = 1;
        }

        var tweens = tl._tweens;
        for (var i = 0, l = tweens.length; i < l; i++) {

            var tween = tweens[i];
            var target = tween._target;
            if (target == this || tween.passive) { continue; } // TODO: this assumes actions tween has this as the target. Valid?
            var offset = tween._stepPosition;

            if (target instanceof PIXI.DisplayObject) {
                // motion tween.
                this._addManagedChild(target, offset);
            } else {
                // state tween.
                this._setState(target.state, offset);
            }
        }

        var kids = this.children;
        for (i = kids.length - 1; i >= 0; i--) {
            var id = kids[i].id;
            if (this._managed[id] == 1) {
                this.removeChildAt(i);
                delete (this._managed[id]);
            }
        }
    };

    p._setState = function (state, offset) {
        if (!state) { return; }
        for (var i = state.length - 1; i >= 0; i--) {
            var o = state[i];
            var target = o.t;
            var props = o.p;
            for (var n in props) { target[n] = props[n]; }
            this._addManagedChild(target, offset);
        }
    };

    p._addManagedChild = function (child, offset) {
        if (child._off) {
            return;
        }
        if (!child.id)
            child.id = createjs.UID.get();

        this.addChildAt(child, 0);

        if (child instanceof MovieClip) {
            child._synchOffset = offset;
            // TODO: this does not precisely match Flash. Flash loses track of the clip if it is renamed or removed from the timeline, which causes it to reset.
            if (child.mode == MovieClip.INDEPENDENT && child.autoReset && !this._managed[child.id]) { child._reset(); }
        }
        this._managed[child.id] = 2;
    };

    p._getBounds = function (matrix, ignoreTransform) {
        var bounds = this.DisplayObject_getBounds();
        if (!bounds) {
            this._updateTimeline();
            if (this.frameBounds) { bounds = this._rectangle.copy(this.frameBounds[this.currentFrame]); }
        }
        if (bounds) { return this._transformBounds(bounds, matrix, ignoreTransform); }
        return this.Container__getBounds(matrix, ignoreTransform);
    };


    p.destroy = function () {
        this.stop();
        core.Sprite.prototype.destroy.call(this);
    };

    // UID


    createjs.MovieClip = createjs.promote(MovieClip, "Container");



    // MovieClipPlugin for TweenJS:

    function MovieClipPlugin() {
        throw ("MovieClipPlugin cannot be instantiated.")
    }


    MovieClipPlugin.priority = 100; // very high priority, should run first


    MovieClipPlugin.install = function () {
        createjs.Tween.installPlugin(MovieClipPlugin, ["startPosition"]);
    };

    MovieClipPlugin.init = function (tween, prop, value) {
        return value;
    };

    MovieClipPlugin.step = function () {
        // unused.
    };
    /**
	 * @method tween
	 * @param {Tween} tween
	 * @param {String} prop
	 * @param {String | Number | Boolean} value
	 * @param {Array} startValues
	 * @param {Array} endValues
	 * @param {Number} ratio
	 * @param {Object} wait
	 * @param {Object} end
	 * @return {*}
	 */
    MovieClipPlugin.tween = function (tween, prop, value, startValues, endValues, ratio, wait, end) {
        if (!(tween.target instanceof MovieClip)) { return value; }
        return (ratio == 1 ? endValues[prop] : startValues[prop]);
    };



}());


var Ticker = createjs.Ticker;
Ticker._setupTick = function () {
    if (Ticker._timerId != null) { return; } // avoid duplicates

    var mode = Ticker.timingMode || (Ticker.useRAF && Ticker.RAF_SYNCHED);

    Ticker._raf = false;

    Ticker._timerId = setTimeout(function () {
        Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
    }, 1);

};
