module FlipPlus.DisplayObjects {
    export class BonusNotification extends Notification {

        public constructor() {
            super();

            var Image: PIXI.Sprite;
            var Text: PIXI.extras.BitmapText;
            var Botao: gameui.BitmapTextButton;

            Image = gameui.AssetsManager.getBitmap("store/200parts");
            Image.regY = 208 / 2;
            Image.regX = 304 / 2;
            Image.x = 250;

            Text = gameui.AssetsManager.getBitmapText("SEU BONUS\nESTÁ PRONTO!", "fontWhite");
            Text.pivot.x = Text.textWidth / 2;
            Text.pivot.y = Text.textHeight / 2;
            Text.x = defaultWidth / 2;
            Text.align = 'center';

            Botao = new gameui.BitmapTextButton("Play", "fontWhite", "menu/btmusicon", () => { this.emit("play"); });
            Botao.x = defaultWidth - 250;

            this.content.addChild(Text)
            this.content.addChild(Image)
            this.content.addChild(Botao);
        }
    }
}


