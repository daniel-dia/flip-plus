module FlipPlus.Menu.View {

    export class LevelGrid extends gameui.Grid {

        private challangesMap = new Object();
        private project: Levels.BotLevelsSet;
        private thumbs: LevelThumb[];
        private gridCreated: boolean;
        private infoText: PIXI.extras.BitmapText;
        private starCost: PIXI.DisplayObject;

        //Constructor
        constructor(project: FlipPlus.Levels.BotLevelsSet) {
            super(5, 2, 1190, 476);
            
            this.thumbs = [];
            this.project = project;
            
            this.updateGrid(project);
        }

        //create a chapter menu, containing a lot o challanges
        private createLevelsThumbs(chapter: FlipPlus.Levels.BotLevelsSet):void {

            // only adds once
            if (this.gridCreated) return;
            this.gridCreated = true;

            // removes infoText
            if (this.infoText) this.removeChild(this.infoText);
           
            //creates a icon tiles
            for (var i = 0; i < chapter.levels.length; i++) {

                //get current chapter
                var level: Levels.Level = chapter.levels[i];

                //save it on the map, (for click feedback)
                this.challangesMap[level.name] = level;
                
                //add the click event listener
                var event = (e: PIXI.interaction.InteractionEvent) => {

                    var tg: PIXI.DisplayObject = <PIXI.DisplayObject>(e.target);
                    var level: Levels.Level = this.challangesMap[tg.name];

                    var parameters = {
                        x: tg.x + tg.parent.x,
                        y: tg.y + tg.parent.y,
                        scaleX: 0.3,
                        scaleY: 0.3
                    }

                    this.emit("levelClick", { level: level, parameters: parameters });
                };

                //create a thumb
                var levelThumb: LevelThumb = new LevelThumb(level,event);
                this.thumbs.push(levelThumb);
                levelThumb.rotation = (Math.random() * 3 - 1.5) * Math.PI / 180; //Little angle random.

                // animation
                levelThumb.set({ alpha: 0, scaleX: 1.3, scaleY: 1.3 });//animate
                createjs.Tween.get(levelThumb).wait(50+i*50).to({ alpha: 1,scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);
                
                //Add object on grid
                this.addObject(levelThumb);

            }
        }

        // update grid
        private updateGrid(project: Levels.BotLevelsSet) {

            if ((!FlipPlusGame.isFree() && project.free) || (FlipPlusGame.isFree())) {
                if (project.UserData.unlocked)
                    this.createLevelsThumbs(project);
                else
                    this.showLockedText();
            } else
                this.showNotFreeText();
        }

        // Add Locked Text
        private showLockedText() {
            if (!this.infoText)
                this.infoText = gameui.AssetsManager.getBitmapText(StringResources.ws_Locked, "fontWhite");

            this.infoText.pivot.x = this.infoText.getLocalBounds().width / 2;
            this.infoText.y = 150;
            this.infoText.x = (defaultWidth-this.x*2 )/ 2;
            this.addChild(this.infoText);

            this.addCost();
        }

        // add Cost indication
        private addCost() {

            if (!this.starCost) {
                var starCost = new PIXI.Container();
                var cost = gameui.AssetsManager.getBitmapText("x " + this.project.cost.toString(), "fontWhite");
                var star = gameui.AssetsManager.getBitmap("starsicon");
                starCost.addChild(star);
                starCost.addChild(cost);

                star.x = -70;
                cost.x = 70;

                this.starCost = starCost
            }

            this.starCost.y = 300;
            this.starCost.x = (defaultWidth - this.x * 2) / 2 - 60;
            this.addChild(this.starCost);
        }

        // Add "not free" text
        private showNotFreeText() {
            if (!this.infoText) this.infoText = gameui.AssetsManager.getBitmapText(StringResources.ws_NotFree, "fontWhite");
            this.infoText.pivot.x = this.infoText.getLocalBounds().width / 2;
            this.infoText.y = 100;
            this.infoText.x = (defaultWidth - this.x * 2) / 2;
            this.addChild(this.infoText);
        }

        // update user data
        public updateUserData() {

            this.updateGrid(this.project);

            //get User data from storage
            for (var i = 0; i < this.thumbs.length; i++) {
                
                var level:Levels.Level = this.challangesMap[this.thumbs[i].name];
                var chapter: Levels.BotLevelsSet = this.project;
                 
                this.thumbs[i].updateUserData();
            }
        }
    }
}
