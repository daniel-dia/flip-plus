declare var lib;

module InvertCross.Menu {
    export class TitleScreen extends Gbase.ScreenState {

        constructor() {
            super();

            //loads image
            this.background.addChild(new lib.LogoScreen ());

            //creates hitArea
            this.background.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, DefaultWidth, DefaultHeight));

            //add event to go to main menu
            this.background.addEventListener("click", () => {
                InvertCrossaGame.showMainMenu();
            });
        }
    }
}