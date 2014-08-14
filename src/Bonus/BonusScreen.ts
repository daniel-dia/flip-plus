module FlipPlus.Bonus {

    // Class
    export class BonusScreen extends gameui.ScreenState {

        itemsArray: Array<string>;

        footerContainer: createjs.Container;

        footerTexts: Array<createjs.Text>;
        footerMaxs:  Array<createjs.Bitmap>;

        menu: Menu.View.ScreenMenu;

        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        private bonusId: string;
        private itemsEarned: number;

        constructor(itemsArray: Array<string>,bonusId:string="1"){
            super();

            this.itemsArray = itemsArray;

            this.bonusId = bonusId;
            this.itemsEarned = 0;

            //adds scenary
            this.addScene(bonusId);

            //adds footer and itens
            this.addFooter(itemsArray);

            //adds bonus objc
            this.addObjects();

            //adds menu
            // this.addMenu();

            //adds message
            this.message = new Menu.View.Message();
            this.content.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.content.addChild(this.popup)

            //bring content to front
            //this.view.setChildIndex(this.content, this.view.getNumChildren() - 1);
        }

        //add Scene objects to the view
        addScene(bonusId:string) {
            //adds Background
            var background = gameui.AssetsManager.getBitmap(bonusId + "/back");
            background.scaleX = background.scaleY = 2
            background.name="background";
            this.background.addChild(background);
            

            //adds header
            this.header.addChild(gameui.AssetsManager.getBitmap(bonusId + "/header"));
            var titleText = new createjs.Text(stringResources[bonusId+"_title"], defaultFontFamilyNormal, "white");
            titleText.textAlign = "center";
            titleText.text = titleText.text.toUpperCase();
            titleText.x = DefaultWidth / 2;
            titleText.y = 100;
            titleText.textBaseline = "middle";

            this.header.addChild(titleText);

            //adds footer
            var footer = gameui.AssetsManager.getBitmap(bonusId + "/footer");
            this.footer.addChild(footer);
            footer.y = - 291;

        }

        //adds objects to the view <<interface>>
        addObjects() {}

        //create sa footer
        addFooter(itemsArray: Array<string>) {
            
            this.footerContainer = new createjs.Container();
            this.footerContainer.y = - 291;
            this.footerTexts = [];
            this.footerMaxs = [];
                    
            //adds Items to the footer
            for (var i = 0; i < itemsArray.length; i++) {

                var itemId = itemsArray[i];
                
                //add icon
                var itemObj = gameui.AssetsManager.getBitmap("puzzle/icon_" + itemId);
                itemObj.y = 100;
                itemObj.x = DefaultWidth / itemsArray.length * i + 40;
                itemObj.name = itemId;
                this.footerContainer.addChild(itemObj);

                //add "max" text
                var max = gameui.AssetsManager.getBitmap("max");
                max.y = 50;
                max.x = DefaultWidth / itemsArray.length * i + 100;
                max.name = itemId + "_max";
                this.footerMaxs[itemId] = max;
                max.visible = false;
                this.footerContainer.addChild(max);


                //TODO: add Max indicator
                //add text
                var textObj = new createjs.Text("",defaultFontFamilyNormal,"white");
                textObj.y = 120;
                textObj.x = DefaultWidth / itemsArray.length * i + 190;
                textObj.name = itemId + "_text";
                this.footerTexts[itemId] = textObj;
                this.footerContainer.addChild(textObj);
            }

            this.footer.addChild(this.footerContainer);
        }

        //updates all footer labels based on user data
        updateFooterValues() {
            var itemsArray = UserData.Items.itemsNames;
            for (var i = 0; i < itemsArray.length; i++) {
                var itemId = itemsArray[i];
                var textObj = this.footerTexts[itemId];
                var qt = FlipPlusGame.itemsData.getItemQuantity(itemId)
                textObj.text = qt.toString();;

                var max:createjs.DisplayObject = this.footerMaxs[itemId]
                //show max text if item is 10 or more
                if (qt >= 10)
                    max.visible = true;
                else
                    max.visible = false;
            }
        }

        //animate a display object to the menu
        animateItemObjectToFooter(itemObj: createjs.DisplayObject, itemId: string) {

            var footerItem = this.footerContainer.getChildByName(itemId);
            if (footerItem) {

                if (itemObj.parent) {
                    var point = itemObj.parent.localToLocal(0, 0, this.content);

                    createjs.Tween.get(itemObj).
                        to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                        to({
                            x: footerItem.x + this.footer.x + this.footerContainer.x - point.x,
                            y: footerItem.y + this.footer.y + this.footerContainer.y - point.y
                        }, 700, createjs.Ease.quadInOut).
                        call(() => { this.updateFooterValues(); });
                }
            }
        }

        //create a loop animation for a item
        animateItemObjectIdle(itemObj: createjs.DisplayObject) {
            createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y}, 500, createjs.Ease.quadInOut);
        }

        //adds menu to the view
        addMenu() {
            this.menu = new Menu.View.ScreenMenu();
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions() });
            this.menu.addEventListener("back", () => { this.back(); });
            this.header.addChild(this.menu);
        }

        //updates user Data with new Item
        userAquireItem(itemId: string) {
            FlipPlusGame.itemsData.increaseItemQuantity(itemId);
        }

        selectRandomItems(quantity: number): Array<string> {
            this.itemsArray
            var items = new Array();

            var ia = ["hint", "hint", "hint", "hint", "skip", "solve", "time", "touch"];

            for (var i = 0; i < quantity; i++) 
                items.push(ia[Math.floor(Math.random()*ia.length)]);

            return items;
        }

        //===========================================================

        activate(parameters?: any) {

            super.activate(parameters);

            this.updateFooterValues();
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