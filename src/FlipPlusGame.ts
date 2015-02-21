declare var levelsData; 

declare function getAssetsManifest(assetscale:number):Array<any>;
//declare var spriteSheets;

module FlipPlus { 

    // Main game Class
    // Controller
    export class FlipPlusGame  {

        //game screen
        public static gameScreen: gameui.GameScreen;

        //userData
        public static projectData: UserData.ProjectsData;
        public static settings: UserData.Settings;
        public static timersData: UserData.Timers;
        public static coinsData: UserData.Coins;
        public static storyData: UserData.Story;

        //analytics
        public static analytics: Analytics;

        //Managers
        public static projectManager: Projects.ProjectManager;

        // Screens
        private static titleScreen: gameui.ScreenState;
        private static projectsMenu: gameui.ScreenState;
        private static levelsMenu: gameui.ScreenState;
        private static levelScreeen: gameui.ScreenState;

        public static mainScreen: Menu.MainMenu;
        public static optionsMenu: gameui.ScreenState;
        public static loadingScreen: Menu.Loading;

        // ----------------------------- Initialization -------------------------------------------//

        public static initializeGame() {

            assetscale = 1;
            if (window.innerWidth <= 1024) assetscale = 0.5;
            if (window.innerWidth <= 420) assetscale = 0.25;   

            this.gameScreen = new gameui.GameScreen("myCanvas", defaultWidth, defaultHeight,60,true);

            //userData
            this.projectData = new UserData.ProjectsData();
            this.settings = new UserData.Settings();
            this.coinsData = new UserData.Coins();
            this.storyData = new UserData.Story();
            this.timersData = new UserData.Timers();

            // analytics
            this.analytics = new Analytics();
            this.analytics.logGameStart();
           
            //managers
            this.projectManager = new Projects.ProjectManager(levelsData, this.projectData);

            //go to First Screen
            this.loadingScreen = new FlipPlus.Menu.Loading();
            this.gameScreen.switchScreen(this.loadingScreen);

            this.loadingScreen.loaded = () => {
                if (levelCreatorMode == true && !levelCreatorTestMode) {
                    this.gameScreen.switchScreen(new GamePlay.LevelCreator(null, window));
                }
                else
                    this.showTitleScreen();
            }

            this.coinsData.setAmount(10);
        }

        // ----------------------------- Game Methods ---------------------------------------------//

        public static showProjectsMenu() {
            this.levelScreeen = null;

            if (this.projectsMenu == null)
                this.projectsMenu = new Menu.ProjectsMenu();

            this.gameScreen.switchScreen(this.projectsMenu);
        }


        public static showProjectLevelsMenu(project?: Projects.Project, parameters?: any) {

            //verifies the current projet
            if (project == null)
                project = this.projectManager.getCurrentProject();
            else
                this.projectManager.setCurrentProject(project);

            if (project == null) return;

            var projects = this.projectManager.getAllProjects()

            //create a new levels menu, if needed
            if (this.levelsMenu == undefined)
                this.levelsMenu = new Menu.LevelsMenu();

            //switch screens
            this.gameScreen.switchScreen(this.levelsMenu, parameters);
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
            this.timersData.setTimer(bonusId, bonusData[bonusId].timeOut);

            this.gameScreen.switchScreen(bonusScreen);
        }

        public static showLevel(level: Projects.Level, parameters?: any) {
            this.projectManager.setCurrentLevel(level);
            this.levelScreeen = this.createLevel(level);
            this.gameScreen.switchScreen(this.levelScreeen, parameters);
        }

        private static createLevel(level: Projects.Level): GamePlay.LevelScreen {

            switch (level.type) {
                case "puzzle": case "draw":
                    return new GamePlay.Puzzle(level);
                case "moves": case "flip": case "combo":
                    return new GamePlay.Moves(level);
                case "tutorial":
                    return new GamePlay.Tutorial(level);
                case "time":
                    return new GamePlay.TimeAtack(level);
            }

            return null;
        }

        public static completeLevel(complete: boolean= false) {
            this.showProjectLevelsMenu(null, { complete: complete });
        }

        public static looseLevel() {
            this.showProjectLevelsMenu(null, { loose: true });
        }

        public static exitLevel() {
            
            this.showProjectLevelsMenu();
        }

        public static showNextLevel() {
            var nextLevel: Projects.Level = this.projectManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                this.showLevel(nextLevel);
            else
                this.exitLevel();
        }

        public static skipLevel(complete: boolean= false) {
            var currentLevel = this.projectManager.getCurrentLevel();

            this.projectManager.skipLevel(currentLevel);
            this.showProjectLevelsMenu(null, { complete: complete });
        }

        public static showMainMenu() {
            if (this.mainScreen == null)
                this.mainScreen = new Menu.MainMenu();

            this.gameScreen.switchScreen(this.mainScreen);

        }

        public static showTitleScreen() {
            if (!this.titleScreen) this.titleScreen = new Menu.TitleScreen();
            this.gameScreen.switchScreen(this.titleScreen);
        }

        public static replayLevel() {
            var currentLevel = this.projectManager.getCurrentLevel();
            this.showLevel(currentLevel);
        }

        public static completeProjectk(project: Projects.Project) {
            this.gameScreen.switchScreen(this.mainScreen);
        }

        public static endGame() {

        }

        public static showOptions(){
            this.gameScreen.switchScreen(new Menu.OptionsMenu());
        }
        // ---------------------------- license --------------------------------------------------//

        public static isFree():boolean {
            return false;
        }
    }
}