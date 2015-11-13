module FlipPlus.Menu.View {

    export class LevelGrid extends gameui.Grid {

        private challangesMap = new Object();
        private currentChapter: Projects.Project;
        private thumbs: LevelThumb[];

        //Constructor
        constructor(chapter: FlipPlus.Projects.Project) {
            super(5,2,1190,476);
            this.thumbs = [];
            this.currentChapter = chapter;
            this.createChapterSet(chapter);
        }

        //create a chapter menu, containing a lot o challanges
        private createChapterSet(chapter: FlipPlus.Projects.Project):void {

            //creates a icon tiles
            for (var i = 0; i < chapter.levels.length; i++) {

                //get current chapter
                var level: Projects.Level = chapter.levels[i];

                //save it on the map, (for click feedback)
                this.challangesMap[level.name] = level;
                
                //add the click event listener
                var event = (e: PIXI.interaction.InteractionEvent) => {

                    var tg: PIXI.DisplayObject = <PIXI.DisplayObject>(e.target);
                    var level: Projects.Level = this.challangesMap[tg.name];

                    var parameters = {
                        x: tg.x + tg.parent.x,
                        y: tg.y + tg.parent.y,
                        scaleX: 0.3,
                        scaleY: 0.3
                    }

                    this.emit("levelClick", { level: level, parameters: parameters });
                };

                //create a thumb
                var challangeThumb: LevelThumb = new LevelThumb(level,event);
                this.thumbs.push(challangeThumb);
                challangeThumb.rotation = (Math.random() * 3 - 1.5) * Math.PI / 180; //Little angle random.

                ////desactivate animation
                //challangeThumb.set({ alpha: 0, scaleX: 1.3, scaleY: 1.3 });//animate
                //createjs.Tween.get(challangeThumb).wait(50+i*50).to({ alpha: 1,scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadIn);
                
                //Add object on grid
                this.addObject(challangeThumb);

                
            }
        }

        public updateUserData() {
            //get User data from storage
            for (var i = 0; i < this.thumbs.length; i++) {
                
                var level:Projects.Level = this.challangesMap[this.thumbs[i].name];
                var chapter: Projects.Project = this.currentChapter;
                 
                this.thumbs[i].updateUserData();
            }
        }
    }
}
