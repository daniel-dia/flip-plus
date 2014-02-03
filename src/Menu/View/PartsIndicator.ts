/// <reference path="../../../lib/easeljs.d.ts" />

/// <reference path="../../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../../Gbase/UI/Button.ts" />

/// <reference path="../../Assets.ts" /> 
 
// Module


module InvertCross.Menu.View {

    // View Class
    export class PartsIndicator extends Gbase.UI.Button{

        private partsTextField: createjs.Text;
        private starsTextField: createjs.Text;

        private addButton: createjs.DisplayObject;
        private infoCotainer: createjs.Container;

        // Constructor
        constructor() {
            super();
            this.buildView();
            this.x = DefaultWidth / 2;
            this.createHitArea();
        }

        //updates Parts indicator amount
        public updatePartsAmount(newQuantity: number, tween:boolean=true) {
            this.partsTextField.text = newQuantity.toString();  
        }

        //updates Parts indicator amount
        public updateStarsAmount(newQuantity: number, tween: boolean= true) {
            this.starsTextField.text = newQuantity.toString();
        }

        //add objects to View
        private buildView() {

            //add Background
            var bg: createjs.Bitmap = Assets.getImage("partshud");
            bg.scaleX = 2;
            this.regX = bg.getBounds().width;
            this.addChild(bg);

            this.infoCotainer = new createjs.Container();

            var pi = Assets.getImage("partsicon");
            var si = Assets.getImage("starsicon");
            this.partsTextField = new createjs.Text("0",defaultFontFamilyNormal,defaultFontColor);
            this.starsTextField = new createjs.Text("0", defaultFontFamilyNormal, defaultFontColor);

            this.infoCotainer.addChild(pi);
            this.infoCotainer.addChild(si); 
            this.infoCotainer.addChild(this.partsTextField);
            this.infoCotainer.addChild(this.starsTextField);
     
            pi.y = 20;
            si.y = 20;
            this.partsTextField.y = 20;
            this.starsTextField.y = 20;
            
            si.x = 000;
            this.starsTextField.x = 150;
            pi.x = 320;
            this.partsTextField.x = 470;
                        
            this.addChild(this.infoCotainer);
            this.infoCotainer.x = 70;

        }
    }
}
