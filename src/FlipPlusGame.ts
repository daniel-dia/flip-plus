declare var levelsData;
declare var ActionLevelsData: Array<FlipPlus.Levels.BotLevelsSet>

declare function getAssetsManifest(assetscale:number):Array<any>;
//declare var spriteSheets;

module FlipPlus { 

    // Main game Class
    // Controller
    export class FlipPlusGame  {

        // game screen
        public static gameScreen: gameui.GameScreen;

        // userData
        public static levelsUserDataManager: UserData.LevelsUserDataManager;
        public static settingsUserData: UserData.SettingsUserDataManager;
        public static timersData: UserData.Timers;
        public static coinsData: UserData.Coins;
        public static storyData: UserData.Story;

        // Social
        public static gameServices: GameServices;
        public static FBSocialService: any;

        // analytics
        public static analytics: Analytics;

        // Managers
        public static levelsManager:        Levels.LevelsManager;
        public static BotsLevelManager:     Levels.LevelsManager;
        public static actionLevelsManager:  Levels.LevelsManager;

        // Screens
        private static titleScreen: gameui.ScreenState;
        private static workshopMenu: Menu.WorkshopMenu;
        private static actionlevelsMenu:    gameui.ScreenState;
        private static levelScreeen:        gameui.ScreenState;

        public static mainScreen:           Menu.MainMenu;
        public static optionsMenu:          gameui.ScreenState;
        public static loadingScreen:        Menu.Loading;

        // current game mode
        private static gameMode: GameMode;

        // ----------------------------- Initialization -------------------------------------------//

        public static initializeGame() {

            Cocoon.Utils.setNPOTEnabled(true);

            this.gameScreen = new gameui.GameScreen("gameDiv", defaultWidth, defaultHeight,60);

            // userData
            this.levelsUserDataManager = new UserData.LevelsUserDataManager();
            this.settingsUserData = new UserData.SettingsUserDataManager();
            this.coinsData = new UserData.Coins();
            this.storyData = new UserData.Story();
            this.timersData = new UserData.Timers();

            // load options
            gameui.AudiosManager.setSoundVolume(this.settingsUserData.getSoundfx());
            gameui.AudiosManager.setMusicVolume(this.settingsUserData.getMusic());

            // game service
            this.gameServices = new GameServices();

            // analytics
            this.analytics = new Analytics();
            this.analytics.logGameStart();
           
            //managers
            this.BotsLevelManager    = new Levels.LevelsManager(levelsData, this.levelsUserDataManager);
            this.actionLevelsManager = new Levels.ActionLevelsManager(ActionLevelsData, this.levelsUserDataManager);
            this.levelsManager = this.BotsLevelManager;

            // gameMode
            this.gameMode = GameMode.PROJECTS;

            //go to First Screen
            this.loadingScreen = new FlipPlus.Menu.Loading();
            this.gameScreen.switchScreen(this.loadingScreen);

            this.loadingScreen.loaded = () => {
                if (levelCreatorMode == true && !levelCreatorTestMode) {
                    this.toLevelCreator()
                }
                else
                    this.showMainScreen();
            }

            // give 10 coins to user first time
            if (!this.storyData.getStoryPlayed("coins")){
                this.storyData.setStoryPlayed("coins")
                this.coinsData.setAmount(10);
            }            

            // back callback
            // add back button callback
            Cocoon.App.exitCallback(() => {
                return this.gameScreen.sendBackButtonEvent()
            })

            var ps = this.levelsManager.getAllProjects();

            ps[0].UserData.unlocked = true;
           // ps[1].UserData.unlocked = true;
           // ps[2].UserData.unlocked = true;
            // for (var p in ps) {
            //     ps[p].UserData.unlocked = true;
            //     ps[p].UserData.stars=0;
            //     for (var l in ps[p].levels) {
            //         ps[p].levels[l].userdata.solved = false;
            //         ps[p].levels[l].userdata.unlocked = true;
            //
            //     }
            // }
        }

        public static initializeAds() {

            Cocoon.Ad.interstitial.on("ready", () => {
                // tells that a ads s loaded
                Cocoon.Ad.interstitial["loaded"] = true;
                // once a ads is loaded so it is avaliable for this app.
                this.storyData.setStoryPlayed("ads_avaliable");
                console.log("ads loaded");
            })

            console.log("ads initialized");
            Cocoon.Ad.loadInterstitial();
        }

        public static initializeSocial() {
            try {
                var os = "web"
                if (Cocoon.Device.getDeviceInfo()) os = Cocoon.Device.getDeviceInfo().os;

                if (os == "windows") return;

                //initialize the Facebook Service the same way as the Official JS SDK
                if (navigator.onLine) {
                    var fb = Cocoon.Social.Facebook;
                    fb.init({ appId: fbAppId });
                    this.FBSocialService = fb.getSocialInterface();
                }
            } catch (e) { }
        }

        // ----------------------------- Game Methods ---------------------------------------------//
        
        public static toLevelCreator(level?:Levels.Level,callback?) {
            if (!level) {
                level = new Levels.Level();
                level.width = 0;
                level.height = 0;
            }
            
            this.gameScreen.switchScreen(new GamePlay.LevelCreator2(level, callback), null, { type: "none",time:0 });
        }
               
