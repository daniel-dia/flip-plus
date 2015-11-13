module FlipPlus.Menu.View {

    // View Class
    export class CoinsIndicator extends gameui.Button{

        private coinsTextField: PIXI.extras.BitmapText;

        private fx: FlipPlus.Effects;
        
        // Constructor
        constructor(event?: () => any) {
            super(event);
            this.buildView();

            //Add Effects
            this.fx = new FlipPlus.Effects();
            this.addChild(this.fx);
        }

        //updates Parts indicator amount
        public updateAmmount(newQuantity: number, tween:boolean=true) {
            this.coinsTextField.text = newQuantity.toString();
        }

        public createCoinEffect(x: number, y: number, coins: number) {

            var interval = 1000 / coins;
            for (var c = 0; c <= coins; c++) {
                var coin = this.addCoinIcon();
                createjs.Tween.get(coin).wait(interval/3*(c-1)).to({ x: x, y: y }, 500, createjs.Ease.quadInOut).call((c:createjs.Tween)=> {
                    this.removeChild(<PIXI.DisplayObject>c.target);

                    // Play Sound
                    gameui.AudiosManager.playSound("Correct Answer 2",true);

                    // cast effect
                    this.fx.castEffect(x, y, "Bolinhas", 2);

                });
            }
        }

        private addCoinIcon(): PIXI.DisplayObject {
            var icon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            icon.scale.x = icon.scale.y = 0.9;
            icon.pivot.x = 119/2;
            icon.pivot.y = 93 / 2;
            icon.x = -120 + icon.pivot.x;
            icon.y = +35 + icon.pivot.y;
            icon.name = "icon";
            this.addChild(icon);
            return icon;
        }

        //add objects to View
        private buildView() {

            // add Background
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.pivot.x = 190;
            this.addChild(bg);

            var icon = this.addCoinIcon();

            this.coinsTextField = gameui.AssetsManager.getBitmapText("0", "fontWhite");
            this.coinsTextField.x = 50;
            this.coinsTextField.y = 30;
            this.addChild(this.coinsTextField);

        }
    }
}
