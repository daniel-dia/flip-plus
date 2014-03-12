module InvertCross.Menu.View {

    export class ProjectItem extends Gbase.UI.Button {

        public project: Projects.Project;

        constructor(project: Projects.Project) {
            super();

            this.project = project;

            this.regX = 480 / 2;
            this.regY = 480 / 2;
            
            this.updateProjectInfo()
        }

        //createObjects
        private createObjects(project:Projects.Project) {

            var color = "#00427b"
            var font = "50px " + defaultFont;

            //clean all objects
            this.removeAllChildren();

            if (this.project.UserData.unlocked) {

                //background
                var bg = "projects/slot" + (this.project.UserData.stars ? this.project.UserData.stars : 0);
                var s: createjs.Bitmap = Assets.getImage(bg);
                this.addChild(s);

                //robot name text
                var robotName = new createjs.Text(project.nickName, font, color);
                robotName.x = 14;
                robotName.y = 00;
                this.addChild(robotName)

                //percentage text 
                var percenttext = new createjs.Text((project.UserData.percent * 100).toString() + "%", font, color);
                percenttext.x = 310;
                percenttext.y = 364;
                this.addChild(percenttext)

                //robot image
                if (this.project.UserData.complete)
                    var botImage = Assets.getImage("projects/bots/" + this.project.name);
                else
                    var botImage = Assets.getImage("projects/bots/shadow" + this.project.name);
                this.addChild(botImage);


                //and stars
                var starsIndicator = new ProjectStarsIndicator(project);
                starsIndicator.updateProjectInfo();
                starsIndicator.y = 350;
                starsIndicator.x = 30;
                starsIndicator.scaleX = starsIndicator.scaleY = 0.7;
                this.addChild(starsIndicator);

            } else {

                var bg = "projects/slotl";
                var s: createjs.Bitmap = Assets.getImage(bg);
                this.addChild(s);
            }

            //lock indicator
            //var lockedIndicator = new ProjectLockedIndicator(project.cost);
            //this.addChild(lockedIndicator);

            //create hitArea
            this.createHitArea();
        }

        //updates based on porject 
        public updateProjectInfo() {

            //verifica se o projeto pode ser destravado
            //TODO. nao devia acessar metodo global aqui
            InvertCrossaGame.projectManager.unlockProject(this.project);
                    
            this.createObjects(this.project);
                
            //if is new (unlocked and not played) do an animation
            if (this.project.UserData.percent == 0 && this.project.UserData.unlocked) {
                this.set({ scaleX: 1, scaleY: 1 })
                createjs.Tween.get(this, { loop: true })
                    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
            }


        }
    }
}