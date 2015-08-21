module FlipPlus.Menu.View {

    export class RobotPreview extends createjs.Container {

        private project: FlipPlus.Projects.Project;
        private percentMask: createjs.Shape;

        private fill:createjs.DisplayObject;
        private stroke: createjs.DisplayObject; 
        
        //Constructor
        constructor(project: FlipPlus.Projects.Project) {
            super();

            this.project = project;
            this.createGraphics(project);
            this.update();
        }

        //create graphics
        private createGraphics(project: FlipPlus.Projects.Project){
          
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
                this.percentMask.graphics.beginFill("#FFF").drawRect(
                    -size / 2, 0, size,
                    -this.fill.getBounds().height)
                    .endFill();
                this.percentMask.scaleY = 0;
                this.percentMask.y = 50;
                this.fill.mask = this.percentMask;
        }

        //update percentage
        public update(complete: boolean= false) {
            try {
                if (!complete)
                    if (this.project.UserData.complete) {
                        this.fill.visible = false;
                        this.stroke.visible = false; 
                    }
                    else
                        this.percentMask.scaleY = this.project.UserData.percent;
                else
                    this.animateLevelComplete();
            } catch (e) { };
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
                     
                    createjs.Tween.get(this.fill).wait(300).to({ alpha: 0 }, 600).call(() => { this.fill.visible = false })
                    createjs.Tween.get(this.stroke).wait(300).to({ alpha: 0 }, 600).call(() => { this.stroke.visible = false})
 
                }
            });
        }
    }
}
 