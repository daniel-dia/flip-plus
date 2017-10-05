declare var blockIn;
declare var blockOut;

module FlipPlus.DisplayObjects {
    export class Monitor extends PIXI.Container {

        private content: PIXI.DisplayObject;

        private staticFX: PIXI.Sprite;

        private screen: PIXI.Container;

        public constructor() {
            super();

            this.regX = 1041 / 2;
            this.regY = 962 / 2;

            // add Background
            var background = gameui.AssetsManager.getBitmap("monitor")
            this.addChild(background);

            // add screen contents
            this.screen = new PIXI.Container();
            this.screen.x = 39 + 969 / 2;
            this.screen.y = 30 + 555 / 2;
            this.addChild(this.screen)

            // mask screen
            var mask = gameui.AssetsManager.getBitmap("terminalMask");
            mask.regX = 484;
            mask.regY = 277;
            this.screen.addChild(mask);
            this.screen.mask = mask;

            // add Contents
            this.content = new PIXI.Container();
            this.screen.addChild(this.content)

            // add effects
            this.staticFX = gameui.AssetsManager.getBitmap("static");
            this.staticFX.visible = false;
            this.screen.addChild(this.staticFX);

        }

        private doStaticFX() {
            // animates static
            this.screen.addChild(this.staticFX);
            this.staticFX.regX = 484;
            this.staticFX.regY = 277;
            this.staticFX.visible = true;
            createjs.Tween.get(this.staticFX).
                to({ alpha: 0.1, y: -400 + 277 }, 30).
                to({ alpha: 0.7, y: -300 + 277 }, 30).
                to({ alpha: 0.1, y: -200 + 277 }, 30).
                to({ alpha: 0.7, y: -100 + 277 }, 30).
                to({ alpha: 0.1, y: 0 }, 50)
                .call(() => {
                    this.staticFX.visible = false;
                });

        }

        public setContent(content: PIXI.DisplayObject) {
            var oldContent = this.content;
            this.content = content;
            this.screen.addChild(content);
            this.doStaticFX();

            // play Sound
            gameui.AudiosManager.playSound("terminal")

            // animates in the new content
            createjs.Tween.get(content) 
                .to({ scaleX: 0, scaleY: 3, alpha: 0 })
                .wait(100)
                .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 100, createjs.Ease.quadOut);

            // animates out the monitor content
            if (oldContent)
                createjs.Tween.get(oldContent)
                    .to({ scaleX: 3, scaleY: 0, alpha: 0 }, 100, createjs.Ease.quadOut)
                    .call(() => { this.screen.removeChild(oldContent); });
        }

        public setText(text: string, timeout: number = 8000) {

            var content = new PIXI.Container();
            var textDO = gameui.AssetsManager.getBitmapText("", "fontWhite");
            textDO.maxWidth = 920;
            textDO.x = - 500;
            textDO.y = - 330;

            content.addChild(textDO);

            content.x = 420;
            content.y = 250;

            this.setContent(content);

            var char = 0;

            //textDO.text = text;
            //return;
            var i = setInterval(() => {
                textDO.text = "";
                textDO.text = text.substring(0, char++);
                gameui.AudiosManager.playSound("terminalChar", true);
                if (char > text.length)
                    clearInterval(i);
            }, 40);
        }

    }
}

