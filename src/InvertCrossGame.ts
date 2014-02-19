///<reference path="../Gbase/Game.ts" />

///<reference path="Projects/ProjectManager.ts" />
///<reference path="Parts/partsManager.ts" />

/// <reference path="userdata/projectsdata.ts" />
/// <reference path="userdata/settingsdata.ts" />
/// <reference path="userdata/storydata.ts" />
/// <reference path="userdata/timersdata.ts" />

/// <reference path="GamePlay/LevelScreen.ts" /> 
/// <reference path="GamePlay/Puzzle.ts" />
/// <reference path="GamePlay/TimeAttack.ts" />
    
/// <reference path="Menu/Loading.ts" />
/// <reference path="Menu/MainMenu.ts" />
/// <reference path="Menu/OptionsMenu.ts" />
/// <reference path="Menu/ProjectsMenu.ts" />
/// <reference path="Menu/LevelsMenu.ts" />

/// <reference path="Assets.ts" />

declare var levelsData; 

window.onload = function () { InvertCross.InvertCrossaGame.InvertCrossInitilize(); };

module InvertCross { 
    
    // Main game Class
    // Controller
    export class InvertCrossaGame extends Game {

        //userData
        public static userData: UserData.ProjectsData;
        public static settings: UserData.SettingsData;
        public static timersData:   UserData.TimersData;
        public static itemsData: UserData.ItensData;
               
        //Managers
        public static projectManager: Projects.ProjectManager;
        public static partsManager: Parts.PartsManager;
        
        // Screens
        private static projectsMenu: Gbase.ScreenState;
        private static levelsMenu:   Gbase.ScreenState;
        private static levelScreeen: Gbase.ScreenState;
        
        
        public static mainScreen: Menu.MainMenu;
        public static optionsMenu: Gbase.ScreenState;

        // ----------------------------- Initialization -------------------------------------------//

        public static loadingScreen: Gbase.ScreenState;

        public static InvertCrossInitilize() {

            //initialize main class
            InvertCrossaGame.initialize();

            //set createJS Parameters
            createjs.DisplayObject.avoidBitmapHitAreaCalculation = true
                       
            //userData
            InvertCrossaGame.userData = new UserData.ProjectsData();
            InvertCrossaGame.settings = new UserData.SettingsData();
            InvertCrossaGame.itemsData = new UserData.ItensData();

            //managers
            InvertCrossaGame.partsManager = new Parts.PartsManager();
            InvertCrossaGame.projectManager = new Projects.ProjectManager(levelsData);
            
            //userData
            //TODO baguncado.. essa classe esta relacionada com projectsManager, que eh iniciado depois.
            //o metodo initialize all timers seria melhor que nao estivesse lah.
            InvertCrossaGame.timersData = new UserData.TimersData();

            //go to First Screen
            InvertCrossaGame.loadingScreen = new InvertCross.Menu.Loading();
            InvertCross.InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.loadingScreen);

            //TODO tirar daqui
            //InvertCrossaGame.partsManager.addParts(10);
            if(InvertCrossaGame.itemsData.getItemQuantity("hint") == 0)
                InvertCrossaGame.itemsData.saveQuantityItem("hint", 5);
        }

        // ----------------------------- Game Methods ---------------------------------------------//
        
        public static showProjectsMenu() {
            InvertCrossaGame.levelScreeen = null;

            if (InvertCrossaGame.projectsMenu == null)
                InvertCrossaGame.projectsMenu = new Menu.ProjectsMenu();

            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.projectsMenu);
        }

        public static completeLevel() {
            var t = new Transition;
            t.type = "fade";
            t.time = 500;
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelsMenu, {complete:true}, t);
        }

        public static showProjectLevelsMenu(project?: Projects.Project, parameters?: any) {

            if (project == null) project = InvertCrossaGame.projectManager.getCurrentProject();
            else InvertCrossaGame.projectManager.setCurrentProject(project);
            if (project == null) return;

            InvertCrossaGame.levelsMenu = new Menu.LevelsMenu(InvertCrossaGame.projectManager.getAllProjects());
            InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelsMenu,parameters);
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
                case "moves": case "combo":
                    return new GamePlay.Moves(level);
                case "tutorial":
                    return new GamePlay.Tutorial(level);
                case "time":
                    return new GamePlay.TimeAtack(level);
                }

            return null;
        }

        public static exitLevel(loose: boolean= false) {

            InvertCrossaGame.levelScreeen = null;
            if (InvertCrossaGame.levelsMenu != null)
                InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.levelsMenu, {loose:loose});
            else
                InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.mainScreen);
        }

        public static showNextLevel() {
            var nextLevel: Projects.Level = InvertCrossaGame.projectManager.getNextLevel();

            //show level or end level
            if (nextLevel != null)
                InvertCrossaGame.showLevel(nextLevel);
            else
                InvertCrossaGame.exitLevel();
        }

        public static skipLevel() {
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();

            InvertCrossaGame.projectManager.skipLevel(currentLevel);
            this.showNextLevel();
        }
        
        public static showMainMenu() {
            if (InvertCrossaGame.mainScreen == null)
                InvertCrossaGame.mainScreen = new InvertCross.Menu.MainMenu();

            InvertCross.InvertCrossaGame.screenViewer.switchScreen(InvertCrossaGame.mainScreen);
            
        }

        public static replayLevel() {
            var currentLevel = InvertCrossaGame.projectManager.getCurrentLevel();
            InvertCrossaGame.showLevel(currentLevel);
        }

        public static completeProject(project:Projects.Project) {
            InvertCrossaGame.screenViewer.switchScreen(this.mainScreen);
            this.mainScreen.openRobot(project.name);
        }

        public static endGame() {

        }

        // ---------------------------- license --------------------------------------------------//

        public static isFree():boolean {
            return false;
        }
    }
}