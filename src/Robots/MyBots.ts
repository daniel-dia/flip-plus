declare var libmybots: any;

module FlipPlus.Robots {

    // Controller Class
    export class MyBots extends PIXI.Container {

        public myBots: PIXI.Container;
        private projectManager: Levels.LevelsManager;
        private popup: Menu.View.PopupBot;

        //----------------------initialization ---------------------------

        constructor(projectManager:Levels.LevelsManager) {

            super();
            this.projectManager = projectManager;
            this.initializeGraphics();
            this.initializeNames();
            this.initializeUserFeedback();
        }

        // play bot sound
        public static playRobotSound(botId: string, delay:number=0) {
            if (!botId) return;

            var id = parseInt(botId.slice(-2));
            if (id < 8)
                var filename = "Emotional Robot Talk " + Math.ceil(Math.random() * 15);
            else
                var filename = "Talking Robot-" + Math.ceil(Math.random() * 19);

            gameui.AudiosManager.playSound(filename, true, delay);
        }

        //loads and add lobby graphics to the view
        private initializeGraphics() {
            this.myBots = new libmybots.NewBotsLobby();
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
            ///Check FlipPlusGame.gameScreen.stage.update();

            for (var c = 0; c < this.myBots.children.length; c++) {
                var robot = <PIXI.extras.MovieClip>this.myBots.getChildAt(c);;
                robot.addEventListener("click", (e: PIXI.interaction.InteractionEvent) => { this.userTouch(e); });
                robot.addEventListener("tap", (e: PIXI.interaction.InteractionEvent)   => { this.userTouch(e); });

                var hit = robot.getLocalBounds();
                
                robot.interactive = true
            }
        }

        //User action feedback to user touch
        private userTouch(event: PIXI.interaction.InteractionEvent) {
            var bot = <PIXI.extras.MovieClip>event.target;
            this.animateBot(bot.name);
        }

        public animateBot(botName:string) {

            var project: Levels.BotLevelsSet = this.projectManager.getProjectByName(botName);
            var robotMc: PIXI.DisplayObject = this.myBots[botName]
            if (!robotMc) return;

            if (createjs.Tween.hasActiveTweens(robotMc)) return;
            //verifies if robot is ready or have parts ready
            if (project && project.UserData.complete || !project) {

                var px = robotMc.scale.x;
                var py = robotMc.scale.y;
                var ot = robotMc.y;

                this.emit("robot", robotMc.name);
                if (!robotMc.name) return;

                // play bot sound
                Robots.MyBots.playRobotSound(robotMc.name);

                // animate bot
                createjs.Tween.get(robotMc)
                    .to({ scaleX: px * 1.1, scaleY: py * 0.9 }, 100)
                    .to({ scaleX: px, scaleY: py }, 1000, createjs.Ease.elasticOut)
                createjs.Tween.get(robotMc)
                    .to({ y: ot - 50 }, 100, createjs.Ease.quadOut)
                    .to({ y: ot }, 1000, createjs.Ease.bounceOut)

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
            for (var c = 0; c < this.myBots.children.length; c++) {
                (<PIXI.extras.MovieClip>this.myBots.getChildAt(c)).visible = false;
                (<PIXI.extras.MovieClip>this.myBots.getChildAt(c)).stop();
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
        }

        // show a new glare into the bot
        public castNewEffect(botId: string) {

            var robotMC = this.myBots[botId];
            if (robotMC != null) {

                var bgnewbot = <PIXI.Sprite>gameui.AssetsManager.getBitmap("bgnewbot");
                bgnewbot.pivot.x = bgnewbot.getLocalBounds().width / 2;
                bgnewbot.pivot.y = bgnewbot.getLocalBounds().height / 2;
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
            FlipPlusGame.mainScreen.terminal.setText(StringResources.it_text1, 60000);
            //this.popup.showBotText(StringResources.it_text1, 6000, 1000)
        }

        public playIntroPartB() {
            this.hideAllRobots();
            this.showRobot("Bot01b");
            FlipPlusGame.mainScreen.terminal.setText(StringResources.it_text2,60000);
            //this.popup.showBotText(StringResources.it_text2,6000,1000);
        }

        public clear() {
            this.hideAllRobots();
        }
    }
}