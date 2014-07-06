declare var lib;

module InvertCross.Menu {
    export class TitleScreen extends Gbase.ScreenState {

    private beach: createjs.DisplayObject;

        constructor() {
            super();

            var logo = new lib.LogoScreen();

            //loads image
            this.content.addChild(logo);
            
            this. beach= logo["instance"]["instance_14"];

            
            //creates hitArea
            this.content.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#FFF").drawRect(0, 0, DefaultWidth, DefaultHeight));

            //add event to go to main menu
            this.content.addEventListener("click", () => {
                InvertCrossaGame.showMainMenu();
            });
        }

        public redim(headerY: number, footerY: number, width: number) {
            super.redim(headerY, footerY, width);
            this.beach.y = -headerY / 4 - 616 +77/4+9; 
        }
    }
}