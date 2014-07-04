module InvertCross.Bonus {

    // Class
    export class Bonus3 extends BonusScreen {

        //current crate to be oppened
        private currentCrate: number;
        
        //keys object
        private keys: Array<createjs.DisplayObject>

        constructor(itemsArray: Array<string>, sufix: string= "1") {

            this.keys = new Array();
            this.currentCrate = 0;
            super(itemsArray, "Bonus3");

        }


        addObjects() {

            super.addObjects();

            var mc = new lib["Bonus3"];
            this.content.addChild(mc);          


        }

  
        //=========================

        pickKey(keyId: number) {
        }

    }

    class Crate extends createjs.Container {

        constructor(crateId: number) {
            super();



        }

        openCrate() {}

    }

}   