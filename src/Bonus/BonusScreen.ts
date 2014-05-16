module InvertCross.Bonus {

    // Class
    export class BonusScreen extends Gbase.ScreenState {

        itemsArray: Array<string>;

        footerContainer: createjs.Container;

        footerTexts: Array<createjs.Text>;

        menu: Menu.View.ScreenMenu;

        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        constructor(itemsArray: Array<string>,bonusId:string="1"){
            super();

            this.itemsArray = itemsArray;
            
            //adds scenary
            this.addScene(bonusId);

            //adds footer and itens
            this.addFooter(itemsArray);

            //adds bonus objc
            this.addObjects();

            //adds menu
            this.addMenu();

            //adds message
            this.message = new Menu.View.Message();
            this.content.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.content.addChild(this.popup)

            //bring content to front
            this.view.setChildIndex(this.content, this.view.getNumChildren() - 1);
        }

        //add Scene objects to the view
        addScene(bonusId:string) {
            //adds Background
            this.background.addChild(InvertCrossaGame.assetsManager.getBitmap(bonusId+"/back"));

            //adds header
            this.header.addChild(InvertCrossaGame.assetsManager.getBitmap(bonusId + "/header"));

            //adds footer
            var footer = InvertCrossaGame.assetsManager.getBitmap(bonusId + "/footer");
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
                    
            //adds Items to the footer
            for (var i = 0; i < itemsArray.length; i++) {

                var itemId = itemsArray[i];
                
                //add icon
                var itemObj = InvertCrossaGame.assetsManager.getBitmap("puzzle/icon_" + itemId);
                itemObj.y = 100;
                itemObj.x = DefaultWidth / itemsArray.length * i + 40;
                itemObj.name = itemId;
                this.footerContainer.addChild(itemObj);
                
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
                textObj.text = InvertCrossaGame.itemsData.getItemQuantity(itemId).toString();
            }
        }

        //animate a display object to the menu
        animateItemObjectToFooter(itemObj: createjs.DisplayObject, itemId: string) {

            var footerItem = this.footerContainer.getChildByName(itemId);
            if (footerItem) {

                var point = itemObj.parent.localToLocal(0,0,this.content);

                createjs.Tween.get(itemObj).
                    to({ y: itemObj.y - 80 }, 500, createjs.Ease.quadOut).
                    to({
                        x: footerItem.x + this.footer.x + this.footerContainer.x - point.x,
                        y: footerItem.y + this.footer.y + this.footerContainer.y - point.y
                    }, 700, createjs.Ease.quadInOut).
                    call(() => { this.updateFooterValues(); });
            }
        }

        //create a loop animation for a item
        animateItemObjectIdle(itemObj: createjs.DisplayObject) {
            createjs.Tween.get(itemObj, { loop: true }).to({ y: itemObj.y - 20 }, 500, createjs.Ease.quadInOut).to({ y: itemObj.y}, 500, createjs.Ease.quadInOut);
        }

        //adds menu to the view
        addMenu() {
            this.menu = new Menu.View.ScreenMenu();
            this.menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu()); });
            this.menu.addEventListener("back", () => { this.back(); });
            this.content.addChild(this.menu);
        }

        //updates user Data with new Item
        userAquireItem(itemId: string) {
            InvertCrossaGame.itemsData.increaseItemQuantity(itemId);
        }

        //===========================================================

        activate(parameters?: any) {
            super.activate(parameters);

            this.updateFooterValues();
        }        
        
        back() {
            InvertCross.InvertCrossaGame.showProjectsMenu();
        }

        //finalizes bonus game
        endBonus() {

            //lock menu interaction
            this.menu.fadeOut();

            //back to the screen
            setTimeout(() => { this.back(); }, 2500);

        }
    }
}  