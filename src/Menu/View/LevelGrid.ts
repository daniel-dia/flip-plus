module FlipPlus.Menu.View {

    export class LevelGrid extends gameui.Grid {

        private challangesMap = new Object();
        private project: Levels.BotLevelsSet;
        private thumbs: LevelThumb[];
        private gridCreated: boolean;
        private infoContainer: PIXI.Container;
        
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
            if (this.infoContainer) this.infoContainer.visible = false;
           
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
                if (project.UserData.unlocked) {
                    if (this.infoContainer) this.infoContainer.visible = false;
                    this.createLevelsThumbs(project);
                }
                else
                    this.showLockedText();
            } else
                this.showNotFreeText();
        }

        // Add Locked Text
        private showLockedText() {

            // create container
            if (!this.infoContainer) {
                this.infoContainer = new PIXI.Container();
                this.addChild(this.infoContainer);
            }

            this.infoContainer.visible = true;

            // clear container
            this.infoContainer.removeChildren();

            // adds text
            var infoText = gameui.AssetsManager.getBitmapText(StringResources.ws_Locked, "fontWhite");
            infoText.pivot.x = infoText.getLocalBounds().width / 2;
            infoText.y = 150;
            infoText.x = (defaultWidth-this.x*2 )/ 2;
            this.infoContainer.addChild(infoText);

            // ads cost
            this.addCost();
        }

        // add Cost indication
        private addCost() {

            var currentStars = FlipPlusGame.levelsManager.getStarsCount();
            var levelCost = this.project.cost;
            var starCost = new PIXI.Container();
            var left = levelCost - currentStars;
            var text = StringResources.ws_Unlock;
            text = text.replace('{0}', left.toString());
            var half = text.split("{1}")[0];
            var costText   = gameui.AssetsManager.getBitmapText(half, "fontWhite");
            var starSprite = gameui.AssetsManager.getBitmap("starsicon");
            starCost.addChild(starSprite);
            starCost.addChild(costText);

            var size1 = costText.textWidth;
            costText.text = text;
            var sizetotal = costText.getLocalBounds().width;

            costText.x = -sizetotal/2;
            starSprite.x = costText.x + size1;

            starCost.y = 300;
            starCost.x = (defaultWidth - this.x*2) / 2 ;
            this.infoContainer.addChild(starCost);
        }

        // Add "not free" text
        private showNotFreeText() {
            var infoText = gameui.AssetsManager.getBitmapText(StringResources.ws_NotFree, "fontWhite");
            infoText.pivot.x = infoText.getLocalBounds().width / 2;
            infoText.y = 100;
            infoText.x = (defaultWidth - this.x * 2) / 2;
            this.infoContainer.addChild(infoText);
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
