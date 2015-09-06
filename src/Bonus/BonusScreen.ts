﻿module FlipPlus.Bonus {

    // Class
    export class BonusScreen extends gameui.ScreenState {

        protected itemsArray: Array<string>;

        protected footerContainer: createjs.Container;

        protected footerTexts: Array<createjs.Text>;
        protected footerMaxs:  Array<createjs.Bitmap>;
        protected partsIndicator: Menu.View.CoinsIndicator;

        protected  menu: Menu.View.ScreenMenu;

        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        private bonusId: string;
        private itemsEarned: number;


        private fx: FlipPlus.Effects;

        constructor(itemsArray: Array<string>,bonusId:string="1"){
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
            //this.view.setChildIndex(this.content, this.view.getNumChildren() - 1);
        }

        //add Scene objects to the view
        protected addScene(bonusId:string) {
            //adds Background
            var background = gameui.AssetsManager.getBitmap(bonusId + "/back");
            background.scaleX = background.scaleY = 2
            background.name="background";
            this.background.addChild(background);
            

            //adds header
            this.header.addChild(gameui.AssetsManager.getBitmap(bonusId + "/header"));


            //adds footer
            var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
            this.footer.addChild(footer);
            footer.y = - 291;

            var titleText = new createjs.Text(StringResources[bonusId + "_title"], defaultFontFamilyNormal, "white");
            titleText.textAlign = "center";
            titleText.text = titleText.text.toUpperCase();
            titleText.x = defaultWidth / 2;
            titleText.y = - 130;
            titleText.textBaseline = "middle";

            this.footer.addChild(titleText);
        }

        //adds objects to the view <<interface>>
        protected addObjects() {}

        //creates a footer
        protected addFooter(itemsArray: Array<string>) {
            
            this.footerContainer = new createjs.Container();
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
                itemObj.regX = itemObj.getBounds().width/2;
                itemObj.regY = itemObj.getBounds().height / 2;
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
                var textObj = new createjs.Text("",defaultFontFamilyNormal,"white");
                textObj.y = 120;
                textObj.x = defaultWidth / itemsArray.length * i + 190;
                textObj.name = itemId + "_text";
                this.footerTexts[itemId] = textObj;
                this.footerContainer.addChild(textObj);
            }

            this.footer.addChild(this.footerContainer);
        }

        //updates all footer labels 
         protected updatePartsAmmount() {
            var qt = FlipPlusGame.coinsData.getAmount();
            this.partsIndicator.updateAmmount(qt);
        }

        //animate a display object to the menu
        protected animateItemObjectToFooter(itemObj: createjs.DisplayObject, itemId: string) {

            if (itemId == "2coin" || itemId == "3coin") itemId = "coin"
            var footerItem = this.partsIndicator.getChildByName("icon");
            if (footerItem && itemObj.parent) {

                var startPoint = itemObj.localToLocal(0, 0, this.content);
                var endPoint = this.partsIndicator.localToLocal(footerItem.x, footerItem.y, itemObj.parent);

                // cast effect
                this.fx.castEffect(startPoint.x + 50, startPoint.y + 50, "Bolinhas", 3);
                    
                // Animate item
                createjs.Tween.get(itemObj).
                    to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                    to({ x: endPoint.x, y: endPoint.y }, 700, createjs.Ease.quadInOut).
                    call(() => {

                        this.updatePartsAmmount();

                        // cast effect
                        var fxPoint = this.partsIndicator.localToLocal(footerItem.x, footerItem.y, this.content);
                        this.fx.castEffect(fxPoint.x, fxPoint.y, "Bolinhas", 2);

                        //play Sound
                        gameui.AudiosManager.playSound("Correct Answer 2");
                    }).to({ alpha: 0 },300);
            }

        }

        //create a loop animation for a item
        protected animateItemObjectIdle(itemObj: createjs.DisplayObject) {
        
            createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y}, 500, createjs.Ease.quadInOut);
        }

        //adds menu to the view
        protected addMenu() {
            this.menu = new Menu.View.ScreenMenu();
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions() });
            this.menu.addEventListener("back", () => { this.back(); });
            this.header.addChild(this.menu);
        }

        //updates user Data with new Item
        protected userAquireItem(itemId: string) {
            var ammount = 1;

            if (itemId == "2coin") ammount = 2;
            if (itemId == "3coin") ammount = 3;

            if (itemId == "2coin" || itemId == "3coin")itemId = "coin"
            FlipPlusGame.coinsData.increaseAmount(ammount);
            //FlipPlusGame.itemsData.increaseItemQuantity(itemId);
        }

        protected selectRandomItems(quantity: number): Array<string> {
            this.itemsArray
            var items = new Array();

            var ia = ["coin"];

            for (var i = 0; i < quantity; i++) 
                items.push(ia[Math.floor(Math.random()*ia.length)]);

            return items;
        }

        //===========================================================

        activate(parameters?: any) {

            super.activate(parameters);

            this.updatePartsAmmount();
        }        
        
        back() {
            FlipPlus.FlipPlusGame.showProjectsMenu();
        }

        //finalizes bonus game
        endBonus() {

            FlipPlusGame.analytics.logBonus(this.bonusId, this.itemsEarned);

            //lock menu interaction
            //this.menu.fadeOut();

            //back to the screen
            this.back();

        }
    }
}  