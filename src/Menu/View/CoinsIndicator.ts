module FlipPlus.Menu.View {

    // View Class
    export class CoinsIndicator extends gameui.Button{

        private contents: PIXI.Container;
        private coinsTextField: PIXI.extras.BitmapText;
        private bg: PIXI.Sprite;
        private icon: PIXI.Sprite;
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
            this.updateItemsPositions();
        }

        public updateItemsPositions() {
            var newScale = (this.coinsTextField.getLocalBounds().width + 220) / 380;

            this.bg.scaleX = Math.max(newScale, 1);

            // centralize in screen
            //this.x = defaultWidth / 2 - this.bg.getLocalBounds().width / 2;

            // centralize contents
            var w = this.contents.getLocalBounds().width;
            this.contents.regX = w / 2;
        }

        public createCoinEffect(x: number, y: number, coins: number, inverse: boolean=false) {
            
            // limit coins to 10
            coins = Math.min(coins, 10);

            var interval = 1000 / coins;
            for (var c = 0; c <= coins; c++) {
                var coin = this.createIcon();

                var dest  = { x: x, y: y };
                var orign = { x: coin.x, y: coin.y }

                // adds random position on the destination if is inverse
                if (inverse) dest = { x: dest.x + Math.random() * 150 - 75, y : dest.y + Math.random()*150 - 75 };
                
                // call for the animation end
                var call =  (c: createjs.Tween) => {
                    this.removeChild(<PIXI.DisplayObject>c.target);

                    // Play Sound
                    gameui.AudiosManager.playSound("Correct Answer 2", true);

                    // cast effect
                    if (inverse) this.fx.castEffect(orign.x, orign.y, "Bolinhas", 2);
                    else this.fx.castEffect(dest.x, dest.y, "Bolinhas", 2);
                    
                }

                if (inverse) createjs.Tween.get(coin).wait(interval / 3 * (c - 1)).to(dest).to(orign, 500, createjs.Ease.quadInOut).call(call);
                else         createjs.Tween.get(coin).wait(interval / 3 * (c - 1)).to(orign).to(dest, 500, createjs.Ease.quadInOut).call(call);
            }
        }

        private createIcon(): PIXI.Sprite {
            var icon = gameui.AssetsManager.getBitmap("puzzle/icon_coin");
            icon.scale.x = icon.scale.y = 0.9;
            icon.pivot.y = 93/2;
            icon.y = 35 + icon.pivot.y;
            icon.name = "icon";
            return icon;
        }
        
        private createText(): PIXI.extras.BitmapText {
            var coinsTextField = gameui.AssetsManager.getBitmapText("0", "fontWhite");
            coinsTextField.x = 130;
            coinsTextField.y = 30;
            return coinsTextField;
        }

        private createBG(): PIXI.Sprite {
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.pivot.x = 380/2;
            return bg;
        }
        //add objects to View
        private buildView() {
                       
            // add Background
            this.bg = this.createBG();
            this.addChild(this.bg);

            // add contents
            this.contents = new PIXI.Container();
            this.addChild(this.contents);
            
            this.icon = this.createIcon();
            this.coinsTextField = this.createText();

            this.contents.addChild(this.icon);
            this.contents.addChild(this.coinsTextField);

        }
    }
}
