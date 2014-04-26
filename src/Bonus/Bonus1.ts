module InvertCross.Bonus {

    // Class
    export class BonusBarrel extends BonusScreen {

        private barrels: Array<createjs.DisplayObject>;
        private content: Array<createjs.Container>;
        private contentShadow: Array<createjs.DisplayObject>;

        private items: Array<string>;
        private remaningInteraction: number;

        addObjects() {

            super.addObjects();
            this.addBarrels();

        }

        activate(parameters?: any) {
            super.activate(parameters);
            this.setNewGame();

            this.popup.showtext("Pick 3 Barrels","Some Barrels has hiddens items")
        }

        //adds barrels to the scene
        private addBarrels(barrelsCount:number=7, cols:number=3) {

            //initialize arrays
            this.barrels = [];
            this.content = [];
            this.contentShadow = [];

            var positions = [
                { x: 606, y: 528 },
                { x: 1122, y: 600 },
                { x: 331, y: 901 },
                { x: 705, y: 1090 },
                { x: 1258, y: 1000 },
                { x: 440, y: 1520 },
                { x: 1156, y: 1532 },
            ]

            //creates a container
            var barrelsContainer = new createjs.Container();

            //adds 3 barrels
            for (var b = 0; b < barrelsCount; b++) {

                //TODO adds animation
                //instantiate a new button with barrel asset
                var barrel = new Gbase.UI.ImageButton("bonus1/barril1", (event:createjs.MouseEvent) => {this.barrelTap(event)});
                barrelsContainer.addChild(barrel);
                barrelsContainer.y = DefaultHeight / 2 - 1024;

                //positionning
                barrel.set(positions[b]);

                //animate barrel
                createjs.Tween.get(barrel, { loop: true })
                    .wait(Math.random() * 2000)
                    .to({ x: barrel.x - 30 }, 2000, createjs.Ease.quadInOut)
                    .wait(Math.random() * 2000)
                    .to({ x: barrel.x }, 2000, createjs.Ease.quadInOut)
                    
                //barrel.y = DefaultHeight / 2 + (Math.floor(b / cols) * 400) - 400;
                //barrel.x = (b%cols + 1) * DefaultWidth / (cols+1);

                //save obj to local array
                this.barrels.push(barrel);
                
                //instantiate a new container for barrelContent
                var content = new createjs.Container();
                content.x = barrel.x - 50;
                content.y = barrel.y - 150;
                this.content.push(content);
                this.view.addChild(content);


                //instantiate a new shadow for content
                var shadow = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.3)").drawEllipse(0, 0, 150, 50));
                shadow.x = content.x - 30;
                shadow.y = content.y + 240;
                this.contentShadow.push(shadow);
                this.view.addChild(shadow);
            }

            this.view.addChild(barrelsContainer);
        }
                
        //shuffle a new Game
        private setNewGame(itemsCount: number= 3) {

            var barrelsCount: number = 7;

            //set barrels clicks
            this.remaningInteraction = 3;

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
            this.items = this.randomItensInArray(itemsCount, barrelsCount);

            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++) {
                //show the item
                if (this.items[b]) this.content[b].addChild(Assets.getImage("puzzle/icon_" + this.items[b]));
                //or show a can
                else this.content[b].addChild(Assets.getImage("bonus1/icone_lata"));
                //hidesItem
                this.content[b].visible = false;
            }
        }

        //radomizes itens into a array
        private randomItensInArray(itemsCount: number= 3, arrayLength: number= 9) : Array<string> {
            var finalList: Array<string> = []

            //randomize itens in barrels
            var indexesLists = [];
            for (var b = 0; b < arrayLength; b++) indexesLists.push(b);

            //for each item
            for (var i = 0; i < itemsCount; i++) {

                //select and remove a barrel from a list, and set a item to it
                var index = Math.floor(Math.random() * indexesLists.length);
                var barrelId = indexesLists[index];
                indexesLists.splice(index,1);

                //set a random item to the selected barrel
                finalList[barrelId] = this.getRandomItem();
            }

            return finalList;
        }

        //get a random item from the items list
        private getRandomItem(): string {
            
            var i = Math.floor(Math.random() * this.itemsArray.length);
            var itemId = this.itemsArray[i];

            return itemId;
        }

        //when player tap a barrel
        private barrelTap(event: createjs.MouseEvent) {
            //identify tapped barrel
            var barrelId = this.barrels.indexOf(<createjs.DisplayObject>event.currentTarget);
            var barrelObj = <Gbase.UI.Button>this.barrels[barrelId];

            //remove barrel mouse interactivity 
            barrelObj.mouseEnabled = false;

            //hide barrel
            createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);

            //show item in barrel
            this.content[barrelId].visible = true;

            //verifies item
            if (this.items[barrelId]) {
                this.userAquireItem(this.items[barrelId]);
                this.animateItemObjectToFooter(this.content[barrelId], this.items[barrelId]);
                createjs.Tween.get(this.contentShadow[barrelId]).to({alpha:0},600);
            }
            else {
                this.animateItemObjectIdle(this.content[barrelId]);
            }

            //ends bonus game
            this.remaningInteraction--;
            if (this.remaningInteraction <= 0)
                this.endBonus();
        }

        //finalizes bonus game
        private endBonus() {

            //lock menu interaction
            this.menu.fadeOut();

            //locks barrels interactions
            for (var barrel in this.barrels) 
                this.barrels[barrel].mouseEnabled = false;
 
            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++)
                this.content[b].visible = true;               

            //delay and hide others barrels and show other barrels content
            setTimeout(() => {
                for (var barrel in this.barrels) 
                createjs.Tween.get(this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
            }, 1000);

            //back to the screen
            setTimeout(() => { this.back(); }, 4500);

        }
    }
}   