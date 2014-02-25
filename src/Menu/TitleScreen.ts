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

                //verifica se é a primeira vez que está jogando.
                if (InvertCrossaGame.storyData.getStoryPlayed("firstPlay")) {

                    var sl = new SlideShow([]);
                    sl.onfinish = () => {
                        InvertCrossaGame.showProjectLevelsMenu(null);
                    }

                } else {
                    InvertCrossaGame.showMainMenu();
                }
            });
        }
    }
}