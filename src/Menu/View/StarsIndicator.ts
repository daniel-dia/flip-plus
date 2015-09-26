module FlipPlus.Menu.View {

    // View Class
    export class StarsIndicator extends gameui.Button{

        private starsTextField: createjs.BitmapText;

        private addButton: createjs.DisplayObject;

        // Constructor
        constructor() {
            super();
            this.buildView();
            this.createHitArea();
        }
        
        //updates Parts indicator amount
        public updateStarsAmount(newQuantity: number, tween: boolean= true) {
            this.starsTextField.text = newQuantity.toString();
            this.starsTextField.regX
        }

        //add objects to View
        private buildView() {
            
            var si = gameui.AssetsManager.getBitmap("starsicon");
            si.scaleX = si.scaleY = 0.9;
            this.starsTextField = gameui.AssetsManager.getBitmapText("0", "fontBlue");
            this.starsTextField.regX = this.starsTextField.getBounds().width;
            this.starsTextField.x = -140;

            this.addChild(si); 
            this.addChild(this.starsTextField);
     
            si.x = -120;
            si.y = -5;
        }
    }
}
