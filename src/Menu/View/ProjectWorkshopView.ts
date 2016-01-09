module FlipPlus.Menu.View {

    // Class
    export class ProjectWorkshopView extends Page {

        private project: Levels.BotLevelsSet;

        private levelGrid: View.LevelGrid;
        private statusArea: PIXI.Container;
        private starsIndicator: View.ProjectStarsIndicator;
        private robotPreview: View.RobotPreview;
        private levelsMahine: PIXI.Container;


		private headerY :number = 0;
		private footerY: number = 0;

        // Constructor
        constructor(project: Levels.BotLevelsSet) {
            super();
            this.project = project;
            this.name = project.name;
			
            this.onShowPage = () => {
 
				//add levels information
				this.addObjects(project);
				//activate layer
				this.activate();

				this.redim(this.headerY, this.footerY);
			}

			this.onHidePage = () => {
				this.removeChildren();
			}

        }

        //--------------------- Initialization ---------------------
 

        private addObjects(project: Levels.BotLevelsSet) {
          
            //add Project levels
            this.addProjectMachine(project);

            //add project Name
            this.addStatus(project);

            //add robot preview
            this.addRobotPreview(project);
        }

        //create projetview control
        private addRobotPreview(project: Levels.BotLevelsSet) {
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
            bg.y = 0//150;
            bg.x = defaultWidth/ 2;
            bg.scale.x = 2;
            bg.pivot.x = bg.getLocalBounds().width/2;
            this.statusArea.addChild(bg);

            var l: PIXI.extras.BitmapText = gameui.AssetsManager.getBitmapText(project.nickName.toUpperCase(), "fontWhite");
            l.y = 20;//250;
            l.pivot.x = l.getLocalBounds().width / 2;
            l.x = defaultWidth / 2;
            this.statusArea.addChild(l);

            this.addChild(this.statusArea);
        }

        //Adds level thumbs to the scene
        private addProjectMachine(project: Levels.BotLevelsSet) {

            var levelMachine = new PIXI.Container;
            
            this.addChild(levelMachine);
            this.levelsMahine = levelMachine;

            //add MachineBg
            var baseFases = gameui.AssetsManager.getBitmap("workshop/basefases")
            baseFases.y = - 741;
            levelMachine.addChild(baseFases);

            //Add Stars
            this.starsIndicator = new View.ProjectStarsIndicator(project);
            this.starsIndicator.x = 1115;
            this.starsIndicator.y = 1334 - 2048;
            levelMachine.addChild(this.starsIndicator);

            if ((!FlipPlusGame.isFree() && project.free) || FlipPlusGame.isFree()) {

                if (project.UserData.unlocked) {
                    //Add Level Thumbs
                    this.levelGrid = new Menu.View.LevelGrid(project);
                    this.levelGrid.addEventListener("levelClick", (e:any) => { 
                        this.emit("levelClick", {level: e.level, parameters: e.parameters }); });
                    this.levelGrid.x = 180;
                    this.levelGrid.y = 1538 - 2048;
                    levelMachine.addChild(this.levelGrid);

                }
                else {
                    var text = gameui.AssetsManager.getBitmapText(StringResources.ws_Locked, "fontBlue");
                    text.pivot.x = text.getLocalBounds().width / 2;
                    text.y = 1738 - 2048;
                    text.x = defaultWidth / 2;
                    levelMachine.addChild(text);
                }
            } else {
                //TODO mudar o nome disso.
                var text = gameui.AssetsManager.getBitmapText(StringResources.ws_NotFree, "fontBlue"); 
                text.pivot.x = text.getLocalBounds().width / 2;
                text.y = 1738 - 2048;
                text.x = defaultWidth / 2;
                levelMachine.addChild(text);
            }

         

        }

        //-Animation------------------------------------------------------------

        public setRelativePos(pos: number) {
            this.robotPreview.x = this.statusArea.x= -pos *0.35 + defaultWidth/2;
        }

		//--Behaviour-----------------------------------------------------------

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

			if (this.levelsMahine) this.levelsMahine.y = footerY;
            if (this.statusArea) this.statusArea.y = headerY;
        }

        public activate(parameters?: any) {

            var complete = false;
            var direction = -1;

            if (parameters) {
                if (parameters.complete)  complete  = parameters.complete;
                if (parameters.direction) direction = parameters.direction;
            }
            
            if (this.levelGrid) this.levelGrid.updateUserData();

            if (this.starsIndicator) this.starsIndicator.updateProjectInfo();
			if (this.robotPreview) this.robotPreview.update(complete);
            //this.animateIn(complete, direction);
        }
    }
}