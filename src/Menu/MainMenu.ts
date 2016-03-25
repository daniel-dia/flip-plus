module FlipPlus.Menu {

    export class MainMenu extends gameui.ScreenState {
        // Constructor

        private myBots: Robots.MyBots;
        private intro: Intro;

        public terminal: View.Terminal;
        private menu: View.ScreenMenu;

        private playBt: PIXI.DisplayObject;
        
        protected coinsIndicator: Menu.View.CoinsIndicator;

        constructor() {
            super()

            var bg = gameui.AssetsManager.getBitmap("mybotsbg");
            bg.y = -339;
            bg.scale.y = 1.3310546875;
            this.content.addChild(bg);
            
            this.addTerminal();

            this.addPlayButton();

            this.addMyBots();
             
            this.addMenu();
            
            this.onback = () => {this.back();};
            this.addCoinsIndicator();
        }

        private addCoinsIndicator() {
            // parts Indicator
            this.coinsIndicator = new Menu.View.CoinsIndicator(() => {
                FlipPlusGame.showShopMenu(this);
            });

            this.header.addChild(this.coinsIndicator);
            this.coinsIndicator.x = defaultWidth / 2;
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
        }

        public activate() {
            super.activate();
            
            // play BgSound
            gameui.AudiosManager.playMusic("Music Dot Robot");
            
            // Verifies if it is the first time playing
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

                // updates terminal
                this.terminal.activate();

            }


            // updates parts counter
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());

        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            this.terminal.desactivate();
            this.myBots.clear();
        }
      
        private addMyBots() {
            this.myBots = new Robots.MyBots(FlipPlusGame.levelsManager);
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
            var playBt = new gameui.BitmapTextButton(StringResources["mm_play"], "fontTitle", "btplay_press", () => {
                FlipPlus.FlipPlusGame.showProjectLevelsMenu(); 
            } )
            playBt.interactive = true;
            this.content.addChild(playBt);
            playBt.x = 800;
            playBt.y = 1139;

            this.playBt = playBt;


             //var playBt = new gameui.BitmapTextButton(StringResources["mm_play"], "fontTitle", "btplay_press", () => {
             //    FlipPlus.FlipPlusGame.showBonus("Bonus3");
             //  })
             //  playBt.interactive = true;
             //this.content.addChild(playBt);
             //playBt.x = 800;
             //playBt.y = 739;
             //this.playBt = playBt;

        }

        public back() {
            FlipPlus.FlipPlusGame.showTitleScreen();
        }

        //------------Robots Behaviour ---------------------------------

        private robotClick(robot: string) {
            //var t = FlipPlusGame.timersData.getTimer(robot);
            this.terminal.setText("Hi, Im am a Bot");
        }
        
        public showNewBot(botId: string) {
            //this.myBots.castNewEffect(botId);
            //this.terminal.setText("Novo Amigo");
        }

    }
}
