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

            var titleDO = gameui.AssetsManager.getBitmapText("BONUS", "fontTitle");
            this.content.addChild(titleDO);
            titleDO.regX = titleDO.textWidth / 2;
            titleDO.x = defaultWidth / 2;
            titleDO.y = 200;

            var textDO = gameui.AssetsManager.getBitmapText("Tap Play", "fontWhite");
            this.content.addChild(textDO);
            textDO.regX = textDO.textWidth / 2;
            textDO.x = defaultWidth / 2;
            textDO.y = 1600;
            textDO.visible = false;
            setTimeout(() => { textDO.visible = true }, 5000);

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
            this.content.addChild(this.fx);

            gameui.AudiosManager.playMusic("roulette");


            setTimeout(() => { this.startRoulette() }, 500);
        }

        private startRoulette() {

            var bonus = ["Bonus1", "Bonus2", "Bonus3"];
            var i = 0;
            var interval = setInterval(() => {
                i = (i + Math.ceil(Math.random() * (bonus.length - 1))) % bonus.length;
                var preview: PIXI.Sprite = gameui.AssetsManager.getBitmap("BonusRoulette/" + bonus[i]);
                preview.regX = 969 / 2;
                preview.regY = 555 / 2;
                this.monitor.setContent(preview);

            }, 200)


            this.monitor.once("play", () => {
                this.fx.castEffect(768, 900, "Bolinhas", 5)
                gameui.AudiosManager.playSound("star")
                clearInterval(interval);
                setTimeout(() => {
                    FlipPlusGame.showBonus(bonus[i])
                }, 1000);
            })

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