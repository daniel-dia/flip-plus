declare var levelsData;
declare var bonusData;
declare var ActionLevelsData: Array<FlipPlus.Levels.BotLevelsSet>

declare function getAssetsManifest(assetscale:number):Array<any>;
//declare var spriteSheets;

module FlipPlus { 

    // Main game Class
    export class FlipPlusGame  {

        // game screen
        public static gameScreen: gameui.GameScreen;

        // userData
        public static levelsUserDataManager: UserData.LevelsUserDataManager;
        public static settingsUserData: UserData.SettingsUserDataManager;
        public static timersData: UserData.Timers;
        public static coinsData: UserData.Coins;
        public static storyData: UserData.Story;
        public static counterData: UserData.Counters;

        // Social
        public static gameServices: GameServices;
        public static FBSocialService: any;

        // analytics
        public static analytics: Analytics;

        // Managers
        public static levelsManager:        Levels.LevelsManager;
        public static bonusManager:         Bonus.BonusManager;

        // Screens
        private static titleScreen: gameui.ScreenState;
        private static workshopMenu: Menu.WorkshopMenu;
        private static actionlevelsMenu:    gameui.ScreenState;
        private static levelScreeen:        gameui.ScreenState;

        public static mainScreen:           Menu.MainMenu;
        public static optionsMenu:          gameui.ScreenState;
        public static loadingScreen:        Menu.Loading;

        // ----------------------------- Initialization -------------------------------------------//

        public static initializeGame() {

            //Cocoon.Utils.setNPOTEnabled(true);

            this.gameScreen = new gameui.GameScreen("gameDiv", defaultWidth, defaultHeight,60);

            // userData
            this.levelsUserDataManager = new UserData.LevelsUserDataManager();
            this.bonusManager = new Bonus.BonusManager(bonusData);
            this.settingsUserData = new UserData.SettingsUserDataManager();
            this.coinsData = new UserData.Coins();
            this.storyData = new UserData.Story();
            this.timersData = new UserData.Timers();
            this.counterData = new UserData.Counters();

            // load options
            gameui.AudiosManager.setSoundVolume(this.settingsUserData.getSoundfx());
            gameui.AudiosManager.setMusicVolume(this.settingsUserData.getMusic());

            // game service
            this.gameServices = new GameServices();
            
            // analytics
            FlipPlusGame.counterData.increaseCounter("sessions");
            var session_num = FlipPlusGame.counterData.getCounter("sessions");
            this.analytics = new Analytics(session_num);
            this.analytics.logGameStart();

            // initialize ads
            CocoonAds.initialize(); 

            //managers
            this.levelsManager = new Levels.LevelsManager(levelsData, this.levelsUserDataManager);

           // give 10 coins to user first time
            if (!this.storyData.getStoryPlayed("coins")){
                this.storyData.setStoryPlayed("coins")
                this.coinsData.setAmount(15);
            }            

            // add back button  cocoon
            document.addEventListener("backbutton", () => {
                return this.gameScreen.sendBackButtonEvent()
            }, false);

            // add back button Windows 
            if (typeof Windows != "undefined") {
                var systemNavigationManager = Windows.UI.Core.SystemNavigationManager.getForCurrentView();
                systemNavigationManager.appViewBackButtonVisibility = 0;
                systemNavigationManager.onbackrequested = (e) => {
                    // Navigate back in your webview. 
                    e.handled = true; // Notifies OS that you've handled the back button event.
                    return this.gameScreen.sendBackButtonEvent();
                };
            }

            //setTimeout(() => { this.unlo(); }, 4000); return

            this.unlockAll();

            //go to First Screen
            this.loadingScreen = new FlipPlus.Menu.Loading();
            this.gameScreen.switchScreen(this.loadingScreen);
            
            // loading screen
            this.loadingScreen.loaded = () => {
                if (levelCreatorMode == true && !levelCreatorTestMode)
                    this.toLevelCreator()
                else
                    this.showMainScreen();
            }
        }

        // test debug 
        public static tests() {
            this.gameServices.showAchievements();
            setTimeout(() => { this.gameServices.submitAchievent("ACH_Bot02"); }, 4000);
        }

