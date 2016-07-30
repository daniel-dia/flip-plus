module FlipPlus.Bonus {

    // Class
    export class BonusBarrel extends BonusScreen {

        private barrels: Array<PIXI.DisplayObject>;
        private barrelsItens: Array<PIXI.Container>;
        private contentShadow: Array<PIXI.DisplayObject>;

        private items: Array<string>;
        private remaningInteraction: number;
        private positions:Array<any>

        constructor(itemsArray: Array<string>, sufix: string = "1") {
            this.positions = [{ x: 120, y: 402 }, { x: 927, y: 350 }, { x: 562, y: 646 }, { x: 195, y: 872 }, { x: 1056, y: 784 }, { x: 632, y: 1142 }, { x: 137, y: 1322 }, { x: 1047, y: 1347 }];
            super(itemsArray, "Bonus1");
        }

        addObjects() {
            super.addObjects();
            this.addBarrels();

            var bg = this.background.getChildByName("background");
            bg.scale.x = bg.scale.y = 4;
        }

        activate(parameters?: any) {
            super.activate(parameters);
            this.setNewGame();

            this.popup.showtext(StringResources.b1_popup1Ttitle, StringResources.b1_popup1Text)
        }

        // adds barrels to the scene
        private addBarrels(barrelsCount:number=8, cols:number=3) {

            //initialize arrays
            this.barrels = [];
            this.barrelsItens = [];
            this.contentShadow = [];
            
            //adds barrels
            for (var b = 0; b < barrelsCount; b++) {
                var barrel = this.createBarrel(b, this.positions[b]);
                
                // save obj to local array
                this.barrels.push(barrel);

                // instantiate a new container for barrel content
                var itemContainer = new PIXI.Container();
                itemContainer.x = this.positions[b].x + 150;
                itemContainer.y = this.positions[b].y + 100;
                this.barrelsItens.push(itemContainer);
          
                // instantiate a new shadow for content
                var shadow = new PIXI.Graphics().beginFill(0x000).drawEllipse(0, 0, 100, 30);
                shadow.alpha = 0.2;
                shadow.x = this.positions[b].x + 150;
                shadow.y = this.positions[b].y + 230;
                this.contentShadow.push(shadow);
                
                // adds to scene
                this.content.addChild(shadow);
                this.content.addChild(itemContainer);  
                this.content.addChild(barrel);
            }
        }

        // create a new barrel object                
        private createBarrel(id,position): gameui.Button {

            var barrel = new gameui.Button((event: any) => { this.barrelTap(event) });
            
            //adds Barrel 
            var spriteBarrel = gameui.AssetsManager.getBitmap("Bonus1/barrel" + id);
            spriteBarrel.rotation = 10 / Math.PI / 180;
            spriteBarrel.pivot.y = 300;
            spriteBarrel.y = 270;
            barrel.addChild(spriteBarrel);

            //adds reflection
            var spriteReflection = gameui.AssetsManager.getBitmap("Bonus1/barrelReflect");
            spriteReflection.y = 200;
            spriteReflection.scale.x = 1.02;
            barrel.addChild(spriteReflection);

            var bn = barrel.getBounds();
            var spriteWater = gameui.AssetsManager.getMovieClip("agua");
            barrel.addChild(spriteWater);
            spriteWater.x =-60;
            spriteWater.y =225;
            spriteWater.gotoAndPlay(Math.random() * 120)


            //positionning
            barrel.pivot.x = 180;
            barrel.pivot.y = 180;
            barrel.x = position.x + 180;
            barrel.y = position.y +180;
            
            //animate barrel
            createjs.Tween.get(barrel, { loop: true })
                .to({ x: position.x + 180  })
                .wait(Math.random() * 2000)
                .to({ x: position.x + 180 - 30 }, 2000, createjs.Ease.quadInOut)
                .wait(Math.random() * 2000)
                .to({ x: position.x + 180 }, 2000, createjs.Ease.quadInOut);

            // mirror some of them
            if (Math.random() > 0.5) barrel.scale.x = -1;

            return barrel;
                
        }

        // shuffle a new Game
        private setNewGame(itemsCount: number= 6) {

            var barrelsCount: number = 8;

            //set barrels clicks
            this.remaningInteraction = 3;

            //avoid errors
            if (itemsCount > barrelsCount) itemsCount = barrelsCount;

            //show all barrels
            for (var ba in this.barrels) {
                this.barrels[ba].visible = true;
                this.barrels[ba].interactive = true;
            }

            //show all contents
            for (var co in this.barrelsItens)
                this.barrelsItens[co].removeChildren();

            //clean all items
            this.items = this.randomItensInArray(itemsCount, barrelsCount);

            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++) {

                //show the item
                if (this.items[b]) {
                    var itemDO = gameui.AssetsManager.getBitmap("puzzle/icon_" + this.items[b]);
                    itemDO.name = "item";
                    itemDO.pivot.x = itemDO.width / 2;
                    itemDO.pivot.y = itemDO.height / 2;
                    itemDO.y += 30;
                    this.barrelsItens[b].addChild(itemDO);
                }
                //or show a can
                else {
                    var itemDO = gameui.AssetsManager.getBitmap("Bonus1/icone_lata");
                    itemDO.pivot.x = itemDO.width / 2;
                    itemDO.pivot.y = itemDO.height / 2;
                    this.barrelsItens[b].addChild(itemDO);
                }
                //hidesItem
                this.barrelsItens[b].visible = false;
            }
        }

        // radomizes itens into a array
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

        // get a random item from the items list
        private getRandomItem(): string {
            var itemArray = ["coin", "coin", "2coin", "3coin"];
            var i = Math.floor(Math.random() * itemArray.length);
            var itemId = itemArray[i];

            return itemId;
        }

        // when player tap a barrel
        private barrelTap(event) {
            //identify tapped barrel
            var barrelId = this.barrels.indexOf(<PIXI.DisplayObject>event.target);
            var barrelObj = <gameui.Button>this.barrels[barrelId];

            //remove barrel mouse interactivity 
            barrelObj.interactive = false;

            //hide barrel
            createjs.Tween.get(barrelObj).to({ alpha: 0 }, 300);

            //show item in barrel
            this.barrelsItens[barrelId].visible = true;

            //verifies item
            if (this.items[barrelId]) {

                // play sound
                gameui.AudiosManager.playSound("Correct Answer");
                this.userAquireItem(this.items[barrelId]);
                this.animateItemToHeader(this.barrelsItens[barrelId].getChildByName("item"));
                createjs.Tween.get(this.contentShadow[barrelId]).to({alpha:0},600);
            }
            else {
                this.animateItemObjectIdle(this.barrelsItens[barrelId]);

                // play sound
                gameui.AudiosManager.playSound("wrong");
            }

            //ends bonus game
            this.remaningInteraction--;
            if (this.remaningInteraction <= 0) {
                this.endBonus();
                 
            }
        }

        // finalizes bonus game
        endBonus() {
            //locks barrels interactions
            for (var barrel in this.barrels)
                this.barrels[barrel].interactive = false;
 
            //adds objects in barrel
            for (var b = 0; b < this.barrels.length; b++)
                this.barrelsItens[b].visible = true;               

            //delay and hide others barrels and show other barrels content
            setTimeout(() => {
                for (var barrel = 0; barrel < this.barrels.length; barrel ++) 
                createjs.Tween.get(this.barrels[barrel]).wait(barrel * 100).to({ alpha: 0 }, 150);
            }, 1000);

            setTimeout(() => { super.endBonus(); }, 3500);
        }
    }
}   