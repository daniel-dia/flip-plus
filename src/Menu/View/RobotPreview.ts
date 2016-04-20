module FlipPlus.Menu.View {

    export class RobotPreview extends PIXI.Container {

        private project: FlipPlus.Levels.BotLevelsSet;
        private percentMask: PIXI.Graphics;

        private fill: PIXI.Sprite;
        private stroke: PIXI.Sprite;
        private completeBot: PIXI.DisplayObject;

        //Constructor
        constructor(project: FlipPlus.Levels.BotLevelsSet) {
            super();
            this.project = project;
            this.createPercentualFill(project);
            this.update();
            this.createHitArea();
        }

        // creates hit area
        private createHitArea() {
            this.hitArea = new PIXI.Rectangle(-768, -900, 1536, 1400);
   
        }

        //create graphics
        private createPercentualFill(project: FlipPlus.Levels.BotLevelsSet){
          
                var size: number = 1000;
                this.fill =   gameui.AssetsManager.getBitmap("workshop/" + project.name + "_fill"  );
                this.stroke = gameui.AssetsManager.getBitmap("workshop/" + project.name + "_stroke");
                
                this.fill.pivot.x = this.stroke.pivot.x = this.fill.width / 2;
                this.fill.pivot.y = this.stroke.pivot.y = this.fill.height;

                this.fill.pivot.x - 25;
                this.fill.pivot.y - 25;

                this.addChild(this.fill);
                this.addChild(this.stroke); 
            
                //mask
                this.percentMask = new PIXI.Graphics();
                this.percentMask.beginFill(0xFFFFFF).drawRect(-size / 2, 0, size, -this.fill.getLocalBounds().height).endFill();
                this.percentMask.scale.y = 0;
                this.percentMask.y = -25;
                this.addChild(this.percentMask);
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

        //update bot preview show
        public update(animate: boolean = false, firstTime = false) {
            
            try {
                if (animate) this.animateBox();
                
                if (firstTime) this.animateBotFillTo();
                
                if (!firstTime || !animate) {
                    if (this.project.UserData.complete)
                        this.createCompletedBot()
                    else
                        this.updateFill();
                }

            } catch (e) { };
        }
        
        // update bot fill based on user data
        private updateFill() {
            this.percentMask.scale.y = this.project.UserData.percent;
        }

        // Animate finishing leve Fill bot with a masked yellow fill
        private animateBotFillTo(color: number= 0xffcc2e) {

            var newValue = this.project.UserData.percent;
           
            createjs.Tween.get(this.percentMask).wait(600).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).wait(500).call(() => {
                if (this.project.UserData.complete) this.animateBotToComplete();
            });
        }
        
        // animate the bot to the complete one
        private animateBotToComplete() {
            this.createCompletedBot();
            this.completeBot.alpha = 0;

            createjs.Tween.get(this.fill).wait(300).to({ alpha: 0 }, 600).call(() => { this.fill.visible = false })
            createjs.Tween.get(this.stroke).wait(300).to({ alpha: 0 }, 600).call(() => { this.stroke.visible = false })
            createjs.Tween.get(this.completeBot).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }).wait(300).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 600, createjs.Ease.quadOut)
            gameui.AudiosManager.playSound("BotComplete");

            Robots.MyBots.playRobotSound(this.project.name,1000);

            this.castNewEffect();
        }

        // animate a box going inside the bot
        private animateBox() {
            //boxShape zoom out to the bot
            var boxShape = new PIXI.Graphics();
            boxShape.beginFill(0xffcc2e).drawRect(-700, -700, 1400, 1400);
            
            this.addChild(boxShape);

            var percent = this.project.UserData.percent;
            var size = this.fill.height;
            var y =  - (size * percent);

            boxShape.y = y;

            createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => {
                this.removeChild(boxShape);

                gameui.AudiosManager.playSound("bot up");
                var fx = new FlipPlus.Effects();
                this.addChild(fx);
                fx.castEffect(0,y, "Bolinhas", 5);
            })
        }

        // show a new glare into the bot
        public castNewEffect() {

            var dark = <PIXI.Sprite>gameui.AssetsManager.getBitmap("dark");
            dark.pivot.x = 50;
            dark.pivot.y = 50; 
            var bgnewbot = <PIXI.Sprite>gameui.AssetsManager.getBitmap("bgnewbot");
            bgnewbot.pivot.x = bgnewbot.getLocalBounds().width / 2;
            bgnewbot.pivot.y = bgnewbot.getLocalBounds().height / 2;
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
 