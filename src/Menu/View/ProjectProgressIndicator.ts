/// <reference path="../../../lib/easeljs.d.ts" />

module InvertCross.Menu.View {
    
    //View
    export class ProjectProgressIndicator extends createjs.Container {

        private progressBar: createjs.DisplayObject;

        constructor() {
            super();

            this.createObjects();

        }
        
        //create objects
        private createObjects() {
            var bg: createjs.Shape = new createjs.Shape();
            bg.graphics.beginFill("#FA0").rect(0, 0, 400, 150);
            this.addChild(bg);

            var pbarbg: createjs.Shape = new createjs.Shape();
            pbarbg.graphics.beginFill("#620").rect(50, 50, 300, 50);
            this.addChild(pbarbg);

            var pbar: createjs.Shape = new createjs.Shape();
            pbar.graphics.beginFill("#FF0").rect(50, 50, 300, 50);
            this.addChild(pbar);
            this.progressBar = pbar;

        }
        
 

        // update object based on its info
        public updateProjectInfo(progress:number) {
            if (progress > 1) progress = 1;
            if (progress < 0) progress = 0;

            if (progress == undefined) progress = 0;
            this.progressBar.scaleX = progress;

        }
    }


    export class ProjectLockedIndicator extends createjs.Container {
        constructor(requiredStars:number) {
            super();

            var lockedShape: createjs.Shape = new createjs.Shape();
            lockedShape.graphics.beginFill("#080").rect(0, 0, 120, 100);
            lockedShape.x = -150;
            lockedShape.y = 100;
            this.addChild(lockedShape);

            var costText: createjs.Text = new createjs.Text("lock   " + requiredStars, "60px Myriad Pro", "#FFF");
            costText.x = -150 + 10;
            costText.y = 130;
            this.addChild(costText);
            
        }



    }
}