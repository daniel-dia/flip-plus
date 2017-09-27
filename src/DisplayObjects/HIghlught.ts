declare var blockIn;
declare var blockOut;

module FlipPlus.DisplayObjects {
    export class Highlight extends gameui.UIItem {

        private highlight: PIXI.extras.MovieClip;

        public constructor() {
            super();

            this.highlight = gameui.AssetsManager.getMovieClip("touch")
            this.addChild(this.highlight);
            this.visible = false;
            this.interactive = false;
            this.interactiveChildren = false;
            this.highlight.regX = this.highlight.regY = 252/2;
            this.highlight.hitArea = new PIXI.Rectangle(0, 0, 1, 1);

        }

        public show(x: number = 0, y: number = 0) {
            this.x = x; this.y = y;
            this.fadeIn();
            this.highlight.play();
        }

        public hide() {
            this.highlight.stop();
            this.fadeOut();
        }
    }
}

