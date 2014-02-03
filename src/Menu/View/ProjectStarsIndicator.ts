///<reference path="../../../lib/easeljs.d.ts" />

module InvertCross.Menu.View {
    export class ProjectStarsIndicator extends createjs.Container{

        private projectsTypes: Array<string> = ["puzzle", "time", "combo"];
        private stars: Array<createjs.DisplayObject>;
        private project: Projects.Project;

        constructor(project: Projects.Project) {
            super();
            this.project = project;
            this.createObjects();
        }

        //create objects
        private createObjects() {
            this.stars = [];   

            for (var i = 0; i < this.projectsTypes.length; i++) {
                this.stars[i] = this.createStar(i);
                this.stars[i].visible = false;
            }

            this.updateProjectInfo(false);

        }
        
        //create a simple star object
        private createStar(id: number): createjs.DisplayObject {
            var s = Assets.getImage("workshop/estrelaworkshop");
            s.x = id * 121;
            this.addChild(s);
            return s;
        }

        // update object based on its info
        public updateProjectInfo(anim:boolean=true) {
            var project = this.project;

            ////hide all stars
            //for (var i = 0; i < this.projectsTypes.length; i++)
            //    this.stars[i].visible = false;

            
            var starsInfo = new Object();

            //shows only existent levels
            for (var i = 0; i < this.projectsTypes.length; i++)
                for (var l = 0; l < project.levels.length; l++)
                    if (this.projectsTypes[i] == project.levels[l].type)
                        starsInfo[i] = true;

            //hide uncompleted.
            for (var i = 0; i < this.projectsTypes.length; i++)
                for (var l = 0; l < project.levels.length; l++)
                    if (this.projectsTypes[i] == project.levels[l].type)
                        if (!project.levels[l].userdata.solved)
                            starsInfo[i] = false;

            //update stars visibility
            for (var i = 0; i < 3; i++) {
                if (this.stars[i].visible != starsInfo[i]) {
                    this.stars[i].visible = starsInfo[i];
                    //animate
                    if (anim && starsInfo[i]) {
                        this.stars[i].set({ scaleX: 4, scaleY: 4, rotation: -45,alpha:0 });
                        createjs.Tween.get(this.stars[i]).wait(700).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha:1}, 1500, createjs.Ease.bounceOut)
                    }
                }
            }
        }
    }
}