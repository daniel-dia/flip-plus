/// <reference path="../../../lib/easeljs.d.ts" />
/// <reference path="../../InvertCrossGame.ts" /> 
/// <reference path="../../GamePlay/Level.ts" /> 
/// <reference path="PuzzlesMenu.ts" /> 
/// <reference path="Box.ts" /> 
/// <reference path="BallonLevelSelector.ts" /> 
/// <reference path="LevelGrid.ts" /> 


/// <reference path="../../../Gbase/ScreenState.ts" /> 
/// <reference path="../../../Gbase/UI/MenuContainer.ts" /> 
/// <reference path="../../../Gbase/UI/Grid.ts" /> 
/// <reference path="../../../Gbase/UI/Button.ts" /> 

module InvertCross.Menu.LevelSelector {

    export class BoxesMenu extends Gbase.ScreenState {

        //constants
        private groundlevel: number = 1676;

        //variables
        private chapters: LevelData.Chapter[];
        private boxes: Box[] = new Array();
        private grids: LevelGrid[] = new Array();
        private ballon: BallonLevelSelector;

        // Constructor
        constructor(chapters: LevelData.Chapter[]) {
            super();

            this.chapters = chapters;

            this.initializateScene();
        }

        private initializateScene() {



            //initializate sprites
            this.initializeSprites();

            //ferifies if there is a new boxes and drop New Boxes
            this.updateBoxes();

        }

        private initializeSprites() {
            var bg: createjs.Bitmap = Assets1.Image.getImage("bggeneric.jpg");
            var ground: createjs.Bitmap = Assets1.Image.getImage("ground.png")
            bg.scaleX = bg.scaleY = 4;
            ground.y = 1676;

            this.view.addChild(bg);
            this.view.addChild(ground);

            //Add Boxes
            this.addChaptersBoxes();

            //Add Ballon
            this.ballon = new BallonLevelSelector();
            this.view.addChild(this.ballon);
            this.ballon.scaleX = 1.9;
            this.ballon.scaleY = 1.3;

            //Add ChapterFrids
            this.addChaptersGrids();

            //Add Back Button
            var menuContainer: Gbase.UI.Grid = new Gbase.UI.Grid(1, 1, null, 373, null, true);//(null,373,true);
            menuContainer.y = 1676;

            this.view.addChild(menuContainer);
            menuContainer.addObject(new Gbase.UI.TextButton("BACK", () => { InvertCross.InvertCrossaGame.mainScreen.activate(); },null,null,null,"navigateOut"));

        }
        
        private updateBoxes() {

            //add already dropped boxes
            for (var c = 0; c < this.chapters.length; c++) {
                var cud: UserData.ChapterUserData = InvertCrossaGame.userData.getChapterData(this.chapters[c].name);
                if (cud.isNew && !cud.locked) {
                    this.boxes[c].drop();
                    cud.isNew = false;
                    InvertCrossaGame.userData.setChapterData(this.chapters[c].name, cud);
                }

                if (!cud.locked)
                    this.boxes[c].visible = true;
            }
        }
        
        //==========  Boxes Related ========================================== //
        private addChaptersBoxes() {
            for (var i = 0; i < this.chapters.length; i++) {
                this.addBox(i);
            }
        }

        private addChaptersGrids() {
            for (var i = 0; i < this.chapters.length; i++) {
                this.addGrid(this.chapters[i]);
            }
        }

        private addBox(id: number) {
            var box: Box = new Box(id);
            this.boxes.push(box);
            this.view.addChild(box);
            box.addEventListener("click", (e: MouseEvent) => { this.boxClick(e) });
        }

        private addGrid(chapter: LevelData.Chapter) {
            var grid = new LevelGrid(chapter);
            this.grids.push(grid);
            this.view.addChild(grid);
        }

        private boxClick(event: MouseEvent): void {

            //verifies if is animating
            for (var i = 0; i < this.boxes.length; i++)
                if (this.boxes[i].isAnimating) return;

            var box: Box;
            var tg: any = event.target;
            box = <Box>tg;

            box.boxId;
            if (box.isOppened)
                this.closeBox(box.boxId);
            else
                this.openBox(box.boxId);
        }

        private openBox(boxId: number) {

            this.grids[boxId].open();
            this.ballon.open();

            for (var i = 0; i < this.boxes.length; i++) {
                if (i == boxId) {
                    this.boxes[i].open();
                }
                else
                    this.boxes[i].fadeOut();
            }
        }

        private closeBox(boxId: number) {

            this.grids[boxId].close();

            if (this.ballon.visible)
                this.ballon.close();


            for (var i = 0; i < this.boxes.length; i++) {
                if (i == boxId)
                    this.boxes[i].close();
                else
                    this.boxes[i].fadeIn();
            }
        }
            
        private closeAllBoxes() {
            this.closeBox(0);
            this.closeBox(1);
            this.closeBox(2);
            this.closeBox(3);
            this.closeBox(4);
        }

        //===========Other Stuff========================================== //

        public activate() {
            super.activate()
            this.closeAllBoxes();
            setTimeout( () => {
                this.updateBoxes();
                for (var g in this.grids) this.grids[g].updateUserData();
            }, 1000);

            //play BgSound
            Assets1.Sound.playMusic("trilha");
        
                        
        }
    }
}