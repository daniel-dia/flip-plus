/// <reference path="../../lib/easeljs.d.ts" />

declare var lib: any;

module InvertCross.Robots {

    // Controller Class
    export class MyBots extends createjs.Container {

        public myBots: createjs.Container;
      
        //----------------------initialization ---------------------------

        constructor() {

            super();
            this.initializeGraphics();
            this.initializeNames();

            ////TODO, arrumar essa gambiarra sem vergonha                        
            //setTimeout(() => { this.initializeUserFeedback(); },100);
        }

        //loads and add lobby graphics to the view
        private initializeGraphics() {
            this.myBots = new lib.MyBots();
            this.addChild(this.myBots);
        }

        //add names for each robot instance in lobby (toolkit plugin does not make it automatically)
        private initializeNames() {
            var projects = InvertCrossaGame.projectManager.getAllProjects();

            for (var p = 0; p < projects.length; p++) {
                var robotName = projects[p].name;
                var robotMC = this.myBots[robotName];
                if (robotMC != null) robotMC.name = robotName;
            }

            //this.myBots["main"].name = "main";
        }

        //adds a user feedback for click action
        private initializeUserFeedback() {
            InvertCrossaGame.stage.update();
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
            var project: Projects.Project = InvertCrossaGame.projectManager.getProjectByName(robotMc.name);

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
            var projects = InvertCrossaGame.projectManager.getFinihedProjects();

            //set all robots to start position
            this.hideAllRobots();

            //set idle to the finished projects
            for (var r: number = 0; r < projects.length; r++)
                this.showRobot(projects[r].name);
        }

        //updates revenuesTimers
        //NOTE, talvez isso nao deva ficar aqui
        private checkRevenueTimers() {

            //get projects
            var projects = InvertCrossaGame.projectManager.getFinihedProjects();

            //if is null create a timer
            //TODO, deve criar o timer quando conclui o projeto.

            //set idle to the finished projects 
            for (var r in projects) 
                //if robot has parts, set it alert
                if (InvertCrossaGame.timersData.getTimer(projects[r].name) < 0) 
                    this.alertRobot(projects[r].name);
        }

        //hide All Robots from Screen
        private hideAllRobots() {
            for (var c = 0; c < this.myBots.getNumChildren(); c++)
                (<createjs.MovieClip>this.myBots.getChildAt(c)).visible = false;
           //
           // this.showRobot("main");
        }

        //show a robot on screen by name
        private showRobot(robotName: string) {
            var robotMC = this.myBots[robotName];
            if (robotMC != null) robotMC.visible = true;
        }

        //play robot opening animation
        public openRobot(robotName: string) {
            var robotMC = this.myBots[robotName];
           //if (robotMC != null)
           //    robotMC.gotoAndPlay("opening");
        }

        //play robot alert animation
        public alertRobot(robotName: string) {
            var robotMC = this.myBots[robotName];
            //if (robotMC != null)
            //    robotMC.gotoAndPlay("alert");
        }
    }
}