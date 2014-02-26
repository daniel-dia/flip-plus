module InvertCross.Menu {
    export class TitleScreen extends Gbase.ScreenState {

        constructor() {
            super();

            //loads image
            this.view.addChild(Assets.getImage("title/LogoScreen"));

            //creates hitArea
            this.view.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, DefaultWidth, DefaultHeight));

            //add event to go to main menu
            this.view.addEventListener("click", () => {
                InvertCrossaGame.showMainMenu();
            });
        }
    }
}