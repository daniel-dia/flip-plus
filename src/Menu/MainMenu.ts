declare var lib: any;

module InvertCross.Menu {

    export class MainMenu extends Gbase.ScreenState {
        // Constructor

        private myBots: Robots.MyBots;
        private intro: Intro;

        private terminal: View.Terminal;
        private menu: View.ScreenMenu;

        private playBt: createjs.DisplayObject;
        

        constructor() {
            super()

            var bg = Gbase.AssetsManager.getBitmap("mybotsbg");
            this.background.addChild(bg);

            this.addIntro();

            this.addMyBots();

            //this.addSmoke();

            this.addMenu();

            this.addTerminal();

            this.addPlayButton();
        }

        public activate() {
            super.activate();

            //play BgSound
            Gbase.AssetsManager.playMusic("trilha");

            //Verifies if it is the first time playing
            if (!InvertCrossaGame.storyData.getStoryPlayed("intro")) {
                this.intro.visible = true;
                this.myBots.visible = false;
                this.playBt.visible = false;
                this.intro.playPart1();

            }
            else if (!InvertCrossaGame.storyData.getStoryPlayed("intro2")) {
                InvertCrossaGame.storyData.setStoryPlayed("intro2")
                this.intro.visible = true;
                this.myBots.visible = false;
                this.playBt.visible = false;
                this.intro.playPart2();

            }
            else {

                this.intro.visible = false;
                this.playBt.visible = true;
                this.myBots.visible = true;
                
                //updates robots lobby
                this.myBots.update();
            }
        }

        private addIntro() {
            this.intro = new Intro();
            this.content.addChild(this.intro);

            this.intro.addEventListener("readyToPlay", () => {
                this.playBt.visible = true;
            })

            this.intro.addEventListener("end", () => {
                this.playBt.visible = true;
            })
        }

        private addMyBots() {
            this.myBots = new Robots.MyBots();
            this.content.addChild(this.myBots);
            this.myBots.addEventListener("robot", (e: createjs.Event) => {
                this.robotClick(<string>e.target)
            });
        }

        private addMenu() {

            this.menu = new View.ScreenMenu();
            this.menu.addEventListener("back", () => { this.back() });
            this.menu.addEventListener("menu", () => {
                //TODO fazer camada intermediaria
                InvertCross.InvertCrossaGame.screenViewer.switchScreen(new OptionsMenu());
            });
            this.header.addChild(this.menu);
        }
        
        private addTerminal() {
            this.terminal = new View.Terminal();
            this.terminal.x = 361;
            this.terminal.y = 451;
            this.content.addChild(this.terminal);
        }

        private addPlayButton() {
            var playBt = new Gbase.UI.TextButton("PLAY"/*stringResources.mm_play*/, () => {
                InvertCross.InvertCrossaGame.showProjectsMenu();
            }, null, defaultFontFamilyHighlight, highlightFontColor)

            this.content.addChild(playBt);
            playBt.x = 800;
            playBt.y = 1139;

            this.playBt = playBt;
        }

        public back() {
            InvertCross.InvertCrossaGame.showTitleScreen();
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
            this.content.addChild(smokefx);

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
            this.content.addChild(smokefx);

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
            this.content.addChild(smokefx);
        }

        //------------Robots Behaviour ---------------------------------

        public openRobot(robot: string) {
            this.myBots.openRobot(robot);
        }

        private robotClick(robot: string) {
            var t = InvertCrossaGame.timersData.getTimer(robot);
            this.terminal.setText(Math.floor(t/1000/60) + " minutes") 
        }

        //------------slide show---------------------------------------

        //TODO: ver isso
        private playSlideShow() {

            var s = new SlideShow(["sl1", "sl2", "sl3"]);
            InvertCrossaGame.screenViewer.switchScreen(s);
            s.onfinish = () => {
                
            }
        }

    }
}
