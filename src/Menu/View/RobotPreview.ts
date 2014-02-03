/// <reference path="../../../lib/easeljs.d.ts" />
/// <reference path="../../Projects/Level.ts" /> 
/// <reference path="../../userdata/projectsdata.ts" />
/// <reference path="../../../Gbase/UI/Grid.ts" /> 
/// <reference path="LevelThumb.ts" /> 

module InvertCross.Menu.View {

    export class RobotPreview extends createjs.Container {

        private project: InvertCross.Projects.Project;
        private percentMask: createjs.Shape;
       
        //Constructor
        constructor(project: InvertCross.Projects.Project) {
            super();

            this.project = project;
            this.createGraphics(project);
            this.update();
        }

        //create graphics
        private createGraphics(project: InvertCross.Projects.Project) {
            var size: number = 800;
            var fill = this.addChild(Assets.getImage("mybots/RobotPreviewFill"));
            var stroke = this.addChild(Assets.getImage("mybots/RobotPreview"));
            
            fill.regX = stroke.regX = fill.getBounds().width/2;
            fill.regY = stroke.regY = fill.getBounds().height;

            this.addChild(fill);
            this.addChild(stroke);

            //mask
            this.percentMask = new createjs.Shape();
            this.percentMask.graphics.beginFill("#FFF").drawRect(-size / 2, 0, size, -fill.getBounds().height).endFill();
            this.percentMask.scaleY = 0;
            fill.mask = this.percentMask;

        }

        //update percentage
        public update(complete:boolean=false) {
            if (!complete)
                this.percentMask.scaleY = this.project.UserData.percent;
            else
                this.animateLevelComplete();
        }

        
        //animate
        public animateLevelComplete(color: string= "#ffcc2e") {
            //var oldValue = this.project.UserData.percent - 0.1;
            var newValue = this.project.UserData.percent;

            //this.percentMask.scaleY = oldValue;
            

            var boxShape = new createjs.Shape();
            boxShape.graphics.beginFill(color).drawRect(-500, -500, 1000, 1000);
            boxShape.y = -300;
            this.addChild(boxShape);
            createjs.Tween.get(boxShape).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => { this.removeChild(boxShape); })
            createjs.Tween.get(this.percentMask).wait(600).to({ scaleY: newValue }, 700, createjs.Ease.quadInOut);


        }


    }
}
 