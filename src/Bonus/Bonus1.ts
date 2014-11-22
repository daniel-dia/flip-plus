module FlipPlus.Bonus {

    // Class
    export class BonusBarrel extends BonusScreen {

        private barrels: Array<createjs.DisplayObject>;
        private BarrelsItens: Array<createjs.Container>;
        private contentShadow: Array<createjs.DisplayObject>;

        private items: Array<string>;
        private remaningInteraction: number;

        constructor(itemsArray: Array<string>, sufix: string= "1") {
            super(itemsArray, "Bonus1");
        }

        addObjects() {
            super.addObjects();
            this.addBarrels();

            var bg = this.background.getChildByName("background");
            bg.scaleX = bg.scaleY = 4;
        }

        activate(parameters?: any) {
            super.activate(parameters);
            this.setNewGame();

            this.popup.showtext(stringResources.b1_popup1Ttitle, stringResources.b1_popup1Text)
        }

        //adds barrels to the scene
        private addBarrels(barrelsCount:number=8, cols:number=3) {

            //initialize arrays
            this.barrels = [];
            this.BarrelsItens = [];
            this.contentShadow = [];

            var positions = [
                { x: 120, y: 402 },
                { x: 927, y: 350 },
                { x: 562, y: 646 },
                { x: 195, y: 872 },
                { x: 1056, y: 784 },
                { x: 632, y: 1142 },
                { x: 137, y: 1322 },
                { x: 1047, y: 1347},
            ]

            //creates a container
            var barrelsContainer = new createjs.Container();

            //adds 3 barrels
            for (var b = 0; b < barrelsCount; b++) {

                var barrel = new gameui.ui.Button();
                barrel.addEventListener("click", (event: createjs.MouseEvent) => { this.barrelTap(event) });

                //adds Barrel 
                var spriteBarrel = gameui.AssetsManager.getBitmap("Bonus1/barrel" + b);
                spriteBarrel.rotation = 10;
                spriteBarrel.regY = 300;
                spriteBarrel.y = 270;
                barrel.addChild(spriteBarrel);

                //adds reflection
                var spriteReflection = gameui.AssetsManager.getBitmap("Bonus1/barrelReflect");
                spriteReflection.y = 200;
                spriteReflection.x = -15;
                spriteReflection.skewX = -10;
                spriteReflection.scaleX= 1.02;
                barrel.addChild(spriteReflection);



                var bn = barrel.getBounds();
                barrel.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(bn.x,bn.y,bn.width,bn.height));
                var spriteWater = gameui.AssetsManager.getSprite("Bonus1/agua");
                barrel.addChild(spriteWater);
                spriteWater.gotoAndPlay(Math.random() * 120)
  
                
                barrelsContainer.addChild(barrel);
                barrelsContainer.y = DefaultHeight / 2 - 1024;

                //positionning
                barrel.set(positions[b]);


                barrel.regX = 180;
                barrel.regY = 180;

                barrel.x+= 180;
                barrel.y += 180;

                if(Math.random() > 0.5) barrel.scaleX = -1;

                //animate barrel
                createjs.Tween.get(barrel, { loop: true })
                    .wait(Math.random() * 2000)
                    .to({ x: barrel.x - 30 }, 2000, createjs.Ease.quadInOut)
                    .wait(Math.random() * 2000)
                    .to({ x: barrel.x }, 2000, createjs.Ease.quadInOut)

                setTimeout((a) => {
                        createjs.Tween.get(a, { loop: true })
                        .to({ y: a.y - 15 }, 500, createjs.Ease.quadInOut)
                        .to({ y: a.y }, 500, createjs.Ease.quadInOut)
                    }, Math.random() * 1000, spriteBarrel);
                
                    
                    
                //save obj to local array
                this.barrels.push(barrel);
                
                //instantiate a new container for barrelContent
                var barrelCcontent = new createjs.Container();
                barrelCcontent.x = barrel.x - 50;
                barrelCcontent.y = barrel.y - 150;
                this.BarrelsItens.push(barrelCcontent);
                this.content.addChild(barrelCcontent);


                //instantiate a new shadow for content
                var shadow = new createjs.Shape(new createjs.Graphics().beginFill("rgba(0,0,0,0.3)").drawEllipse(0, 0, 150, 50));
                shadow.x = barrelCcontent.x - 30;
                shadow.y = barrelCcontent.y + 220;
                this.contentShadow.push(shadow);
                this.content.addChild(shadow);
                
            }

            this.content.addChild(barrelsContainer);
        }
                
        //shuffle a new Game
        private setNewGame(itemsCount: number= 6) {

            var barrelsCount: number = 8;

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
            for (var co in this.BarrelsItens)
                this.BarrelsItens[co].removeAllChildren();

            //clean all items
            this.items = this.randomItensInArray(itemsCount, barrelsCount);

            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++) {

                //show the item
                if (this.items[b]) this.BarrelsItens[b].addChild(gameui.AssetsManager.getBitmap("puzzle/icon_" + this.items[b]));

                //or show a can
                else this.BarrelsItens[b].addChild(gameui.AssetsManager.getBitmap("Bonus1/icone_lata"));

                //hidesItem
                this.BarrelsItens[b].visible = false;
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
            var itemArray = this.itemsArray;
            var i = Math.floor(Math.random() * itemArray.length);
            var itemId = itemArray[i];

            return itemId;
        }

        //when player tap a barrel
        private barrelTap(event: createjs.MouseEvent) {
            //identify tapped barrel
            var barrelId = this.barrels.indexOf(<createjs.DisplayObject>event.currentTarget);
            var barrelObj = <gameui.ui.Button>this.barrels[barrelId];

            //remove barrel mouse interactivity 
            barrelObj.mouseEnabled = false;

            //hide barrel
            createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);

            //show item in barrel
            this.BarrelsItens[barrelId].visible = true;

            //verifies item
            if (this.items[barrelId]) {
                this.userAquireItem(this.items[barrelId]);
                this.animateItemObjectToFooter(this.BarrelsItens[barrelId], this.items[barrelId]);
                createjs.Tween.get(this.contentShadow[barrelId]).to({alpha:0},600);
            }
            else {
                this.animateItemObjectIdle(this.BarrelsItens[barrelId]);
            }

            //ends bonus game
            this.remaningInteraction--;
            if (this.remaningInteraction <= 0)
                this.endBonus();
        }

        //finalizes bonus game
        endBonus() {
            //locks barrels interactions
            for (var barrel in this.barrels) 
                this.barrels[barrel].mouseEnabled = false;
 
            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++)
                this.BarrelsItens[b].visible = true;               

            //delay and hide others barrels and show other barrels content
            setTimeout(() => {
                for (var barrel in this.barrels) 
                createjs.Tween.get(this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
            }, 1000);

            setTimeout(() => { super.endBonus(); }, 3500);
        }
    }
}   