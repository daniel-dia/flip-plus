
/// <reference path="../../../lib/easeljs.d.ts" />
/// <reference path="../../assets.ts" />

module InvertCross.Menu.View {

    export class ScreenMenu extends Gbase.UI.UIItem{

        public partsIndicator:PartsIndicator;

        constructor(backVisible: boolean= true, starsVisible: boolean= false) {
            super();
            this.createObjects(backVisible, starsVisible);
        }

        private createObjects(backVisible: boolean= true, starsVisible: boolean= false) {

            //adds menu button
            var menuBt: Gbase.UI.ImageButton = new Gbase.UI.ImageButton("MenuBt", () => { this.dispatchEvent("menu", menuBt) });
            menuBt.y = 90;
            menuBt.x = DefaultWidth - 130;
            this.addChild(menuBt);

            //add a bacl buttton
            var backBt: Gbase.UI.ImageButton = new Gbase.UI.ImageButton("BackBt", () => { this.dispatchEvent("back", menuBt) });
            backBt.y = 90;
            backBt.x = 130;
            backBt.visible = backVisible;
            this.addChild(backBt);

            
            //add a parts Indicator
            var partsIndicator: PartsIndicator = new PartsIndicator();
            partsIndicator.y = 0;
            partsIndicator.x = DefaultWidth / 2;
            partsIndicator.addEventListener("click", () => { this.dispatchEvent("parts"), partsIndicator });
            this.addChild(partsIndicator);
            this.partsIndicator = partsIndicator;
            partsIndicator.visible = starsVisible
        }

        //TODO uma forma melhor que isso

   }
}
 