declare var lib;

module InvertCross.Menu {
    export class TitleScreen extends Gbase.ScreenState {

        constructor() {
            super();

            //loads image
            this.content.addChild(new lib.LogoScreen ());

            //creates hitArea
            this.content.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, DefaultWidth, DefaultHeight));

            //add event to go to main menu
            this.content.addEventListener("click", () => {
                InvertCrossaGame.showMainMenu();
            });
        }
    }
}