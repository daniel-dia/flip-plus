module FlipPlus.Menu {

    export class WorkshopMenuAction extends WorkshopMenu{
        
        public back() {
            FlipPlus.FlipPlusGame.showMainScreen();
        }
 
    }
}