module FlipPlus.Bonus {

    // Class
    export class BonusScreen extends gameui.ScreenState {

        protected itemsArray: Array<string>;

        protected footerContainer: PIXI.Container;

        protected footerTexts: Array<PIXI.Text>;
        protected footerMaxs: Array<PIXI.Sprite>;
        protected partsIndicator: Menu.View.CoinsIndicator;

        protected menu: Menu.View.ScreenMenu;

        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        private bonusId: string;
        private itemsEarned: number;


        private fx: FlipPlus.Effects;

        constructor(itemsArray: Array<string>, bonusId: string = "1") {
            super();

            this.itemsArray = itemsArray;

            this.bonusId = bonusId;
            this.itemsEarned = 0;

            //adds scenary
            this.addScene(bonusId);

            //adds footer and itens
            //this.addFooter(itemsArray);

            // add parts indicator
            this.partsIndicator = new Menu.View.CoinsIndicator();
            this.header.addChild(this.partsIndicator);
            this.partsIndicator.x = defaultWidth / 2;
            
            //adds bonus objc
            this.addObjects();
 
            //adds message
            this.message = new Menu.View.Message();
            this.content.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.content.addChild(this.popup)

            //Add Effects
            this.fx = new FlipPlus.Effects();
            this.content.addChild(this.fx);

            // reorder content
            this.view.addChild(this.content);
            //bring content to front
            //this.view.setChildIndex(this.content, this.view.children.length - 1); 
        }

        // add Scene objects to the view
        protected addScene(bonusId: string) {
            //adds Background
            var background = gameui.AssetsManager.getBitmap(bonusId + "/back");
            background.scale.x = background.scale.y = 2
            background.name = "background";
            this.background.addChild(background);
            
          

            //adds header
            this.header.addChild(gameui.AssetsManager.getBitmap(bonusId + "/header"));


            //adds footer
            var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
            this.footer.addChild(footer);
            footer.y = - 291;

            var titleText = gameui.AssetsManager.getBitmapText(StringResources[bonusId + "_title"].toUpperCase(), "fontWhite");
            titleText.pivot.x = titleText.textWidth / 2;
            titleText.x = defaultWidth / 2;
            titleText.y = - 170;
            //titleText.textBaseline = "middle";

            this.footer.addChild(titleText);


        }

        // adds objects to the view <<interface>>
        protected addObjects() { }

        // creates a footer
        protected addFooter(itemsArray: Array<string>) {

            this.footerContainer = new PIXI.Container();
            this.footerContainer.y = - 291;
            this.footerTexts = [];
            this.footerMaxs = [];
                    
            //adds Items to the footer
            for (var i = 0; i < itemsArray.length; i++) {

                var itemId = itemsArray[i];
                
                //add icon
                var itemObj = gameui.AssetsManager.getBitmap("puzzle/icon_" + itemId);
                itemObj.y = 180;
                itemObj.x = defaultWidth / itemsArray.length * i + 80;
                itemObj.name = itemId;
                itemObj.pivot.x = itemObj.getBounds().width / 2;
                itemObj.pivot.y = itemObj.getBounds().height / 2;
                this.footerContainer.addChild(itemObj);

                //add "max" text
                var max = gameui.AssetsManager.getBitmap("max");
                max.y = 50;
                max.x = defaultWidth / itemsArray.length * i + 100;
                max.name = itemId + "_max";
                this.footerMaxs[itemId] = max;
                max.visible = false;
                this.footerContainer.addChild(max);

                //add text
                var textObj = gameui.AssetsManager.getBitmapText("", "fontWhite");
                textObj.y = 120;
                textObj.x = defaultWidth / itemsArray.length * i + 190;
                textObj.name = itemId + "_text";
                this.footerTexts[itemId] = textObj;
                this.footerContainer.addChild(textObj);
            }

            this.footer.addChild(this.footerContainer);
        }

        // updates all footer labels 
        protected updatePartsAmmount() {
            var qt = FlipPlusGame.coinsData.getAmount();
            this.partsIndicator.updateAmmount(qt);
        }

        // animate a display object to the menu
        protected animateItemToHeader(itemObj: PIXI.DisplayObject, itemId: string = "coin") {

            if (itemId == "2coin" || itemId == "3coin") itemId = "coin"
            var footerItem = this.partsIndicator.getChildByName("icon");
            if (footerItem && itemObj.parent) {

                var startPoint = itemObj.position;
                var endPoint = itemObj.parent.toLocal(footerItem.parent.toGlobal(footerItem.position))

                var startGlobal = this.content.toLocal(itemObj.pivot, itemObj);
                var endGlobal = this.content.toLocal(footerItem.pivot, footerItem);
                                
                // cast effect
                this.fx.castEffect(startGlobal.x, startGlobal.y - 50, "Bolinhas", 3);
            
                
                // Animate item
                createjs.Tween.get(itemObj).
                    to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                    to({ x: endPoint.x, y: endPoint.y }, 700, createjs.Ease.quadInOut).
                    call(() => {

                        this.updatePartsAmmount();

                        // cast effect
                        this.fx.castEffect(endGlobal.x, endGlobal.y, "Bolinhas", 3);

                        //play Sound
                        gameui.AudiosManager.playSound("Correct Answer 2");
                    }).to({ alpha: 0 }, 300);
            }

        }

        // create a loop animation for a item
        protected animateItemObjectIdle(itemObj: PIXI.DisplayObject) {

            createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y }, 500, createjs.Ease.quadInOut);
        }

        // adds menu to the view
        protected addMenu() {
            this.menu = new Menu.View.ScreenMenu();
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions() });
            this.menu.addEventListener("back", () => { this.back(); });
            this.header.addChild(this.menu);
        }

        // updates user Data with new Item
        protected userAquireItem(itemId: string) {
            var ammount = 1;

            if (itemId == "2coin") ammount = 2;
            if (itemId == "3coin") ammount = 3;

            if (itemId == "2coin" || itemId == "3coin") itemId = "coin"
            FlipPlusGame.coinsData.increaseAmount(ammount);
            //FlipPlusGame.itemsData.increaseItemQuantity(itemId);
        }

        // select random items in a array
        protected selectRandomItems(quantity: number): Array<string> {
            this.itemsArray
            var items = new Array();

            var ia = ["coin"];

            for (var i = 0; i < quantity; i++)
                items.push(ia[Math.floor(Math.random() * ia.length)]);

            return items;
        }

        //===========================================================

        activate(parameters?: any) {

            super.activate(parameters);

            this.updatePartsAmmount();

            // play music
            gameui.AudiosManager.playMusic("bonusbg");

        }

        back() {
            FlipPlus.FlipPlusGame.showMainScreen();
        }

        //finalizes bonus game
        endBonus() {

            FlipPlusGame.analytics.logBonusParts(this.bonusId, this.itemsEarned);
            
            // back to main screen
            this.back();

            // show ads and 
            CocoonAds.show();

        }
    }
}  