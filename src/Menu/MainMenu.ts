declare function ad_show(callback);
declare function ad_initialize();

module FlipPlus.Menu {

    export class MainMenu extends gameui.ScreenState {
        // Constructor

        private myBots: Robots.MyBots;
        private intro: Intro;

        public terminal: View.Terminal;
        private menu: View.ScreenMenu;

        private playBt: PIXI.DisplayObject;
        private logo: PIXI.DisplayObject;

        protected coinsIndicator: Menu.View.CoinsIndicator;

        constructor() {
            super()

            var bg = gameui.AssetsManager.getBitmap("mybotsbg");
            bg.y = -339;
            bg.scale.y = 1.3310546875;
            this.content.addChild(bg);

            this.addLogo();

            this.addTerminal();

            this.addPlayButton();

            this.addMyBots();
             
            this.addMenu();
            
            this.addCoinsIndicator();

            this.onback = () => { this.back(); };
        }

        private addCoinsIndicator() {
            // parts Indicator
            this.coinsIndicator = new Menu.View.CoinsIndicator(() => {
                FlipPlusGame.showShopMenu(this);
            });

            //this.header.addChild(this.coinsIndicator);
            this.coinsIndicator.x = defaultWidth / 2;
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());
        }

        public activate(parameters) {
            super.activate();
            
            // animate logo
            var x = 370;
            var y = 50 - FlipPlus.FlipPlusGame.gameScreen.headerPosition / 2;
            createjs.Tween.get(this.logo).to({ y: -230, rotation: -0.5 }).to({ y: y, x: x, rotation: 0 }, 1500, createjs.Ease.bounceOut);

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

            // if is a new bot, animate it after 0.5 sec
            if (parameters && parameters.bot && parameters.bot != "Bot01") {
                setTimeout(() => { this.myBots.animateBot(parameters.bot); }, 500);
            }

            if (parameters && parameters.gameEnd) {
                setTimeout(() => { this.myBots.playEndGame(); }, 1000);
            }

            // updates parts counter
            this.coinsIndicator.updateAmmount(FlipPlusGame.coinsData.getAmount());

        }

        public desactivate(parameters?: any) {
            super.desactivate(parameters);
            this.terminal.desactivate();
            this.myBots.clear();
        }
      
        private addLogo() {
            this.logo = new PIXI.extras.TilingSprite(gameui.AssetsManager.getLoadedImage("logo"), 795, 260);
            this.header.addChild(this.logo);
            
            this.logo.x = 370;
            this.logo.y = 50 - FlipPlus.FlipPlusGame.gameScreen.headerPosition / 2;
        }
    
        private addMyBots() {
            this.myBots = new Robots.MyBots(FlipPlusGame.levelsManager);
            this.content.addChild(this.myBots);
            this.myBots.on("robot", (BotId) => {
                this.robotClick(BotId);
           });
        }

        private addMenu() {

            this.menu = new View.ScreenMenu();
            this.menu.addEventListener("back", () => { this.back() });
            this.menu.addEventListener("menu", () => { FlipPlus.FlipPlusGame.showOptions(); });
            this.header.addChild(this.menu);

            if (!win) {
                //adds menu button
                var achBt: gameui.ImageButton = new gameui.ImageButton("AchBt", () => {
                    FlipPlusGame.gameServices.showAchievements();
                });
                achBt.y = -90;
                achBt.x = defaultWidth - 130;
                this.footer.addChild(achBt);
            }

        }
        
        private addTerminal() {
            this.terminal = new View.Terminal();
            this.terminal.x = 361;
            this.terminal.y = 451;
            this.content.addChild(this.terminal);

            this.terminal.on("bonus", (bonusId) => {

                // loads ads and show bonus
                CocoonAds.load();

                // when bonus finishes the ads is shown
                FlipPlusGame.showBonus(bonusId);
                
            });


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
        }

        public back() {
            FlipPlus.FlipPlusGame.showTitleScreen();
        }

        //------------Robots Behaviour ---------------------------------

        private robotClick(robot: string) {
            // play bot sound
            Robots.MyBots.playRobotSound(robot);

            var phrases = StringResources.botsPhrases[robot];
            if (phrases) {
                var index = Math.floor(Math.random() * phrases.length);
                this.terminal.setText(phrases[index]);
            }
        }
        
        public showNewBot(botId: string) {
            //this.myBots.castNewEffect(botId);
            //this.terminal.setText("Novo Amigo");
        }

    }
}
