module FlipPlus.Menu.View {

    // Class
    export class ProjectWorkshopView extends Page {

        private project: Levels.BotLevelsSet;

        private levelGrid: View.LevelGrid;
        private statusArea: PIXI.Container;
        private starsIndicator: View.ProjectStarsIndicator;
        private robotPreview: View.RobotPreview;
        private levelsMachine: PIXI.Container;

        private objectsAdded: boolean = false;
        private headerY: number = 0;
        private footerY: number = 0;
        private titleText: PIXI.extras.BitmapText;
        private levelMachine: PIXI.Container;

        
        //# region Initialization 
        
        // Constructor
        constructor(project: Levels.BotLevelsSet) {
            super();
            this.project = project;
            this.name = project.name;

            this.onShowPage = () => {
                
                // add levels information
                this.addObjects(project);
                this.activate();

                // activate layer
                if (this.levelGrid) this.levelGrid.updateUserData();
                 
                this.redim(this.headerY, this.footerY);
            }

            this.onHidePage = () => {
                this.removeChildren();
            }
        }
 
        // Adds Object to scene
        private addObjects(project: Levels.BotLevelsSet) {

            if (this.objectsAdded) return;
            this.objectsAdded = true;

            // add Project levels
            this.addProjectMachine(project);

            // add project Name
            this.addStatus(project);

            // add robot preview
            this.addRobotPreview(project);
        }

        //create projetview control
        private addRobotPreview(project: Levels.BotLevelsSet) {

            // only show unlocked projects
            this.robotPreview = new View.RobotPreview(project);
            this.robotPreview.x = defaultWidth / 2;
            this.robotPreview.y = 1100;
            this.robotPreview.update();
            this.addChild(this.robotPreview);
        }

        //Adds RobotName
        private addStatus(project: Levels.BotLevelsSet) {
            this.statusArea = new PIXI.Container();
            this.statusArea.pivot.x = this.statusArea.x = defaultWidth / 2;
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.y = 0;
            bg.x = defaultWidth / 2;
            bg.scale.x = 2;
            bg.pivot.x = bg.getLocalBounds().width / 2;
            this.statusArea.addChild(bg);
                       
            this.titleText  = gameui.AssetsManager.getBitmapText("?", "fontWhite");
            this.titleText.y = 20;
            this.titleText.x = defaultWidth / 2;
            this.statusArea.addChild(this.titleText);
            this.titleText.pivot.x = this.titleText.textWidth / 2; 

            this.addChild(this.statusArea);
        }

        //Adds level thumbs to the scene
        private addProjectMachine(project: Levels.BotLevelsSet) {

            this.levelMachine = new PIXI.Container;

            this.addChild(this.levelMachine);
            this.levelsMachine = this.levelMachine;

            // add Machine background
            var baseFases = gameui.AssetsManager.getBitmap("workshop/basefases")
            baseFases.y = -741;
            this.levelMachine.addChild(baseFases);
             
            // Add Stars
            this.starsIndicator = new View.ProjectStarsIndicator(project);
            this.starsIndicator.x = 1115;
            this.starsIndicator.y = 1334 - 2048;
            this.levelMachine.addChild(this.starsIndicator);

            // add grid
            this.addLevelGrid();
        }

        // Add Level Thumbs
        private addLevelGrid() {
            this.levelGrid = new Menu.View.LevelGrid(this.project);

            this.levelGrid.addEventListener("levelClick", (e: any) => {
                this.emit("levelClick", { level: e.level, parameters: e.parameters });
            });

            this.levelGrid.x = 180;
            this.levelGrid.y = 1538 - 2048;
            this.levelMachine.addChild(this.levelGrid);
        }

        // update botTitle 
        private updateBotTitle() {
            if (!this.titleText) return;

            if (this.project.UserData.unlocked)
                this.titleText.text = this.project.nickName.toUpperCase();
            else
                this.titleText.text = "?";

            this.titleText.pivot.x = this.titleText.textWidth / 2; 
        }

        // #end region

        // #region Animation 
        
        public setRelativePos(pos: number) {
            this.robotPreview.x = this.statusArea.x = -pos * 0.35 + defaultWidth / 2;
        }

        // #end region

        // #region Behaviour 
       
        //open a level

        private openLevel(event: PIXI.interaction.InteractionEvent) {

            var level: Levels.Level = <Levels.Level>event.target['level'];
            var parameters = event.target['parameters']

            if (level != null)
                if (level.userdata.unlocked)
                    FlipPlusGame.showLevel(level, parameters);
        }

        public redim(headerY: number, footerY: number) {
            this.headerY = headerY;
            this.footerY = footerY;

            if (this.levelsMachine) this.levelsMachine.y = footerY;
            if (this.statusArea) this.statusArea.y = headerY;
        }

        public activate(parameters?: any) {

            var complete = false;
            var direction = -1;
            var freeze = 0;
            var firstTime = false;
            var silent = false;

            if (parameters) {
                if (parameters.complete) complete = parameters.complete;
                if (parameters.direction) direction = parameters.direction;
                if (parameters.freeze) freeze = parameters.freeze;
                if (parameters.firstTime) firstTime = parameters.firstTime;
                if (parameters.silent) silent = parameters.silent;
            }

            if (this.levelGrid)         this.levelGrid.updateUserData();
            if (this.starsIndicator)    this.starsIndicator.updateProjectInfo(!silent);
            if (this.robotPreview)      this.robotPreview.update(complete, firstTime);

            this.updateBotTitle();
        }

        // #end region
    }
}