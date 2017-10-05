module FlipPlus.Bonus {

    // Class
    export class BonusRouletteScreen extends gameui.ScreenState {

        private fx: FlipPlus.Effects;
        private bg: PIXI.DisplayObject;
        private light: PIXI.DisplayObject;
        private monitor: FlipPlus.DisplayObjects.Monitor;

        constructor() {
            super();
            this.addObjects();
        }

        private addObjects() {
            this.bg = gameui.AssetsManager.getBitmap("BonusRoulette/bggeneric");
            this.background.addChild(this.bg);
            this.bg.scaleX = this.bg.scaleY = 4;

            this.light = gameui.AssetsManager.getBitmap("BonusRoulette/luzfundo");
            this.background.addChild(this.light);
            this.light.scaleX = this.light.scaleY = 3.5;
            this.light.x = 768;
            this.light.y = 1024;
            this.light.regX = 768 / 2;
            this.light.regY = 1024 / 2;
            this.light.alpha = 0.15;
            createjs.Tween.get(this.light).to({ rotation: Math.PI * 2 }, 6000).loop = true;

            this.monitor = new FlipPlus.DisplayObjects.Monitor();
            this.monitor.x = 768;
            this.monitor.y = 1024;
            this.content.addChild(this.monitor);

            this.fx = new FlipPlus.Effects();

            setTimeout(() => { this.startRoulette() }, 1000);
        }

        private startRoulette() {

            var bonus = ["Bonus1", "Bonus2", "Bonus3"];
            var i = 0;
            setInterval(() => {
                var preview: PIXI.Sprite = gameui.AssetsManager.getBitmap("BonusRoulette/" + bonus[i]);
                preview.regX = 969 / 2;
                preview.regY = 555 / 2;
                this.monitor.setContent(preview);
                i = (i+1) % bonus.length;
            }, 200)
 
          
           
        }

        private showBonusScreen(screenId: string) {
            FlipPlusGame.showBonus(screenId)
        }

        //===========================================================

        activate(parameters?: any) {
            super.activate(parameters);
        }

        desactivate(parameters?: any) {
            createjs.Tween.removeTweens(this.light);
        }

        back() {
            return null;
        }
    }
}  