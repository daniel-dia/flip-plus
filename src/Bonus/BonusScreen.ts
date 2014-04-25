module InvertCross.Bonus {

    // Class
    export class BonusScreen extends Gbase.ScreenState {

        itemArray: Array<string>;
       
        constructor(itemArray: Array<string>){
            super();

            this.itemArray = itemArray;
            
            this.addObjects();

            //adds menu
            this.addMenu();
        }

        addObjects() {
            //adds Background
            this.view.addChild(Assets.getImage("bonus1/bg_bonus1"));

            //adds header
            this.view.addChild(Assets.getImage("bonus1/hudbonus1_1"));

            //adds itens hud
            this.view.addChild(Assets.getImage(""));
        }

        addFooter() {
            //adds footer
            var footer = Assets.getImage("bonus1/hudbonus1_2");
            this.view.addChild(footer);
            footer.y = DefaultHeight - 291;

            this.addItemsOnFooter();
        }

        addItemsOnFooter() {

        }

        getFooterItemPosition(itemId: string) {

        }

        addMenu() {
            var menu = new Menu.View.ScreenMenu();
            menu.addEventListener("menu", () => { InvertCross.InvertCrossaGame.screenViewer.switchScreen(new Menu.OptionsMenu()); });
            menu.addEventListener("back", () => { this.back(); });
            this.view.addChild(menu);
        }

        activate(parameters?: any) {
            super.activate(parameters);
        }        
        
        addItem(itemId: string) {
            InvertCrossaGame.itemsData.increaseItemQuantity(itemId);
        }

        back() {
            InvertCross.InvertCrossaGame.showProjectsMenu();
        }
    }
}  