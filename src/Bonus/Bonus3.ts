module FlipPlus.Bonus {

    // Class
    export class Bonus3 extends BonusScreen {
   
        //keys object
        private keys: Array<createjs.MovieClip>

        //main clip
        private mainClip: createjs.MovieClip;

        //currentChest
        private currentChestId: number;

        //curret Correct Key
        private correctKeyId: number;

        //itemsContainer
        private itemsContainer: createjs.Container;

        //chances
        private chances:number

        constructor(itemsArray: Array<string>, sufix: string= "1") {
            super(itemsArray, "Bonus3");
            this.itemsContainer = new createjs.Container();
            this.content.addChild(this.itemsContainer);
            this.currentChestId = 0;
            this.chances = 2;
            this.nextChest();
        }
        
        addObjects() {
            super.addObjects();
            var mc = <createjs.MovieClip>(new lib["Bonus3"]);
            this.content.addChild(mc);      
            this.mainClip = mc;
            

            //set stops
            this.mainClip.addEventListener("ready", () => { this.mainClip.stop() });
            this.mainClip.addEventListener("WrongEnd", () => { this.mainClip.stop() });
            this.mainClip.addEventListener("End", () => {
                this.mainClip.stop();

                this.message.showtext(stringResources.b3_finish, 2000, 1000);
                this.message.addEventListener("onclose", () => { this.endBonus(); });
            });
            
            //add keys 
            this.keys = new Array();
            this.keys.push(this.mainClip["key1"]);
            this.keys.push(this.mainClip["key2"]);
            this.keys.push(this.mainClip["key3"]);

            
            this.keys[0].addEventListener("click", () => { this.pickKey(0) })
            this.keys[1].addEventListener("click", () => { this.pickKey(1) })
            this.keys[2].addEventListener("click", () => { this.pickKey(2) })

            this.mainClip["indicator"].stop();
        }

        //========================= Game behaviour =======================


        nextChest() {
            // locks mouse
            this.content.mouseEnabled = false;
            if (this.currentChestId < 3) {

                for (var i in this.keys)
                    createjs.Tween.get(this.keys[i]).to({ alpha: 0 }, 500).call((c: number) => {
                        //restart keys
                        this.keys[c].alpha = 1; this.keys[c].gotoAndPlay("start")
                        //unlocks mouse
                        this.content.mouseEnabled = true;
                    }, [i]);

                //define the correct key for this chest
                this.correctKeyId = Math.floor(Math.random() * 3);
                this.currentChestId++;
            }
        }

        pickKey(keyId: number) {
            this.content.mouseEnabled = false;
            this.keys[keyId].gotoAndPlay("key");
            setTimeout(() => {
                this.content.mouseEnabled = true;    
                //if key is correct
                if (keyId == this.correctKeyId) {

                    //play movie clip
                    this.mainClip.gotoAndPlay("Ok" + (this.currentChestId))

                    //go to next chest
                    this.nextChest();

                    //prvide item to user
                    this.getItems(this.currentChestId);
                }
                else {
                    //play movieclip
                    this.mainClip.gotoAndPlay("Wrong" + (this.currentChestId));

                    //decrease chances
                    this.chances--;

                    //verify if user lost and updates indicator
                    this.updateChances();
                }
            }, 1000);
            
        }

        updateChances() {

            this.mainClip["indicator"].gotoAndStop(2-this.chances)

            //verify if user looses
            if (this.chances < 0) {
                this.content.mouseEnabled = false;
                this.message.showtext(stringResources.b3_noMoreChances, 2000, 1100);
                this.message.addEventListener("onclose", () => { this.endBonus(); });
            }
        }
        

        //-----------------------------------------------

        //give items to the user
        private getItems(chestId: number) {
            this.itemsContainer.removeAllChildren();
            var items = this.selectRandomItems(4);
            var itemsDo = [];

            //create items objects
            for (var i in items) {

                FlipPlusGame.coinsData.increaseAmount(1);

                var item = this.createItem(items[i])
                
                item.set ({x : DefaultWidth / 2, y : DefaultHeight / 2 -100 ,alpha:0})
                createjs.Tween.get(item).wait(500)
                    .to({ alpha: 1, x: DefaultWidth / 2.5 + (300 * (i - 1)), y: DefaultHeight / 2 - 600 }, 500, createjs.Ease.quadInOut)
                    .call((itemDo: createjs.DisplayObject) => { this.animateItemObjectToFooter(itemDo, itemDo.name) }, [item])
                this.itemsContainer.addChild(item);
            }
        }

        createItem(item:string) {
            //adds item Image or empty image
            var itemImage: string = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
            var itemDO = gameui.AssetsManager.getBitmap(itemImage);
            itemDO.name = item;
            //itemDO.x = 368 / 2;
            //itemDO.y = 279 / 2;
            //itemDO.regX = itemDO.getBounds().width / 2;
            //itemDO.regY = itemDO.getBounds().height / 2;
            //itemDO.visible = false;
            itemDO.mouseEnabled = false;
            return itemDO;
        }

        //-----------------------------------------------

    }

}   