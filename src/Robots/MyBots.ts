declare var lib: any;

module FlipPlus.Robots {

    // Controller Class
    export class MyBots extends createjs.Container {

        public myBots: createjs.Container;
        private projectManager: Projects.ProjectManager;

        //----------------------initialization ---------------------------

        constructor(projectManager:Projects.ProjectManager) {

            super();
            this.projectManager = projectManager;
            this.initializeGraphics();
            this.initializeNames();

            FlipPlusGame.projectManager.undoLevel(levelsData[1].levels[9]);
        }

        //loads and add lobby graphics to the view
        private initializeGraphics() {
            this.myBots = new lib.MyBots();
            this.addChild(this.myBots);
        }

        //add names for each robot instance in lobby (toolkit plugin does not make it automatically)
        private initializeNames() {
            var projects = this.projectManager.getAllProjects();
            for (var p = 0; p < projects.length; p++) {
                var robotName = projects[p].name;
                var robotMC = this.myBots[robotName];
                if (robotMC != null) robotMC.name = robotName;
            }
        }

        //adds a user feedback for click action
        private initializeUserFeedback() {
            FlipPlusGame.gameScreen.stage.update();
            for (var c = 0; c < this.myBots.getNumChildren(); c++) {
                var robot = <createjs.MovieClip>this.myBots.getChildAt(c);;
                robot.addEventListener("click", (e: createjs.MouseEvent) => {this.userfeedback(e); });
                  
                var hit = new createjs.Shape();
                hit.graphics.beginFill("#000").drawRect(
                    robot.getBounds().x,
                    robot.getBounds().y,
                    robot.getBounds().width,
                    robot.getBounds().height
                    );
               
                robot.hitArea = hit;
            }
        }

        //User action feedback to user touch
        private userfeedback(event: createjs.MouseEvent) {

            var robotMc = <createjs.MovieClip>event.currentTarget;
            var project: Projects.Project = this.projectManager.getProjectByName(robotMc.name);

            //verifies if robot is ready or have parts ready
            if (project && project.UserData.complete || !project) {
                robotMc.gotoAndPlay("touch");
                this.dispatchEvent("robot",robotMc.name);  
            }
        }

        //-----------------------------------------------------------

        //Updates Robot lobby idle behaviour
        public update() {

            //get Robots
            var projects = this.projectManager.getFinihedProjects();

            //set all robots to start position
            this.hideAllRobots();

            //set idle to the finished projects
            for (var r: number = 0; r < projects.length; r++)
                this.showRobot(projects[r].name);
        }

        //hide All Robots from Screen
        private hideAllRobots() {
            for (var c = 0; c < this.myBots.getNumChildren(); c++)
                (<createjs.MovieClip>this.myBots.getChildAt(c)).visible = false;
           //
           // this.showRobot("main");
        }

        //show a robot on screen by name
        private showRobot(botId: string) {
            var robotMC = this.myBots[botId];
            if (robotMC != null) {
                robotMC.visible = true;
                this.castNewEffect(robotMC);
            }
        }

        //play robot opening animation
        public openRobot(botId: string) {
            var robotMC = this.myBots[botId];
           //if (robotMC != null)
           //    robotMC.gotoAndPlay("opening");
        }

        //play robot alert animation
        public alertRobot(botId: string) {
            var robotMC = this.myBots[botId];
            //if (robotMC != null)
            //    robotMC.gotoAndPlay("alert");
        }

        // show a new glare into the bot
        public castNewEffect(botId: string) {

            var robotMC = this.myBots[botId];
            if (robotMC != null) {

                var bgnewbot1 = <createjs.Bitmap>gameui.AssetsManager.getBitmap("bgnewbot");
                bgnewbot1.regX = bgnewbot1.image.width / 2;
                bgnewbot1.regY = bgnewbot1.image.height / 2;
                this.addChild(bgnewbot1);
                bgnewbot1.visible = false;
                bgnewbot1.x = robotMC.x;
                bgnewbot1.y = robotMC.y;
                bgnewbot1.visible = true;

                this.addChild(this.myBots);

                createjs.Tween.get(bgnewbot1).
                    to({ alpha: 0, scaleX: 1, scaleY: 1, rotation: 0 }).
                    to({ alpha: 1, scaleX: 1, scaleY: 1, rotation: 45 }, 1000).
                    to({ alpha: 1, scaleX: 1, scaleY: 1, rotation: 45 + 90 }, 2000).
                    to({ alpha: 0, scaleX: 1, scaleY: 1, rotation: 45 + 90 + 45 }, 1000).call(() => { this.removeChild(bgnewbot1) });
            }


        }
    }
}