/// <reference path="../../lib/easeljs.d.ts" />
/// <reference path="../../lib/SmokeFX.ts" />

/// <reference path="../InvertCrossGame.ts" /> 

/// <reference path="../GamePlay/Model/Level.ts" /> 

/// <reference path="view/terminal.ts" />

/// <reference path="../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../Gbase/ScreenState.ts" /> 
/// <reference path="../Robots/RobotsLobby.ts" /> 

module InvertCross.Menu {

    export class MainMenu extends Gbase.ScreenState {
        // Constructor

        private lobby: Robots.RobotsLobby;
        private terminal: View.Terminal;
        private menu: View.ScreenMenu;

        constructor() {
            super()

            var bg: createjs.Bitmap = InvertCross.Assets.getImage("mybots/mybotsbg");
            this.view.addChild(bg);

            this.addRobotsLobby();

            //this.addSmoke();

            this.addMenu();

            this.addTerminal();

            this.addPlayButton();
        }


        public activate() {
            super.activate();

            //play BgSound
            Assets.playMusic("trilha");

            //update menu
            this.menu.partsIndicator.updateStarsAmount(InvertCrossaGame.projectManager.getStarsCount());
            this.menu.partsIndicator.updatePartsAmount(InvertCrossaGame.partsManager.getBallance());

            //updates robots lobby
            this.lobby.update();
        }

        private addRobotsLobby() {
            this.lobby = new Robots.RobotsLobby();
            this.view.addChild(this.lobby);
            this.lobby.addEventListener("robot", (e: createjs.Event) => {
                this.robotClick(<string>e.target)
            });
        }

        private addMenu() {
            this.menu = new View.ScreenMenu(false);
            
            this.view.addChild(this.menu);
            this.menu.addEventListener("menu", () => {
                //TODO fazer camada intermediaria
                InvertCross.InvertCrossaGame.screenViewer.switchScreen(new OptionsMenu());
            });
        }

        private addTerminal() {
            this.terminal = new View.Terminal();
            this.terminal.x = 361;
            this.terminal.y = 451;
            this.view.addChild(this.terminal);
        }

        private addPlayButton() {
            var playBt = new Gbase.UI.TextButton("PLAY", () => {
                this.playSlideShow();
            }, null, defaultFontFamilyHighlight, highlightFontColor)
            
            this.view.addChild(playBt);
            playBt.x = 800;
            playBt.y = 1139
        }

        //TODO: it shoud not be here
        private addSmoke() {
            return;
            var smokefx: SmokeFX.SmokeFXEmmiter = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536 / 2, 1);
            smokefx.aging = 4000;
            smokefx.birthrate = 0.05
            smokefx.imageRegX = smokefx.imageRegY = 15;
            smokefx.scale = 8;
            smokefx.scaleFinal = 18;
            smokefx.speedY = -40;
            smokefx.speedX = 70;
            smokefx.speedVariationX = 20;
            smokefx.speedVariationY = 11
            smokefx.x = 1536 / 2;
            smokefx.y = 1676 + 50;
            this.view.addChild(smokefx);

            smokefx = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536 / 2, 1);
            smokefx.aging = 4000;
            smokefx.birthrate = 0.05
            smokefx.imageRegX = smokefx.imageRegY = 15;
            smokefx.scale = 8;
            smokefx.scaleFinal = 18;
            smokefx.speedY = -40;
            smokefx.speedX = -70;
            smokefx.speedVariationX = 20;
            smokefx.speedVariationY = 11
            smokefx.x = 0;
            smokefx.y = 1676 + 50;
            this.view.addChild(smokefx);

            smokefx = new SmokeFX.SmokeFXEmmiter("assets/smokePart.png", 1536, 1);
            smokefx.alpha = 1;
            smokefx.finalAlpha = 0;
            smokefx.aging = 20000;
            smokefx.birthrate = 0.005
            smokefx.imageRegX = smokefx.imageRegY = 15;
            smokefx.scale = 20;
            smokefx.scaleFinal = 48;
            smokefx.speedY = -40;
            smokefx.speedX = -0;
            smokefx.speedVariationX = 20;
            smokefx.speedVariationY = 80
            smokefx.x = 0;
            smokefx.y = 1676;
            this.view.addChild(smokefx);
        }

        //------------Robots Behaviour ---------------------------------

        public openRobot(robot: string) {
            this.lobby.openRobot(robot);
        }

        private robotClick(robot: string) {
            var t = InvertCrossaGame.timersData.getTimer(robot);
            this.terminal.setText(Math.floor(t/1000/60) + " minutes") 
        }

        //------------slide show---------------------------------------

        private playSlideShow() {

            var s = new SlideShow(["sl1", "sl2", "sl3"]);
            InvertCrossaGame.screenViewer.switchScreen(s);
            s.onfinish = () => {
                InvertCross.InvertCrossaGame.showProjectsMenu();
            }
        }

    }
}