        public static showProjectLevelsMenu(project?: Levels.BotLevelsSet, parameters?: any) {

            // set wich leve manager to use
            this.gameMode = GameMode.PROJECTS;
            this.levelsManager = this.BotsLevelManager;

            //verifies the current projet
            if (project == null)
                project = this.levelsManager.getCurrentProject();
            else
                this.levelsManager.setCurrentProject(project);

            var projects = this.levelsManager.getAllProjects()

            //create a new levels menu, if needed
            if (this.workshopMenu == undefined)
                this.workshopMenu = new Menu.WorkshopMenu(this.levelsManager);

            // freeze if is needed
            if (parameters && parameters.freeze)
                this.workshopMenu.disableInteraction();
            else 
                this.workshopMenu.enableInteraction();
            

            //switch screens
            this.gameScreen.switchScreen(this.workshopMenu, parameters);
        }

        public static showActionLevelsMenu() {


            // set wich leve manager to use
            this.gameMode = GameMode.ACTION;
            this.levelsManager = this.actionLevelsManager;

            //create a new levels menu, if needed
            if (this.actionlevelsMenu == undefined)
                this.actionlevelsMenu = new Menu.WorkshopMenuAction(this.levelsManager);

            //switch screens
            this.gameScreen.switchScreen(this.actionlevelsMenu);
        }

        public static showBonus(bonusId: string) {
            var bonusScreen: Bonus.BonusScreen;
            switch (bonusId) {
                case "Bonus1":
                    bonusScreen = new Bonus.BonusBarrel(["coin"]);
                    break;
                case "Bonus2":
                    bonusScreen = new Bonus.Bonus2(["coin"]);
                    break;
                case "Bonus3":
                    bonusScreen = new Bonus.Bonus3(["coin"]);
                    break;
                default:
            }


            //restart time
            var timeout = bonusData[bonusId].timeOut;
            if (FlipPlusGame.storyData.getStoryPlayed("halfTime")) timeout = timeout / 2;
            this.timersData.setTimer(bonusId, timeout);

            this.gameScreen.switchScreen(bonusScreen);
        }

        public static showLevel(level: Levels.Level, parameters?: any) {
            this.levelsManager.setCurrentLevel(level);
            this.levelScreeen = this.createLevel(level);
            this.gameScreen.switchScreen(this.levelScreeen, parameters);
        }

        private static createLevel(level: Levels.Level): GamePlay.LevelScreen {

            switch (level.type) {
                case "puzzle": case "draw":
                    return new GamePlay.LevelPuzzle(level);
                case "moves": case "flip": case "combo":
                    return new GamePlay.LevelTaps(level);
                case "tutorial":
                    return new GamePlay.Tutorial(level);
                case "time":
                    return new GamePlay.LevelTimeAttack(level);
                case "action":
                    return new GamePlay.LevelAction(level);
            }

            return null;
        }

        public static completeLevel(complete: boolean = false, firstTime: boolean=false) {

            if (this.gameMode == GameMode.PROJECTS) {

                this.showProjectLevelsMenu(null, { complete: complete, freeze: true, firstTime: firstTime });
                
                //if complete changes to myBotScreen
                if (this.levelsManager.getCurrentProject().UserData.complete) {

                    setTimeout(() => {
                        FlipPlusGame.showMainScreen();
                    }, 6000);

                } else {

                    setTimeout(() => {
                        this.showNextLevel();
                    }, 1500);
                }

            }
            else
                this.showActionLevelsMenu(); 
        }

        public static looseLevel() {
            if(this.gameMode == GameMode.PROJECTS)
                this.showProjectLevelsMenu(null, { loose: true });
            else
                this.showActionLevelsMenu();
        }

        public static exitLevel() {
            if (this.gameMode == GameMode.PROJECTS)
                this.showProjectLevelsMenu();
            else
                this.showActionLevelsMenu();
        }

        public static showNextLevel() {
            var nextLevel: Levels.Level = this.levelsManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                this.showLevel(nextLevel);
            else
                this.exitLevel();
        }

        public static skipLevel(complete: boolean= false) {
            var currentLevel = this.levelsManager.getCurrentLevel();

            this.levelsManager.skipLevel(currentLevel);
            this.completeLevel(complete);
            ///this.showProjectLevelsMenu(null, { complete: complete });
        }

        public static showMainScreen() {
            if (this.mainScreen == null)
                this.mainScreen = new Menu.MainMenu();

            this.gameScreen.switchScreen(this.mainScreen);

        }

        public static showTitleScreen() {
            if (!this.titleScreen) this.titleScreen = new Menu.TitleScreen();
            this.gameScreen.switchScreen(this.titleScreen);
        }

        public static showShopMenu(previousScreen: gameui.ScreenState) {
            this.gameScreen.switchScreen(new Menu.ShopMenu(previousScreen));
        }

        public static showSpecialOffer(previousScreen: gameui.ScreenState) {
            this.gameScreen.switchScreen(new Menu.SpecialOfferMenu(previousScreen));
        }

        public static replayLevel() {
            var currentLevel = this.levelsManager.getCurrentLevel();
            this.showLevel(currentLevel);
        }

        public static endGame() {

        }

        public static showOptions(previousScreen?: gameui.ScreenState){
            this.gameScreen.switchScreen(new Menu.OptionsMenu(previousScreen));
        }

        // ---------------------------- license --------------------------------------------------//

        public static isFree():boolean {
            return true;
        }
    }

    enum GameMode {
        PROJECTS,
        ACTION
    }
}


window.onload = function () {
    FlipPlus.FlipPlusGame.initializeGame();
};