        // test debug 
        public static unlockAll() {
            this.coinsData.setAmount(999);
            var ps = this.levelsManager.getAllProjects();
            for (var p in ps) {
                ps[p].UserData.unlocked = true;
                ps[p].UserData.complete = true;
                ps[p].UserData.stars = 3;
                for (var l in ps[p].levels) {
                    ps[p].levels[l].userdata.solved = true;
                    ps[p].levels[l].userdata.unlocked = true;    
                }
            }
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

        public static showBonus(bonusId: string) {

         if (!this.bonusManager.getBonusAvaliable(bonusId)) return;

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

            // verify if player purchased halfTime bonus
            var halfTime = FlipPlusGame.storyData.getStoryPlayed("halfTime");

            // restart bonus timer
            FlipPlusGame.bonusManager.restartBonusTimer(bonusId, halfTime);
            
            // goes to Bonus screen
            this.gameScreen.switchScreen(bonusScreen);
        }

        public static showLevel(level: Levels.Level, parameters?: any) {
            this.levelsManager.setCurrentLevel(level);
            this.levelScreeen = this.createLevel(level);
            this.gameScreen.switchScreen(this.levelScreeen, parameters);
        }

        public static createLevel(level: Levels.Level): GamePlay.LevelScreen {

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

        // shows workshop with the proper parameters
            this.showProjectLevelsMenu(null, { complete: complete, freeze: firstTime, firstTime: firstTime });
                             
            // if first time, do an animation and goes to the next level, or show the completed bot   
            if (!firstTime) return;

            if (this.levelsManager.getCurrentProject().UserData.complete && firstTime) 
                //if complete changes to myBotScreen
                setTimeout(() => {this.completeProject();}, 6000);
            else 
                //or goes to the next level
                setTimeout(() => {this.showNextLevel();}, 1500);
 
        }

        public static verifyGameEnd() {
            
            // verifies if all projects are complete
            var projects = this.levelsManager.getAllProjects();
            var completeAllProjects = true;
            for (var p in projects) if (!projects[p].UserData.complete) completeAllProjects = false;

            return completeAllProjects;
        }
        
        public static completeProject() {

            // get current completed bot
            var currentProjectID = FlipPlusGame.levelsManager.getCurrentProject().name;

            // unset current bot
            FlipPlusGame.levelsManager.setCurrentProject(null);

            // set parameter to make bot to interactive with user
            var parameters = { bot: currentProjectID };

            // verify if all game is complete  and show special phrase
            if (FlipPlusGame.verifyGameEnd())
                parameters["gameEnd"] = true;
            
            // shows main menu
            FlipPlusGame.showMainScreen(parameters);
        }
 
        public static looseLevel() {
            this.showProjectLevelsMenu(null, { loose: true });
        }

        public static exitLevel() {
            this.showProjectLevelsMenu();
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

        public static showMainScreen(parameters?:any) {
            if (this.mainScreen == null) this.mainScreen = new Menu.MainMenu();
            if (this.gameScreen.currentScreen == this.titleScreen || this.gameScreen.currentScreen == this.loadingScreen)
                this.gameScreen.switchScreen(this.mainScreen, parameters, { type: "zoomIn", time: 500 });
            else 
                this.gameScreen.switchScreen(this.mainScreen, parameters);
        }

        public static showTitleScreen() {
            if (!this.titleScreen) this.titleScreen = new Menu.TitleScreen();
            this.gameScreen.switchScreen(this.titleScreen, null, { type: "zoomOut", time:500 });
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

        public static showOptions(previousScreen?: gameui.ScreenState) {
            this.gameScreen.switchScreen(new Menu.OptionsMenu(previousScreen));
        }

        public static showAbout(previousScreen?: gameui.ScreenState) {
            this.gameScreen.switchScreen(new Menu.About(previousScreen));
        }

        // ---------------------------- license --------------------------------------------------//

        public static isFree():boolean {
            return true;
        }
    }
}

if(window["cordova"])
    document.addEventListener('deviceready', function () { FlipPlus.FlipPlusGame.initializeGame() }, false);
else
    window.onload = function () { FlipPlus.FlipPlusGame.initializeGame() }