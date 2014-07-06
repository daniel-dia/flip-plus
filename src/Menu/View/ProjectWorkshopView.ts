module FlipPlus.Menu.View {

    // Class
    export class ProjectWorkshopView extends createjs.Container {

        private project: Projects.Project;

        private levelGrid: View.LevelGrid;
        private statusArea: createjs.Container;
        private starsIndicator: View.ProjectStarsIndicator;
        private robotPreview: View.RobotPreview;
        private levelsMahine: createjs.Container;

        // Constructor
        constructor(project: Projects.Project) {
            super();
            this.project = project;
            this.name = project.name;

            //add hitArea
            this.addHitArea();

            //add levels information
            this.addObjects(project);

        }

        //--------------------- Initialization ---------------------

        private addHitArea(){
            var hit = new createjs.Container;
            hit.hitArea = (new createjs.Shape(new createjs.Graphics().beginFill("red").drawRect(0, 0, DefaultWidth, DefaultHeight)));
            this.addChild(hit);
        }

        private addObjects(project: Projects.Project) {
          
            //add Project levels
            this.addProjectMachine(project);

            //add project Name
            this.addStatus(project);

            //add robot preview
            this.addRobotPreview(project);

        }

        //create projetview control
        private addRobotPreview(project: Projects.Project) {

            this.robotPreview = new View.RobotPreview(project);

            this.robotPreview.x = DefaultWidth / 2;
            this.robotPreview.y = 1100;
            this.robotPreview.update();
            this.addChild(this.robotPreview);
        }

        //Adds RobotName
        private addStatus(project: Projects.Project) {
            this.statusArea = new createjs.Container();
            this.statusArea.regX = this.statusArea.x = DefaultWidth / 2;
            var bg = gameui.AssetsManager.getBitmap("partshud");
            bg.y = 00//150;
            bg.x = DefaultWidth/ 2;
            bg.scaleX = 2;
            bg.regX = bg.getBounds().width/2;
            this.statusArea.addChild(bg);

            var l: createjs.Text = new createjs.Text(project.nickName.toUpperCase(), defaultFontFamilyStrong, defaultFontColor);
            l.y = 0;//250;
            l.textAlign = "center";
            l.textBaseline = "top";
            l.x = DefaultWidth / 2;
            this.statusArea.addChild(l);

            this.addChild(this.statusArea);

            this.statusArea.mouseEnabled = false;
        }

        //Adds level thumbs to the scene
        private addProjectMachine(project: Projects.Project) {

            var levelMachine = new createjs.Container;
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
                    this.levelGrid.addEventListener("levelClick", (e: createjs.Event) => { this.dispatchEvent("levelClick", e.target); });
                    this.levelGrid.x = 180;
                    this.levelGrid.y = 1538 - 2048;
                    levelMachine.addChild(this.levelGrid);

                }
                else {
                    var text = new createjs.Text(stringResources.ws_Locked, defaultFontFamilyStrong, defaultFontColor);
                    text.textAlign = "center";
                    text.y = 1738 - 2048;
                    text.x = DefaultWidth / 2;
                    levelMachine.addChild(text);
                }
            } else {
                //TODO mudar o nome disso.
                var text = new createjs.Text(stringResources.ws_NotFree, defaultFontFamilyStrong, defaultFontColor);
                text.textAlign = "center";
                text.y = 1738 - 2048;
                text.x = DefaultWidth / 2;
                levelMachine.addChild(text);
            }

        }

        //-Animation------------------------------------------------------------

        public setRelativePos(pos: number) {
            this.robotPreview.x = this.statusArea.x= -pos *0.35 + DefaultWidth/2;
        }

        /*
        private animateIn(completeLevel: boolean= false, direction: number= -1) {

            //animate status and machihine
            this.levelsMahine.y = 800;
            this.statusArea.scaleX = 0;
            createjs.Tween.get(this.levelsMahine).to({ y: 0 }, 400, createjs.Ease.quadOut)
            createjs.Tween.get(this.statusArea).to({ scaleX: 1 }, 200, createjs.Ease.quadOut)

            //animate level complete
            if (completeLevel) this.robotPreview.animateLevelComplete();

            else {
                //animate Robot
                this.robotPreview.set({ x: -direction * DefaultWidth });
                createjs.Tween.get(this.robotPreview).to({ x: DefaultWidth / 2 }, 500, createjs.Ease.quadOut)
            }
        }

        private animateOut(call, direction: number= -1) {

            //animate machie
            createjs.Tween.get(this.levelsMahine).to({ y: 800 }, 200, createjs.Ease.quadIn).call(call)

            //animate name and button
            createjs.Tween.get(this.statusArea).wait(100).to({ scaleX: 0 }, 100, createjs.Ease.quadIn)

            //animate robot
            createjs.Tween.get(this.robotPreview).to({ x: direction * DefaultWidth }, 500, createjs.Ease.quadIn)
        }
        */

        //--Behaviour-----------------------------------------------------------

        //open a level
        private openLevel(event: createjs.Event) {

            var level: Projects.Level = <Projects.Level>event.target['level'];
            var parameters = event.target['parameters']

            if (level != null)
                if (level.userdata.unlocked)
                    FlipPlusGame.showLevel(level, parameters);
        }

        public redim(headerY: number, footerY: number) {
            this.levelsMahine.y = footerY;
            this.statusArea.y = headerY;

        }

        public activate(parameters?: any) {

            var complete = false;
            var direction = -1;

            if (parameters) {
                if (parameters.complete) complete = parameters.complete;
                if (parameters.direction) direction = parameters.direction;
            }
            
            if (this.levelGrid) this.levelGrid.updateUserData();

            this.starsIndicator.updateProjectInfo();
            this.robotPreview.update(complete);
            //this.animateIn(complete, direction);
        }
    }
}