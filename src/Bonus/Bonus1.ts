module InvertCross.Bonus {

    // Class
    export class Bonus1 extends BonusScreen {

        private barrels: Array<createjs.DisplayObject>;
        private content: Array<createjs.Container>;
        private items: Array<string>;

        addObjects() {

            super.addObjects();
            this.addBarrels();

        }

        activate(parameters?: any) {
            super.activate(parameters);
            this.setNewGame();
        }

        //adds barrels to the scene
        private addBarrels(barrelsCount:number=3) {

            this.barrels = [];
            this.content = [];

            //creates a container
            var barrelsContainer = new createjs.Container();

            //adds 3 barrels
            for (var b = 0; b < barrelsCount; b++) {

                //instantiate a new button with barrel asset
                var barrel = new Gbase.UI.ImageButton("bonus1/barril1", (event:createjs.MouseEvent) => {this.barrelTap(event)});
                barrelsContainer.addChild(barrel);

                //positionning
                barrel.y = DefaultHeight/2;
                barrel.x = (b + 1) * DefaultWidth / (barrelsCount+1);

                //save obj to local array
                this.barrels.push(barrel);


                //instantiate a new container for barrelContent
                var content = new createjs.Container();
                content.x = barrel.x - 100;
                content.y = barrel.y - 100;
                this.content.push(content);
                this.view.addChild(content);

                
            }

            this.view.addChild(barrelsContainer);
        }

        //shuffle a new Game
        private setNewGame(itemsCount: number= 1,barrelsCount:number=3) {

            //avoid errors
            if (itemsCount > barrelsCount) itemsCount = barrelsCount;

            //show all barrels
            for (var ba in this.barrels) {
                this.barrels[ba].visible = true;
                this.barrels[ba].mouseEnabled= true;
            }

            //show all contents
            for (var co in this.content)
                this.content[co].removeAllChildren();

            //clean all items
            this.items = [];

            //randomize itens in barrels
            var list = [];
            for (var b = 0; b < barrelsCount; b++) list.push(b);

            //for each item
            for (var i = 0; i < itemsCount; i++) {
                //select and remove a barrel from a list, and set a item to it
                var index = Math.floor(Math.random() * list.length);
                var barrel = list[index];
                list.splice(index);
                //set a random item to the selected barrel
                this.items[barrel] = this.getRandomItem();
            }
        }

        //when player tap a barrel
        private barrelTap(event: createjs.MouseEvent) {
            //identify tapped barrel
            var barrelId = this.barrels.indexOf(<createjs.DisplayObject>event.currentTarget);
            var barrelObj = <Gbase.UI.Button>this.barrels[barrelId];

            //show objects in barrel
            for (var b = 0; b < this.barrels.length; b++)
                //show the item
                if (this.items[b]) this.content[b].addChild(Assets.getImage("puzzle/icon_" + this.items[b]));
                //or show a can
                else this.content[b].addChild(Assets.getImage("bonus1/icone_lata"));


            //trava interação com outros barris
            for (var ba in this.barrels)
                this.barrels[ba].mouseEnabled = false;

            //hide barrel
            createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);

            //delay and hida others barrels and show other barrels content
            for (var ba in this.barrels)
                if (ba != barrelId)
                    createjs.Tween.get(this.barrels[ba]).wait(1000  + ba * 300).to({ alpha: 0 }, 300);

            //verifies item
            if (this.items[barrelId]) 
                this.addItem(this.items[barrelId]);
        }
    }
}   