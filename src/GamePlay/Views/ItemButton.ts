module FlipPlus.GamePlay.Views {

    export class ItemButton extends gameui.TextButton {

        constructor(item: string, event: (itemId: string) => void) {
            super("--", "90px " + defaultFont, "white", "puzzle/btbuyitem", () => {
                event(item)
            });

            var part = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            this.addChild(part);
            part.regX = 113 / 2;
            part.regY = 93 / 2;
            part.x = 250 - 245;
            part.scaleX = 0.8;
            part.scaleY = 0.8;

            var icon = gameui.AssetsManager.getBitmap("puzzle/icon_" + item);
            this.addChild(icon);
            icon.regX = 139 / 2;
            icon.regY = 148 / 2;
            icon.x = 90 - 245;

            this.text.textAlign = 'left';
            this.text.x = 330 - 246;
            this.text.y -= 5;
        }

        public updatePrice(price: number) {
            this.text.text = price.toString();
        }
    }
}