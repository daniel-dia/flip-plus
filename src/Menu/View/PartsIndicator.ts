module InvertCross.Menu.View {

    // View Class
    export class StarsIndicator extends Gbase.UI.Button{

        private partsTextField: createjs.Text;
        private starsTextField: createjs.Text;

        private addButton: createjs.DisplayObject;

        // Constructor
        constructor() {
            super();
            this.buildView();
            this.createHitArea();
        }

        //updates Parts indicator amount
        public updatePartsAmount(newQuantity: number, tween:boolean=true) {
            //this.partsTextField.text = newQuantity.toString();  
        }

        //updates Parts indicator amount
        public updateStarsAmount(newQuantity: number, tween: boolean= true) {
            this.starsTextField.text = newQuantity.toString();
        }

        //add objects to View
        private buildView() {

            //add Background
            //var bg = Gbase.AssetsManager.getBitmap("partshud");
            //if (bg.getBounds())
            //this.regX = bg.getBounds().width/2;
            //this.addChild(bg);

            //this.infoCotainer = new createjs.Container();
            
            var si = Gbase.AssetsManager.getBitmap("starsicon");
            si.scaleX = si.scaleY = 0.9;
            this.starsTextField = new createjs.Text("0", defaultFontFamilyNormal, grayColor);
            this.starsTextField.textAlign = "right";
            this.starsTextField.x = -140;

            this.addChild(si); 
            this.addChild(this.starsTextField);
     
            si.x = -120;
            si.y = -5;
            
                        
            

        }
    }
}
