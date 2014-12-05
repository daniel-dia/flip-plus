module FlipPlus.Menu.View {

    // View Class
    export class CoinsIndicator extends createjs.Container{

        private coinsTextField: createjs.Text;


        private fx: FlipPlus.Effects;



        // Constructor
        constructor() {
            super();
            this.buildView();

            //Add Effects
            this.fx = new FlipPlus.Effects();
            this.addChild(this.fx);
        }

        //updates Parts indicator amount
        public updateCoinsAmmount(newQuantity: number, tween:boolean=true) {
            this.coinsTextField.text = newQuantity.toString();
        }

        public createCoinEffect(x: number, y: number, coins: number) {

            var interval = 1000 / coins;
            for (var c = 0; c <= coins; c++) {
                var coin = this.addCoinIcon();
                createjs.Tween.get(coin).wait(interval/3*(c-1)).to({ x: x, y: y }, 500, createjs.Ease.quadInOut).call((c:createjs.Tween)=> {
                    this.removeChild(<createjs.DisplayObject>c.target);

                    // Play Sound
                    gameui.AssetsManager.playSound("Correct Answer 2",true);

                    // cast effect
                    this.fx.castEffect(x, y, "Bolinhas", 2);

                });
            }
        }

        private addCoinIcon(): createjs.DisplayObject {
            var icon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            icon.scaleX = icon.scaleY = 0.9;
            icon.x = -120;
            icon.y = +35;
            this.addChild(icon);
            return icon;
        }

        //add objects to View
        private buildView() {

            // add Background
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.regX = 190;
            this.addChild(bg);

            var icon = this.addCoinIcon();
            
            this.coinsTextField = new createjs.Text("0", defaultFontFamilyNormal, defaultFontColor);
            this.coinsTextField.x = 50;
            this.coinsTextField.y = 30;
            this.addChild(this.coinsTextField);

        }
    }
}