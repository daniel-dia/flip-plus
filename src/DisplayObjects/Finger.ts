declare var blockIn;
declare var blockOut;

module FlipPlus.DisplayObjects {
    export class Finger extends gameui.UIItem {

        private finger: PIXI.Sprite;
        private highlight: Highlight;

        public constructor() {
            super();
            this.finger = gameui.AssetsManager.getBitmap("finger")
            this.finger.regX = 75;
            this.finger.regY = -100;
            this.addChild(this.finger);

            this.visible = false;
            this.interactive = false;
            this.interactiveChildren = false;
            this.toUp();
            
            this.highlight = new Highlight();
            this.addChild(this.highlight)

        }

        public showDown(x: number = 0, y: number = 0) {
            this.show(x, y);
            this.toDown();
        }

        public showUp(x: number = 0, y: number = 0) {
            this.show(x, y);
            this.toUp();
        }

        public show(x: number = 0, y: number = 0) {
            this.x = x; this.y = y;

            this.highlight.show();
            this.fadeIn();
            createjs.Tween.removeTweens(this.finger)
            createjs.Tween.get(this.finger)
                .to({ scaleX: 1.1, scaleY: 1.1 }, 500, createjs.Ease.quadInOut)
                .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.quadInOut)
                .loop = true;
        }

        public hide() {
            this.highlight.hide();
            createjs.Tween.removeTweens(this.finger);
            this.finger.scaleX = this.finger.scaleY = 1;
            this.fadeOut();
        }

        public toDown() {
            this.finger.rotation = 200 * Math.PI / 180;
        }

        public toUp() {
            this.finger.rotation = 330 * Math.PI / 180;
        }
    }
}

