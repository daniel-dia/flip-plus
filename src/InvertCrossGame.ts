declare var levelsData; 
declare var assetsManifest:Array<any>;
//declare var spriteSheets;

window.onload = function () { InvertCross.InvertCrossaGame.InvertCrossInitilize();};

module InvertCross { 
    
    // Main game Class
    // Controller
    export class InvertCrossaGame extends Game {

        //userData
        public static userData: UserData.ProjectsData;
        public static settings: UserData.Settings;
        public static timersData:   UserData.Timers;
        public static itemsData: UserData.Items;
        public static storyData: UserData.Story;
        public static assetsManager: Gbase.AssetsManager;                       
        //Managers
        public static projectManager: Projects.ProjectManager;
        
        // Screens
        private static titleScreen: Gbase.ScreenState;
        private static projectsMenu: Gbase.ScreenState;
        private static levelsMenu:   Gbase.ScreenState;
        private static levelScreeen: Gbase.ScreenState;

        public static mainScreen: Menu.MainMenu;
        public static optionsMenu: Gbase.ScreenState;
        public static loadingScreen: Menu.Loading;

        // ----------------------------- Initialization -------------------------------------------//


        public static InvertCrossInitilize() {

            //initialize main class
            InvertCrossaGame.initialize();

            //set createJS Parameters
            createjs.DisplayObject.avoidBitmapHitAreaCalculation = true
                       
            //userData
            InvertCrossaGame.userData = new UserData.ProjectsData();
            InvertCrossaGame.settings = new UserData.Settings();
            InvertCrossaGame.itemsData = new UserData.Items();
            InvertCrossaGame.storyData = new UserData.Story();
            InvertCrossaGame.timersData = new UserData.Timers();

            //managers
            InvertCrossaGame.projectManager = new Projects.ProjectManager(levelsData);

            //go to First Screen
            InvertCrossaGame.loadingScreen = new InvertCross.Menu.Loading();
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.loadingScreen);

            InvertCrossaGame.loadingScreen.loaded = () => {
                if (document.URL.toUpperCase().indexOf("CREATOR") > 0) {
                    InvertCrossaGame.screenViewer.switchScreen(new GamePlay.LevelCreator(null, window));
                }
                else
                    InvertCrossaGame.showTitleScreen();
            }

            this.assetsManager = new Gbase.AssetsManager(assetsManifest, spriteSheets);

            //TODO tirar daqui
            if (InvertCrossaGame.itemsData.getItemQuantity("hint") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("hint", 50);

            if (InvertCrossaGame.itemsData.getItemQuantity("skip") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("skip", 5);

            if (InvertCrossaGame.itemsData.getItemQuantity("skip") <= 0)
                InvertCrossaGame.itemsData.setQuantityItem("skip", 5);
        }

        // ----------------------------- Game Methods ---------------------------------------------//
        
        public static showProjectsMenu() {
            InvertCrossaGame.levelScreeen = null;

            if (InvertCrossaGame.projectsMenu == null)
                InvertCrossaGame.projectsMenu = new Menu.ProjectsMenu();

            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.projectsMenu);
        }


        public static showProjectLevelsMenu(project?: Projects.Project, parameters?: any) {

            //verifies the current projet
            if (project == null)
                project = InvertCrossaGame.projectManager.getCurrentProject();
            else
                InvertCrossaGame.projectManager.setCurrentProject(project);

            if (project == null) return;
            
            var projects = InvertCrossaGame.projectManager.getAllProjects()

            //verifies if rebuild is necessary
            if(parameters && parameters.rebuild)
                delete InvertCrossaGame.levelsMenu;
            
            //create a new levels menu, if needed
            if (InvertCrossaGame.levelsMenu==undefined)
                InvertCrossaGame.levelsMenu = new Menu.LevelsMenu();

            //switch screens
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelsMenu,parameters);
        }

        public static showBonus(bonusId: string) {
            var bonusScreen: Bonus.BonusScreen;
            switch (bonusId) {
                case "Bonus1":
                    bonusScreen = new Bonus.BonusBarrel(UserData.Items.itemsNames);
                    break;
                case "Bonus2":
                    bonusScreen = new Bonus.Bonus2(UserData.Items.itemsNames);
                    break;
                case "Bonus3":
                    bonusScreen = new Bonus.Bonus3(UserData.Items.itemsNames);
                    break;
                default:
            }


            //restart time
            this.timersData.setTimer(bonusId, bonusData[bonusId].timeOut);

            InvertCrossaGame.screenViewer.switchScreen(bonusScreen);
        }

        public static showLevel(level: Projects.Level, parameters?: any) {
            InvertCrossaGame.projectManager.setCurrentLevel(level);
            InvertCrossaGame.levelScreeen = InvertCrossaGame.createLevel(level);
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelScreeen, parameters);
        }

        private static createLevel(level: Projects.Level): GamePlay.LevelScreen{

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

        public static completeLevel(complete:boolean=false) {
            this.showProjectLevelsMenu(null, { complete: complete});
        }

        public static looseLevel() {
            this.showProjectLevelsMenu(null, {loose:true });
        }

        public static exitLevel() {
            this.showProjectLevelsMenu();
        }

        public static showNextLevel() {
            var nextLevel: Projects.Level = InvertCrossaGame.projectManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                InvertCrossaGame.showLevel(nextLevel);
            else
                InvertCrossaGame.exitLevel();
        }

        public static skipLevel(complete: boolean= false) {
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();

            InvertCrossaGame.projectManager.skipLevel(currentLevel);
            this.showProjectLevelsMenu(null, { complete: complete });
        }
        
        public static showMainMenu() {
            if (InvertCrossaGame.mainScreen == null)
                InvertCrossaGame.mainScreen = new InvertCross.Menu.MainMenu();

            InvertCross.InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.mainScreen);
            
        }

        public static showTitleScreen() {
            if (!InvertCrossaGame.titleScreen) InvertCrossaGame.titleScreen = new Menu.TitleScreen();
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.titleScreen);
        }

        public static replayLevel() {
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();
            InvertCrossaGame.showLevel(currentLevel);
        }

        public static completeProjectk(project:Projects.Project) {
            InvertCrossaGame.screenViewer.switchScreen(this.mainScreen);
        }

        public static endGame() {

        }

        // ---------------------------- license --------------------------------------------------//

        public static isFree():boolean {
            return false;
        }
    }
}