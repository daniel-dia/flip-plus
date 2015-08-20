declare var lib_bots: any;

module FlipPlus.Robots {

    // Controller Class
    export class MyBots extends createjs.Container {

        public myBots: createjs.Container;
        private projectManager: Projects.ProjectManager;
        private popup: Menu.View.PopupBot;

        //----------------------initialization ---------------------------

        constructor(projectManager:Projects.ProjectManager) {

            super();
            this.projectManager = projectManager;
            this.initializeGraphics();
            this.initializeNames();
        }

        //loads and add lobby graphics to the view
        private initializeGraphics() {
            this.myBots = new lib_bots.NewBotsLobby();
            this.addChild(this.myBots);

            this.popup = new Menu.View.PopupBot();
            this.addChild(this.popup);
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
            for (var c = 0; c < this.myBots.getNumChildren(); c++) {
                (<createjs.MovieClip>this.myBots.getChildAt(c)).visible = false;
                (<createjs.MovieClip>this.myBots.getChildAt(c)).stop();
            }
        }

        //show a robot on screen by name
        private showRobot(botId: string) {
            var robotMC = this.myBots[botId];
            if (robotMC != null) {
                robotMC.visible = true;
                this.castNewEffect(robotMC);
                robotMC.play();
            }
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

                var bgnewbot = <createjs.Bitmap>gameui.AssetsManager.getBitmap("bgnewbot");
                bgnewbot.regX = bgnewbot.getBounds().width / 2;
                bgnewbot.regY = bgnewbot.getBounds().height / 2;
                bgnewbot.x = robotMC.x ;
                bgnewbot.y = robotMC.y;
                bgnewbot.visible = true;
                this.addChildAt(bgnewbot,0);

                createjs.Tween.get(bgnewbot).
                    to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).    
                    to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).    
                    to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).    
                    to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 200).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 200).    
                    call(() => { this.removeChild(bgnewbot) });
            }
        }

        public playIntroPartA() {
            this.hideAllRobots();
            this.showRobot("Bot01a");
            this.popup.showBotText(stringResources.it_text1, 6000, 1000)
        }

        public playIntroPartB() {
            this.hideAllRobots();
            this.showRobot("Bot01b");
            this.popup.showBotText(stringResources.it_text2,6000,1000);
        }

        public clear() {
            this.hideAllRobots();
        }
    }
}