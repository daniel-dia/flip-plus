module FlipPlus.DisplayObjects {
    export class Notification extends PIXI.Container {

        private Background: PIXI.Sprite;
        protected content: PIXI.Container;

        private static Top = 0;
        private static TopClosed = -391;
        private static Delta = 100;
        
        public constructor() {
            super();
            this.y = Notification.TopClosed;

            this.Background = gameui.AssetsManager.getBitmap("popups/Notification");
            this.addChild(this.Background);

            this.content = new PIXI.Container();
            this.addChild(this.content);
            this.content.y = 378 / 2;
            
            this.hide();
            this.addInteractivity();
        }

        private addInteractivity() {
            this.interactive = true;
            var previousPoint = 0;
            var moving = false;

            var start = (e: PIXI.interaction.InteractionEvent) => {
                moving = true;
                previousPoint = e.data.getLocalPosition(this.parent).y;
            }

            var end = (e: PIXI.interaction.InteractionEvent) => {
                moving = false;
                if (this.y < Notification.Top - Notification.Delta)
                    this.hide();
                else
                    this.show();
            }

            var move = (e: PIXI.interaction.InteractionEvent) => {
                if (!moving) return
                var point = e.data.getLocalPosition(this.parent).y;
                this.y += point - previousPoint;
                this.y = Math.min(Notification.Top, this.y)
                previousPoint = point;
            }

            this.on("pointerdown", start)
            this.on("pointerup", end)
            this.on("pointerupoutside", end)
            this.on("pointermove", move)
        }

        public show() {
            createjs.Tween.removeTweens(this)

            this.visible = true;
            //this.y = Notification.TopClosed;
            createjs.Tween.get(this)
                .to({ y: Notification.Top }, 500, createjs.Ease.quadOut);
        }

        public hide() {
            createjs.Tween.removeTweens(this)
            this.visible = true;
            //this.y = Notification.Top;
            createjs.Tween.get(this)
                .to({ y: Notification.TopClosed }, 500, createjs.Ease.quadOut);
        }
    }
}


