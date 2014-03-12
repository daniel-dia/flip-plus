module InvertCross.Menu.View {

    export class RobotPreview extends createjs.Container {

        private project: InvertCross.Projects.Project;
        private percentMask: createjs.Shape;

        private fill:createjs.DisplayObject;
        private stroke: createjs.DisplayObject;
        private complete: createjs.DisplayObject;


        //Constructor
        constructor(project: InvertCross.Projects.Project) {
            super();

            this.project = project;
            this.createGraphics(project);
            this.update();
        }

        //create graphics
        private createGraphics(project: InvertCross.Projects.Project) {
            var size: number = 1000;
            this.fill = this.addChild(Assets.getImage("myBots/" + project.name + "_fill"));
            this.stroke = this.addChild(Assets.getImage("myBots/" + project.name + "_stroke"));
            this.complete = this.addChild(Assets.getImage("myBots/" + project.name));

            this.fill.regX = this.complete.regX = this.stroke.regX = this.fill.getBounds().width / 2;
            this.fill.regY = this.complete.regY =this.stroke.regY = this.fill.getBounds().height;

            this.addChild(this.fill);
            this.addChild(this.stroke);
            this.addChild(this.complete);
            this.complete.visible = false;

            //mask
            this.percentMask = new createjs.Shape();
            this.percentMask.graphics.beginFill("#FFF").drawRect(-size / 2, 0, size, - this.fill.getBounds().height).endFill();
            this.percentMask.scaleY = 0;
            this.fill.mask = this.percentMask;

        }

        //update percentage
        public update(complete: boolean= false) {

            if (!complete)
                if (this.project.UserData.complete) {
                    this.fill.visible = false;
                    this.stroke.visible = false;
                    this.complete.visible = true;
                }
                else
                    this.percentMask.scaleY = this.project.UserData.percent;
            else
                this.animateLevelComplete();


        }

        
        //animate
        public animateLevelComplete(color: string= "#ffcc2e") {

            var newValue = this.project.UserData.percent;

            //boxShape zoom out to the bot
            var boxShape = new createjs.Shape();
            boxShape.graphics.beginFill(color).drawRect(-700, -700, 1400, 1400);
            boxShape.y = -300;
            this.addChild(boxShape);
            createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => { this.removeChild(boxShape); })

            createjs.Tween.get(this.percentMask).wait(600).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut).call(() => {
                if (this.project.UserData.complete) {
                    this.complete.alpha = 0;
                    this.complete.visible = true;
                    createjs.Tween.get(this.fill).wait(300).to({ alpha: 0 }, 600).call(() => { this.fill.visible = false })
                    createjs.Tween.get(this.stroke).wait(300).to({ alpha: 0 }, 600).call(() => { this.stroke.visible = false})
                    createjs.Tween.get(this.complete).wait(300).to({alpha:1}, 600)
                }
            });


        }


    }
}
 