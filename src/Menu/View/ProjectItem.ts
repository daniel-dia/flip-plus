module FlipPlus.Menu.View {

    export class ProjectItem extends gameui.Button {

        public project: Levels.BotLevelsSet;

        constructor(project: Levels.BotLevelsSet, event?: (event?: any) => any) {
            super(event);

            this.project = project;

            this.pivot.x = 480 / 2;
            this.pivot.y = 480 / 2;
            
            this.updateProjectInfo()
        }

        //createObjects
        private createObjects(project:Levels.BotLevelsSet) {

            var color = "#00427b"
            var font = "50px " + defaultFont;

            //clean all objects
            this.removeChildren();
            
            if (project.UserData.unlocked) {

                //background
                this.addChild(gameui.AssetsManager.getBitmap("projects/slot"));

                //bars
                var bar = "projects/bar" + (project.UserData.stars ? project.UserData.stars : 0);
                this.addChild(gameui.AssetsManager.getBitmap(bar).set({ x: 5, y: 363}));
                this.addChild(gameui.AssetsManager.getBitmap(bar + "a"));
                
                //robot name text
                var robotName = gameui.AssetsManager.getBitmapText(project.nickName, "fontBlue");
                robotName.scale.x = robotName.scale.y = 0.6;
                robotName.x = 14;
                robotName.y = 0;
                this.addChild(robotName)

                //percentage text 
                var percenttext = gameui.AssetsManager.getBitmapText((project.UserData.percent * 100).toString() + "%", "fontBlue");
                percenttext.scale.x = percenttext.scale.y = 0.6;
                percenttext.x = 310;
                percenttext.y = 364;
                this.addChild(percenttext)

                //robot image
                if (project.UserData.complete)
                    var botImage = gameui.AssetsManager.getBitmap("projects/" + project.name);
                else
                    var botImage = gameui.AssetsManager.getBitmap("projects/" + project.name +"_shadow");
                this.addChild(botImage);


                //and stars
                var starsIndicator = new ProjectStarsIndicator(project);
                starsIndicator.updateProjectInfo();
                starsIndicator.y = 350;
                starsIndicator.x = 30;
                starsIndicator.scale.x = starsIndicator.scale.y = 0.7;
                this.addChild(starsIndicator);

            } else {


                //adds Background
                var bg = "projects/slotl";
                var s = gameui.AssetsManager.getBitmap(bg);
                this.addChild(s);

                //adds lock indicator
                var star = gameui.AssetsManager.getBitmap("projects/star");
                this.addChild(star);
                star.x = 240;
                star.y = 190;

                //addsText
                var tx = gameui.AssetsManager.getBitmapText(project.cost.toString(), "fontBlue");
                this.addChild(tx);
                tx.pivot.x = tx.getLocalBounds().width;
                tx.x = 220;
                tx.y = 195; 

            }
        }

        //updates based on porject 
        public updateProjectInfo() {

            //verifica se o projeto pode ser destravado
            //TODO. nao devia acessar metodo global aqui
            FlipPlusGame.levelsManager.unlockProject(this.project);
               
            //update the objects display     
            this.createObjects(this.project);

            this.scale.x = this.scale.y = 1;
            createjs.Tween.removeTweens(this);
          
            //if is new (unlocked and not played) do an animation
            if (this.project.UserData.percent == 0 && this.project.UserData.unlocked) {
                this.set({ scaleX: 1, scaleY: 1 })
                //createjs.Tween.get(this)
                //    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1.14, scaleY: 1.14 }, 500, createjs.Ease.sineInOut)
                //    .to({ scaleX: 1, scaleY: 1 }, 500, createjs.Ease.sineInOut)
            }
        }
    }
}