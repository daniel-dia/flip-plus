module gameui {


    export class Label extends createjs.Text {

        //public container: createjs.Container;
        constructor(text: string = "", font: string = "600 90px Myriad Pro", color: string = "#82e790") {
            super(text, font, color);
            this.text = this.text.toUpperCase();
        
            //add text into it.
            this.textBaseline = "middle";
            this.textAlign = "center";
            
        }
    }
 }
