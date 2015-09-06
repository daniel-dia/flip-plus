﻿module FlipPlus.Menu.View {

    export class RobotPreview extends createjs.Container {

        private project: FlipPlus.Projects.Project;
        private percentMask: createjs.Shape;

        private fill:createjs.DisplayObject;
        private stroke: createjs.DisplayObject;
        private completeBot: createjs.DisplayObject;

        //Constructor
        constructor(project: FlipPlus.Projects.Project) {
            super();

            this.project = project;
            this.createPercentualFill(project);
            this.update();
        }

        //create graphics
        private createPercentualFill(project: FlipPlus.Projects.Project){
          
                var size: number = 1000;
                this.fill = this.addChild(gameui.AssetsManager.getBitmap("workshop/" + project.name + "_fill"));
                this.stroke = this.addChild(gameui.AssetsManager.getBitmap("workshop/" + project.name + "_stroke"));
                 
                this.fill.regX = this.stroke.regX = this.fill.getBounds().width / 2;
                this.fill.regY = this.stroke.regY = this.fill.getBounds().height;

                this.fill.regX - 50;
                this.fill.regY - 50;

                this.addChild(this.fill);
                this.addChild(this.stroke); 
            
                //mask
                this.percentMask = new createjs.Shape();
                this.percentMask.graphics.beginFill("#FFF").drawRect(-size / 2, 0, size, -this.fill.getBounds().height).endFill();
                this.percentMask.scaleY = 0;
                this.percentMask.y = 50;
                this.fill.mask = this.percentMask;
        }

        // shows up the completed bot
        public createCompletedBot() {
            // remove fill and stroke
            this.fill.visible = false;
            this.stroke.visible = false
            this.removeChild(this.fill);
            this.removeChild(this.stroke);
                        
            // if final completed bot does not exist, add it
            if (!this.completeBot) {
                this.completeBot = new libmybots[this.project.name]();
                this.addChild(this.completeBot);
                this.completeBot.y -= 260;
            }
        }

        //update percentage
        public update(animate: boolean= false) {
            try {
                //já acabou de terminar um level
                if (animate) this.animateBotFillTo();

                if (!animate)
                    if (this.project.UserData.complete)
                        this.createCompletedBot()
                    else
                        this.updateFill();
                    
                    

            } catch (e) { };
        }
        
        // update bot fill based on user data
        private updateFill() {
            this.percentMask.scaleY = this.project.UserData.percent;
        }

        //animate finishing level
        private animateBotFillTo(color: string= "#ffcc2e") {

            var newValue = this.project.UserData.percent;

            //boxShape zoom out to the bot
            var boxShape = new createjs.Shape();
            boxShape.graphics.beginFill(color).drawRect(-700, -700, 1400, 1400);
            boxShape.y = -300;
            this.addChild(boxShape);
            createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => { this.removeChild(boxShape); })

           

            createjs.Tween.get(this.percentMask).wait(900).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).wait(500).call(() => {
                if (this.project.UserData.complete) {
                    this.createCompletedBot(); 
                    createjs.Tween.get(this.fill).wait(300).to({ alpha: 0 }, 600).call(() => { this.fill.visible = false })
                    createjs.Tween.get(this.stroke).wait(300).to({ alpha: 0 }, 600).call(() => { this.stroke.visible = false })
                    createjs.Tween.get(this.completeBot).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, createjs.Ease.quadOut)
                    gameui.AudiosManager.playSound("win");
                    this.castNewEffect();
                }
            });
        }



        // show a new glare into the bot
        public castNewEffect() {

            var dark = <createjs.Bitmap>gameui.AssetsManager.getBitmap("dark");
            dark.regX = 50;
            dark.regY = 50; 
            var bgnewbot = <createjs.Bitmap>gameui.AssetsManager.getBitmap("bgnewbot");
            bgnewbot.regX = bgnewbot.getBounds().width / 2;
            bgnewbot.regY = bgnewbot.getBounds().height / 2;
            dark.y = bgnewbot.y = -260

            this.addChildAt(bgnewbot, 0);
            this.addChildAt(dark, 0);

            createjs.Tween.get(dark).
                to({ alpha: 0, scaleX: 0, scaleY: 0 }).
                to({ alpha: 1, scaleX: 50, scaleY: 50 }, 400).
                wait(2600).
                to({ alpha: 0 }, 200).call(() => {
                    this.removeChild(dark); 
                });

            createjs.Tween.get(bgnewbot).
                to({ alpha: 0, scaleX: 0.3, scaleY: 0.3 }).to({ alpha: 1, scaleX: 1.8, scaleY: 1.8 }, 300).to({ alpha: 0, scaleX: 1.6, scaleY: 1.6 }, 3600).
                call(() => {
                   this.removeChild(bgnewbot);
                });
        }
         
    }
}
 