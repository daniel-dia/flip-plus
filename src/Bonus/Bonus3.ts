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

            this.addKeys();

        }

        addKeys() {
            for (var k = 0; k < 3; k++) {
                var kobj = new Gbase.UI.ImageButton("Bonus3/key_" + (k + 1));
                this.keys[k] = kobj;
                kobj.x = 334 + k * 480;
                kobj.y = 1470 + (k==1 ?80:0);
                this.content.addChild(kobj);
            }
        }

        addCrates() { }

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