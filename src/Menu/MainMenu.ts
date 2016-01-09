module FlipPlus.Menu {

    export class MainMenu extends gameui.ScreenState {
        // Constructor

        private myBots: Robots.MyBots;
        private intro: Intro;

        private terminal: View.Terminal;
        private menu: View.ScreenMenu;

        private playBt: PIXI.DisplayObject;
        

        constructor() {
            super()

            var bg = gameui.AssetsManager.getBitmap("mybotsbg");
            bg.y = -339;
            bg.scale.y = 1.3310546875;
            this.content.addChild(bg);

            this.addMyBots();
             
            this.addMenu();

            this.addTerminal();

            this.addPlayButton();

            this.onback = () => {this.back();};
        }

        public activate() {
            super.activate();
            
            // play BgSound
            gameui.AudiosManager.playMusic("Music Dot Robot");
            
            // Verifies if it is the first time playing
            if (!FlipPlusGame.storyData.getStoryPlayed("intro")) { 
                this.myBots.playIntroPartA();
                console.log("i1")
            
            }
            else if (!FlipPlusGame.storyData.getStoryPlayed("intro2")) {
                FlipPlusGame.storyData.setStoryPlayed("intro2")
                this.myBots.playIntroPartB();
                console.log("i2")
            }
            else {

                //updates robots lobby
                this.myBots.update();
                console.log("ub")
            }
        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            this.myBots.clear();
        }
      
        private addMyBots() {
            this.myBots = new Robots.MyBots(FlipPlusGame.projectManager);
            this.content.addChild(this.myBots);
            this.myBots.addEventListener("robot", (e: PIXI.interaction.InteractionEvent) => {
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
            var playBt = new gameui.BitmapTextButton(StringResources["mm_play"], "fontTitle","btplay_press", () => {
                FlipPlus.FlipPlusGame.showProjectsMenu(); 
                //FlipPlus.FlipPlusGame.showActionLevelsMenu();
            } )
            playBt.interactive = true;
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
