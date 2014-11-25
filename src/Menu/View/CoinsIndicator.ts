module FlipPlus.Menu.View {

    // View Class
    export class CoinsIndicator extends createjs.Container{

        private coinsTextField: createjs.Text;

        // Constructor
        constructor() {
            super();
            this.buildView();
        }

        //updates Parts indicator amount
        public updateCoinsAmmount(newQuantity: number, tween:boolean=true) {
            this.coinsTextField.text = newQuantity.toString();
        }

        //add objects to View
        private buildView() {

            // add Background
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.regX = 190;
            this.addChild(bg);

            var icon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            icon.scaleX = icon.scaleY = 0.9;
            icon.x = -120;
            icon.y = +35;
            this.addChild(icon); 
            
            this.coinsTextField = new createjs.Text("0", defaultFontFamilyNormal, defaultFontColor);
            this.coinsTextField.x = 50;
            this.coinsTextField.y = 30;
            this.addChild(this.coinsTextField);

        }
    }
}
