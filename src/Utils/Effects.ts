module FlipPlus{

    // Class
    export class Effects extends PIXI.Container {
        
        // cast an effect
        public castEffect(x:number,y:number,effect:string,scale=1) {
            var fx: PIXI.Sprite = gameui.AssetsManager.getSprite(effect);
            this.addChild(fx);
            fx.mouseEnabled = false;
            fx.play();
            fx.x = x;
            fx.y = y;
            fx.scale.y = fx.scale.x = scale;
            

            fx.addEventListener("animationend", (e) => {
                fx.stop();
                this.removeChild(fx);
            });

        }
    }

}
