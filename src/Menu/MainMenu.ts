module FlipPlus.Menu {

    export class MainMenu extends gameui.ScreenState {
        // Constructor

        private myBots: Robots.MyBots;
        private intro: Intro;

        private terminal: View.Terminal;
        private menu: View.ScreenMenu;

        private playBt: createjs.DisplayObject;
        

        constructor() {
            super()

            var bg = gameui.AssetsManager.getBitmap("mybotsbg");
            bg.y = -339;
            bg.scaleY = 1.3310546875;
            this.content.addChild(bg);

            this.addMyBots();
             
            this.addMenu();

            this.addTerminal();

            this.addPlayButton();
        }

        public activate() {
            super.activate();

            //play BgSound
            gameui.AudiosManager.playMusic("Music Dot Robot");


            //Verifies if it is the first time playing
            if (!FlipPlusGame.storyData.getStoryPlayed("intro")) {
                this.myBots.playIntroPartA();
            
            }
            else if (!FlipPlusGame.storyData.getStoryPlayed("intro2")) {
                FlipPlusGame.storyData.setStoryPlayed("intro2")
                this.myBots.playIntroPartB();
            }
            else {

                //updates robots lobby
                this.myBots.update();
            }
        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            this.myBots.clear();
        }
      
        private addMyBots() {
            this.myBots = new Robots.MyBots(FlipPlusGame.projectManager);
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
                FlipPlus.FlipPlusGame.showOptions();
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
            var playBt =  new gameui.TextButton(stringResources["mm_play"], defaultFontFamilyHighlight, highlightFontColor, "", () => {
                FlipPlus.FlipPlusGame.showProjectsMenu();
            } )

            this.content.addChild(playBt);
            playBt.x = 800;
            playBt.y = 1139;

            this.playBt = playBt;
        }

        public back() {
            FlipPlus.FlipPlusGame.showTitleScreen();
        }

        //------------Robots Behaviour ---------------------------------

        private robotClick(robot: string) {
            var t = FlipPlusGame.timersData.getTimer(robot);
            this.terminal.setText(Math.floor(t/1000/60) + " minutes") 
        }
        
        public showNewBot(botId: string) {
            this.myBots.castNewEffect(botId);
            this.terminal.setText("Novo Amigo");
        }

    }
}
