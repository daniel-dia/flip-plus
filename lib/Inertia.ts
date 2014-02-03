class Inertia {

    //Adds a inertial drag movement to a Display Object
    public static addInertia(target: createjs.DisplayObject, moveX = true, moveY= true,eventOrigin?:createjs.DisplayObject, inertiaFactor: number = 0.95) {

        var pivotX = 0; var pivotY = 0;
        var oldPosX = 0; var oldPosY = 0;
        var speedX = 0; var speedY = 0;

        var inertiaInterval: number;

        var mouseDown = false;

        if (!eventOrigin) eventOrigin = target;

        eventOrigin.addEventListener("mousedown", (evt: createjs.MouseEvent) => {
            clearInterval(inertiaInterval);
            speedX = speedY = 0;
            oldPosX = target.x;
            oldPosY = target.y;

            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);

            pivotX = pos.x - target.x;
            pivotY = pos.y - target.y;

            mouseDown = true;

            inertiaInterval = setInterval(() => {

                if (moveX) speedX = speedX * inertiaFactor;
                if (moveY) speedY = speedY * inertiaFactor;

                target.x += speedX;
                target.y += speedY;

                target.dispatchEvent("onmoving");

                if (mouseDown == false && Math.abs(speedX) + Math.abs(speedY) < 5) {
                    clearInterval(inertiaInterval);
                    target.dispatchEvent("onstop");
                }
            }, 1000 / createjs.Ticker.getFPS())
            }

        );

        eventOrigin.addEventListener("pressmove", (evt: createjs.MouseEvent) => {

            var pos = eventOrigin.globalToLocal(evt.stageX, evt.stageY);

            if (moveX) target.x = pos.x - pivotX;
            if (moveY) target.y = pos.y - pivotY;

            target.dispatchEvent("onmoving");

            speedX = target.x - oldPosX;
            speedY = target.y - oldPosY;

            oldPosX = target.x;
            oldPosY = target.y;

            mouseDown = true;
        });

        eventOrigin.addEventListener("pressup", (evt) => {mouseDown = false;});



    }
}