﻿module InvertCross.Bonus {

    // Class
    export class BonusScreen extends Gbase.ScreenState {

        itemsArray: Array<string>;
        footerContainer: createjs.Container;
        menu: Menu.View.ScreenMenu;

        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        constructor(itemsArray: Array<string>){
            super();

            this.itemsArray = itemsArray;
            
            //adds scenary
            this.addScene();

            //adds footer and itens
            this.addFooter(itemsArray);

            //adds bonus objc
            this.addObjects();

            //adds menu
            this.addMenu();

            //adds message
            this.message = new Menu.View.Message();
            this.view.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.view.addChild(this.popup)
        }

        //add Scene objects to the view
        addScene() {
            //adds Background
            this.view.addChild(Assets.getImage("bonus1/bg_bonus1"));

            //adds header
            this.view.addChild(Assets.getImage("bonus1/hudbonus1_1"));

            //adds itens hud
            this.view.addChild(Assets.getImage(""));
        }

        //adds objects to the view <<interface>>
        addObjects() {}

        //create sa footer
        addFooter(itemsArray: Array<string>) {
            
            this.footerContainer = new createjs.Container();

            //adds footer
            var footer = Assets.getImage("bonus1/hudbonus1_2");
            this.footerContainer.addChild(footer);
            this.footerContainer.y = DefaultHeight - 291;

            //TODO must add texts
            //adds Items to the footer
            for (var i = 0; i < itemsArray.length; i++) {
                var itemId = itemsArray[i];
                var itemObj = Assets.getImage("puzzle/icon_" + itemId);

                //positioning item
                itemObj.y = 100;
                itemObj.x = DefaultWidth / itemsArray.length * i + 90;
                itemObj.name = itemId;
                this.footerContainer.addChild(itemObj);
            }

            this.view.addChild(this.footerContainer);
        }

        //animate a display object to the menu
        animateItemObjectToFooter(itemObj: createjs.DisplayObject, itemId: string) {

            var footerItem = this.footerContainer.getChildByName(itemId);

            if (footerItem) 
                createjs.Tween.get(itemObj).wait(500).to({
                    x: footerItem.x + this.footerContainer.x,
                    y: footerItem.y + this.footerContainer.y
                }, 700, createjs.Ease.quadInOut);
        }

        //adds menu to the view
        addMenu() {
            this.menu = new Menu.View.ScreenMenu();
            this.menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu()); });
            this.menu.addEventListener("back", () => { this.back(); });
            this.view.addChild(this.menu);
        }

        //updates user Data with new Item
        userAquireItem(itemId: string) {
            InvertCrossaGame.itemsData.increaseItemQuantity(itemId);
        }

        //===========================================================

        activate(parameters?: any) {
            super.activate(parameters);
        }        
        
        back() {
            InvertCross.InvertCrossaGame.showProjectsMenu();
        }
    }
}  