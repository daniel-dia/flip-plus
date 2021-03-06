module FlipPlus.Menu.View {
    export class ProjectStarsIndicator extends PIXI.Container{

        private projectsThemes: Array<string> = ["green", "purple", "yellow"];
        private stars: Array<PIXI.DisplayObject>;
        private project: Levels.BotLevelsSet;
        private fx = new FlipPlus.Effects;

        constructor(project: Levels.BotLevelsSet) {
            super();
            this.project = project;
            this.createObjects();
            this.fx = new FlipPlus.Effects();
            this.addChild(this.fx);
        }

        //create objects
        private createObjects() {
            this.stars = [];   

            for (var i = 0; i < this.projectsThemes.length; i++) {
                this.stars[i] = this.createStar(i);
                this.stars[i].visible = false;
            }

            this.updateProjectInfo(false);

        }
        
        //create a simple star object
        private createStar(id: number): PIXI.DisplayObject {
            var str = "";
            switch (id) {
                case 0: str = "workshop/stargreen";
                    break;
                case 1: str = "workshop/starpurple";
                    break;
                case 2: str = "workshop/staryellow";
                    break;
            }
            var s = gameui.AssetsManager.getBitmap(str);
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
            for (var i = 0; i < this.projectsThemes.length; i++)
                for (var l = 0; l < project.levels.length; l++)
                    if (this.projectsThemes[i] == project.levels[l].theme)
                        starsInfo[i] = true;

            //hide uncompleted.
            for (var i = 0; i < this.projectsThemes.length; i++)
                for (var l = 0; l < project.levels.length; l++)
                    if (this.projectsThemes[i] == project.levels[l].theme)
                        if (!project.levels[l].userdata.solved || project.levels[l].userdata.item)
                            starsInfo[i] = false;

            //update stars visibility
            var an = 0;
            for (var i = 0; i < 3; i++) {
                if (this.stars[i].visible != starsInfo[i]) {
                    this.stars[i].visible = starsInfo[i];
                    //animate
                    if (anim && starsInfo[i]) {
                        an = i;
                        this.stars[i].set({ scaleX: 4, scaleY: 4, rotation_d: -45,alpha:0 });
                        createjs.Tween.get(this.stars[i]).wait(300).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 1500, createjs.Ease.bounceOut)
                        
                        // play sound and cast an effect
                        setTimeout(() => {
                            this.fx.castEffect(this.stars[an].x + 100, this.stars[an].y + 100, "Bolinhas", 4);
                            gameui.AudiosManager.playSound("star");
                        },300 + 500);
                        break;
                    }
                }
            }
        }
    }
}