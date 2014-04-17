module Gbase.UI {


    export class Label extends UIItem {

        private background: createjs.Bitmap;
        public textField: createjs.Text;
        //public container: createjs.Container;
        constructor(text: string = "", font: string = "600 90px Myriad Pro", color: string = "#82e790") {
            super();
            text = text.toUpperCase();
        
            //add text into it.
            this.textField = new createjs.Text(text, defaultFontFamilyNormal, color);
            this.textField.textBaseline = "middle";
            this.textField.textAlign = "center";
            this.addChild(this.textField);
            
        }
    }
 }
