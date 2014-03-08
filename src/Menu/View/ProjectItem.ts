module InvertCross.Menu.View {

    export class ProjectItem extends Gbase.UI.Button {

        public project: Projects.Project;
        private progressIndicator: ProjectProgressIndicator; 
        private starsIndicator: ProjectStarsIndicator; 
        private lockedIndicator: ProjectLockedIndicator;
        private txt: createjs.Text;

        constructor(project: Projects.Project) {
            super();

            //initialize variables
            this.lockedIndicator = new ProjectLockedIndicator(project.cost);
            this.progressIndicator = new ProjectProgressIndicator();
            this.starsIndicator = new ProjectStarsIndicator(project);
            
            this.project = project;

            //background
            var s: createjs.Bitmap = Assets.getImage("projects/projectActiveBg");
            this.addChild(s);
            s.x = -710 / 2;
            s.y = -710 / 2;

            this.txt = new createjs.Text(project.name, "600 70px Myriad Pro", "#ffffff")
            this.txt.textAlign = "center";
            this.txt.y = -120;

            this.addChild(this.txt);
            this.updateProjectInfo()

            this.progressIndicator.x = -160;
            this.progressIndicator.y = 120;
            this.progressIndicator.scaleX = 0.8;
            this.progressIndicator.scaleY = 0.8;

            this.addChild(this.progressIndicator);
            this.addChild(this.starsIndicator);
            this.addChild(this.lockedIndicator);

            this.width = 720;
            this.height = 720;
            this.createHitArea();
        }

        //updates based on porject 
        public updateProjectInfo() {

            //verifica se o projeto pode ser destravado
            //TODO. nao devia acessar metodo global aqui
            InvertCrossaGame.projectManager.unlockProject(this.project);

            if (this.project.UserData.unlocked) {

                this.progressIndicator.visible = true;
                this.lockedIndicator.visible = false;
                this.progressIndicator.updateProjectInfo(this.project.UserData.percent);

                this.starsIndicator.updateProjectInfo();

                //if is new (unlocked and not played) do an animation
                if (this.project.UserData.percent == 0 && this.project.UserData.unlocked) {
                    this.set({ scaleX: 1, scaleY: 1 })
                    createjs.Tween.get(this, { loop: true })
                        .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                        .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)

                }
 
            }
            else {
                this.progressIndicator.visible = false;
                this.lockedIndicator.visible = true;
            }


        }

    }

    
}