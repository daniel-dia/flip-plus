module FlipPlus{

    // Class
    export class Effects extends PIXI.Container {
        
        // cast an effect
        public castEffect(x: number, y: number, effect: string, scale = 1) {
            var fx: PIXI.extras.MovieClip = gameui.AssetsManager.getMovieClip(effect);
            this.addChild(fx);
            fx.mouseEnabled = false;
            fx.loop = false;
            fx.play();
            fx.x = x;
            fx.y = y;
            fx.scale.y = fx.scale.x = scale;
            

            fx.onComplete = () => {
               fx.stop();
               this.removeChild(fx);
            };

        }
    }

}
