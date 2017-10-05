module FlipPlus.DisplayObjects {
    export class BonusNotification extends Notification {

        private Image: PIXI.Sprite;
        private Text: PIXI.extras.BitmapText;
        private PlayButton: gameui.BitmapTextButton;
        private bonusManager: Bonus.BonusManager;

        public constructor(bonusManager: Bonus.BonusManager) {
            super();

            this.bonusManager = bonusManager;


            this.Image = gameui.AssetsManager.getBitmap("store/200parts");
            this.Image.regY = 208 / 2;
            this.Image.regX = 304 / 2;
            this.Image.x = 250;

            this.Text = gameui.AssetsManager.getBitmapText("SEU BONUS\nESTA PRONTO!", "fontWhite");
            this.Text.pivot.x = this.Text.textWidth / 2;
            this.Text.pivot.y = this.Text.textHeight / 2;
            this.Text.x = defaultWidth / 2;
            this.Text.align = 'center';

            this.PlayButton = new gameui.BitmapTextButton("Play", "fontWhite", "menu/btmusicon", () => { this.emit("play"); });
            this.PlayButton.x = defaultWidth - 250;

            this.content.addChild(this.Text)
            this.content.addChild(this.Image)
            this.content.addChild(this.PlayButton);

            setInterval(() => { this.updateBonusInfo() }, 1000);
        }

        private updateBonusInfo() {

            var seconds = this.bonusManager.getBonusTimeoutSeconds("Bonus1");

            if (seconds <= 0)
                this.setBonusReadyText();
            else
                this.setCountDownText(seconds);
        }

        private setCountDownText(seconds: number) {
            this.Text.text = "PRÓXIMO BONUS\n" + this.toHHMMSS(seconds);
            this.Text.pivot.x = this.Text.textWidth / 2;
            this.Text.pivot.y = this.Text.textHeight / 2;
            this.PlayButton.visible = false;
        }

        private setBonusReadyText() {
            this.Text.text = "SEU BONUS\nESTA PRONTO!"
            this.Text.pivot.x = this.Text.textWidth / 2;
            this.Text.pivot.y = this.Text.textHeight / 2;
            this.PlayButton.visible = true;
        }


        ///-------------------------------------------------///

        private toHHMMSS(seconds: number): string {

            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor((seconds - (hours * 3600)) / 60);
            var seconds = seconds - (hours * 3600) - (minutes * 60);

            var s_hours = hours.toString();
            var s_minutes = minutes.toString();
            var s_seconds = seconds.toString();

            if (hours < 10) { s_hours = "0" + hours; }
            if (minutes < 10) { s_minutes = "0" + minutes; }
            if (seconds < 10) { s_seconds = "0" + seconds; }

            var time = s_hours + ':' + s_minutes + ':' + s_seconds;
            return time;
        }
    }
}


