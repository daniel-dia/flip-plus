module FlipPlus.Menu.View {

    // View Class
    export class StarsIndicator extends gameui.Button{

        private starsTextField: PIXI.extras.BitmapText;

        private addButton: PIXI.DisplayObject;

        // Constructor
        constructor() {
            super();
            this.buildView();
            this.createHitArea();
        }
        
        //updates Parts indicator amount
        public updateStarsAmount(newQuantity: number, tween: boolean= true) {
            this.starsTextField.text = newQuantity.toString();
            this.starsTextField.pivot.x
        }

        //add objects to View
        private buildView() {
            
            var si = gameui.AssetsManager.getBitmap("starsicon");
            si.scale.x = si.scale.y = 0.9;
            this.starsTextField = gameui.AssetsManager.getBitmapText("0", "fontBlue");
            this.starsTextField.pivot.x = this.starsTextField.getLocalBounds().width;
            this.starsTextField.x = -140;

            this.addChild(si); 
            this.addChild(this.starsTextField);
     
            si.x = -120;
            si.y = -5;
        }
    }
}
