var Inertia = (function () {
    function Inertia() {
    }
    Inertia.addInertia = function (target, moveX, moveY, eventOrigin, inertiaFactor) {
        if (moveX === void 0) { moveX = true; }
        if (moveY === void 0) { moveY = true; }
        if (inertiaFactor === void 0) { inertiaFactor = 0.95; }
        var pivotX = 0;
        var pivotY = 0;
        var oldPosX = 0;
        var oldPosY = 0;
        var speedX = 0;
        var speedY = 0;
        var inertiaInterval;
        var mouseDown = false;
        if (!eventOrigin)
            eventOrigin = target;
        eventOrigin.addEventListener("mousedown", function (evt) {
            clearInterval(inertiaInterval);
            speedX = speedY = 0;
            oldPosX = target.x;
            oldPosY = target.y;
            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);
            pivotX = pos.x - target.x;
            pivotY = pos.y - target.y;
            mouseDown = true;
            inertiaInterval = setInterval(function () {
                if (moveX)
                    speedX = speedX * inertiaFactor;
                if (moveY)
                    speedY = speedY * inertiaFactor;
                target.x += speedX;
                target.y += speedY;
                target.dispatchEvent("onmoving");
                if (mouseDown == false && Math.abs(speedX) + Math.abs(speedY) < 5) {
                    clearInterval(inertiaInterval);
                    target.dispatchEvent("onstop");
                }
            }, 1000 / createjs.Ticker.getFPS());
        });
        eventOrigin.addEventListener("pressmove", function (evt) {
            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);
            if (moveX)
                target.x = pos.x - pivotX;
            if (moveY)
                target.y = pos.y - pivotY;
            target.dispatchEvent("onmoving");
            speedX = target.x - oldPosX;
            speedY = target.y - oldPosY;
            oldPosX = target.x;
            oldPosY = target.y;
            mouseDown = true;
        });
        eventOrigin.addEventListener("pressup", function (evt) {
            mouseDown = false;
        });
    };
    return Inertia;
})();
//# sourceMappingURL=Inertia.js.map