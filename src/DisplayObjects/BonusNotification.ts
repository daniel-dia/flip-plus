declare var blockIn;
declare var blockOut;

module FlipPlus.DisplayObjects {
    export class BonusNotification extends PIXI.Container {

        private Image: PIXI.Sprite;
        private Text: PIXI.extras.BitmapText;
        private Botao: gameui.BitmapTextButton;
        private Background: PIXI.Sprite;
        private content: PIXI.Container;

        private static Top = 0;
        private static TopClosed = -391;
        private static Delta = 100;
        
        public constructor() {
            super();
            this.y = BonusNotification.TopClosed;

            this.Background = gameui.AssetsManager.getBitmap("popups/Notification");
            this.addChild(this.Background);

            this.content = new PIXI.Container();
            this.addChild(this.content);
            this.content.y = 378 / 2;

            this.Image = gameui.AssetsManager.getBitmap("store/200parts");
            this.content.addChild(this.Image)
            this.Image.regY = 208 / 2;
            this.Image.regX = 304 / 2;
            this.Image.x = 250;

            this.Text = gameui.AssetsManager.getBitmapText("SEU BONUS\nESTÁ PRONTO!", "fontWhite");
            this.content.addChild(this.Text)
            this.Text.pivot.x = this.Text.textWidth / 2;
            this.Text.pivot.y = this.Text.textHeight / 2;
            this.Text.x = defaultWidth / 2;
            this.Text.align = 'center';

            this.Botao = new gameui.BitmapTextButton("Play", "fontWhite", "menu/btmusicon", () => { this.emit("play"); });
            this.content.addChild(this.Botao);
            this.Botao.x = defaultWidth - 250;
            
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
                if (this.y < BonusNotification.Top - BonusNotification.Delta)
                    this.hide();
                else
                    this.show();
            }

            var move = (e: PIXI.interaction.InteractionEvent) => {
                if (!moving) return
                var point = e.data.getLocalPosition(this.parent).y;
                this.y += point - previousPoint;
                this.y = Math.min(BonusNotification.Top, this.y)
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
            //this.y = BonusNotification.TopClosed;
            createjs.Tween.get(this)
                .to({ y: BonusNotification.Top }, 500, createjs.Ease.quadOut);
        }

        public hide() {
            createjs.Tween.removeTweens(this)
            this.visible = true;
            //this.y = BonusNotification.Top;
            createjs.Tween.get(this)
                .to({ y: BonusNotification.TopClosed }, 500, createjs.Ease.quadOut);
        }
    }
}


