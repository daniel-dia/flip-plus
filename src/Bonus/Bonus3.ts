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
        private itemsContainer: PIXI.Container;

        //chances
        private chances:number

        constructor(itemsArray: Array<string>, sufix: string= "1") {
            super(itemsArray, "Bonus3");
            this.itemsContainer = new PIXI.Container();
            this.content.addChild(this.itemsContainer);
            this.currentChestId = 0;
            this.chances = 2;
            this.updateChances();
            this.nextChest();

        }
        
        addObjects() {
            super.addObjects();
            var mc = <createjs.MovieClip>(new lib["Bonus3"]);
            var temp: any = mc;
            this.content.addChild(<PIXI.DisplayObject>temp);      
            this.mainClip = mc;
            

            //set stops
            this.mainClip.addEventListener("ready", ()    => { this.mainClip.stop() });
            this.mainClip.addEventListener("WrongEnd", () => { this.mainClip.stop() });
            this.mainClip.addEventListener("End", () => {
                
                this.mainClip.stop();
                this.message.showtext(StringResources.b3_finish, 2000, 1000);
                this.message.addEventListener("onclose", () => { this.endBonus(); });
            });
            
            //add keys 
            this.keys = new Array();
            this.keys.push(this.mainClip["key1"]);
            this.keys.push(this.mainClip["key2"]);
            this.keys.push(this.mainClip["key3"]);

            // set keys interactives
            this.keys[0]["interactive"] = true;
            this.keys[1]["interactive"] = true;
            this.keys[2]["interactive"] = true;
            
            this.keys[0].addEventListener("click", () => { this.pickKey(0) }) ;
            this.keys[1].addEventListener("click", () => { this.pickKey(1) }) ;
            this.keys[2].addEventListener("click", () => { this.pickKey(2) }) ;
                                                                              
            this.keys[0].addEventListener("tap", () => { this.pickKey(0) }) ;
            this.keys[1].addEventListener("tap", () => { this.pickKey(1) }) ;
            this.keys[2].addEventListener("tap", () => { this.pickKey(2) }) ;

            
            setTimeout(() => {
                this.mainClip["indicator"].gotoAndStop(0);
                this.mainClip["indicator"].paused = true;
            }, 100);
        }

        //========================= Game behaviour =======================


        nextChest() {
            // locks mouse
            this.content.interactiveChildren = false;
            if (this.currentChestId < 3) {

                for (var i in this.keys)
                    createjs.Tween.get(this.keys[i]).to({ alpha: 0 }, 500).call((c: number) => {
                        //restart keys
                        this.keys[c].alpha = 1; this.keys[c].gotoAndPlay("start")
                        //unlocks mouse
                        this.content.interactiveChildren = true;
                    }, [i]);

                //define the correct key for this chest
                this.correctKeyId = Math.floor(Math.random() * 3);
                this.currentChestId++;
            }
        }

        pickKey(keyId: number) {
            this.content.interactiveChildren = false;
            this.keys[keyId].gotoAndPlay("key");
            // play sound
            gameui.AudiosManager.playSound("button");

            setTimeout(() => {
                this.content.interactiveChildren  = true;    
                //if key is correct
                if (keyId == this.correctKeyId) {

                    //play movie clip
                    this.mainClip.gotoAndPlay("Ok" + (this.currentChestId))

                    //prvide item to user
                    this.getItems(this.currentChestId);

                    //go to next chest
                    this.nextChest();
                    
                    // play sound
                    gameui.AudiosManager.playSound("Correct Answer",true,300);
                }
                else {

                    // play sound
                    gameui.AudiosManager.playSound("wrong", true, 300);

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

            this.mainClip["indicator"].gotoAndStop(2 - this.chances)
            
            
            //verify if user looses
            if (this.chances < 0) {
                this.content.interactiveChildren = false;
                this.message.showtext(StringResources.b3_noMoreChances, 2000, 1100);
                this.message.addEventListener("onclose", () => { this.endBonus(); });

                // play sound
                gameui.AudiosManager.playSound("Wrong Answer");

            }
        }
        

        //-----------------------------------------------

        //give items to the user
        private getItems(chestId: number) {
            this.itemsContainer.removeChildren();
            
            //barris mais elevados tem mais items
            var numItems = 2;
            if (chestId == 2) numItems = 5;
            if (chestId == 3) numItems = 10;

            var items = this.selectRandomItems(numItems);
            var itemsDo = [];

            //create items objects
            for (var i = 0; i < items.length; i++) {

                FlipPlusGame.coinsData.increaseAmount(1);

                var itemObj = this.createItem(items[i])
                
                itemObj.set({ x: defaultWidth / 2, y: defaultHeight / 2 - 100, alpha: 0 })
                itemObj.pivot.x = itemObj.getLocalBounds().width / 2;
                itemObj.pivot.y = itemObj.getLocalBounds().height / 2;
                createjs.Tween.get(itemObj).wait(500 + i * 300)
                    .to({ alpha: 1, x: defaultWidth *0.15 + i * (defaultWidth * 0.7 / items.length), y: defaultHeight / 2 - 600 }, 500, createjs.Ease.quadInOut)
                    .call((itemDo: PIXI.DisplayObject) => { this.animateItemToHeader(itemDo, itemDo.name) }, [itemObj])
                this.itemsContainer.addChild(itemObj);
            }
        }

        createItem(item:string) {
            //adds item Image or empty image
            var itemImage: string = item ? "puzzle/icon_" + item : "Bonus2/bonusrat";
            var itemDO = gameui.AssetsManager.getBitmap(itemImage);
            itemDO.name = item;
            //itemDO.x = 368 / 2;
            //itemDO.y = 279 / 2;
            //itemDO.pivot.x = itemDO.getLocalBounds().width / 2;
            //itemDO.pivot.y = itemDO.getLocalBounds().height / 2;
            //itemDO.visible = false;
            itemDO.mouseEnabled = false;
            return itemDO;
        }

        //-----------------------------------------------

    }

}   