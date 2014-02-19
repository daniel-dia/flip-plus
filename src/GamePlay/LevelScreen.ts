
/// <reference path="../../lib/easeljs.d.ts" /> 
/// <reference path="../../lib/soundjs.d.ts" /> 

/// <reference path="../../Gbase/ScreenState.ts" /> 

/// <reference path="Model/Level.ts" />

/// <reference path="Views/Overlay.ts" />
/// <reference path="Views/BoardSprite.ts" />
/// <reference path="Views/StatusArea.ts" />
/// <reference path="Views/GamePlayMenu.ts" />

/// <reference path="../Utils/Effects.ts" /> 

module InvertCross.GamePlay {

    //Controller
    export class LevelScreen extends Gbase.ScreenState {

        //Display Sprites
        public boardSprite: Views.BoardSprite;
        private fx: Effects;

        //Overlays // friendly
        public menuOverlay: Views.GamePlayMenu;
        public statusArea: Views.StatusArea;
        public popup: Menu.View.Popup;

        //Level
        public levelLogic: Model.Level; //friendly
        public levelData: Projects.Level;

        //Initialization methodos ===================================================================================================

        constructor(leveldata: Projects.Level) {

            super();
            
            //Store level data;
            this.levelData = leveldata;

            //initializate level Model
            this.levelLogic = new Model.Level(leveldata);

            //play BgSound
            InvertCross.Assets.stopMusic();

            this.createScene(leveldata);

        }

        // Create Scene ===============================================================================================================

        private createScene(leveldata: Projects.Level) {
            
            //creates a Background
            this.addBackground(leveldata.theme);

            //initialize board sprites
            this.initializeBoardSprites(leveldata.width, leveldata.height, leveldata.theme, this.levelLogic.getBlocks());

            //initialize overlay
            this.initializeOverlays();

            //adds popup
            this.popup = new Menu.View.Popup();
            this.view.addChild(this.popup)

        }

        private addBackground(theme: string) {
            this.view.addChild(InvertCross.Assets.getImage("puzzle/bg"));
        }

        private initializeOverlays() {

            //intialize  menu overlay
            this.menuOverlay = new Views.GamePlayMenu();
            this.view.addChild(this.menuOverlay);

            this.menuOverlay.addEventListener("pause", () => { this.pauseGame(); });
            this.menuOverlay.addEventListener("unpause", () => { this.unPauseGame(); });
            this.menuOverlay.addEventListener("hint", () => { });
            this.menuOverlay.addEventListener("restart", () => { InvertCrossaGame.replayLevel(); });
            this.menuOverlay.addEventListener("skip", () => { this.skip(); });
            this.menuOverlay.addEventListener("back", () => { InvertCrossaGame.exitLevel(); });
            this.menuOverlay.addEventListener("hint", () => { this.hint(); });
            this.menuOverlay.y = 1800;

            this.menuOverlay.updateHint(InvertCrossaGame.itemsData.getItemQuantity("hint"));

            var levels: Projects.Level[] = InvertCrossaGame.projectManager.getCurrentProject().levels;

            this.statusArea = new Views.StatusArea();
            this.statusArea.setText2(levels.indexOf(this.levelData) + 1 + " - " + levels.length);
            this.statusArea.setText1("");
            this.statusArea.setText3("");
            this.view.addChild(this.statusArea);

        }

        private initializeBoardSprites(width: number, height: number, theme: string, blocks: any) {

            //AddBoard
            this.boardSprite = new Views.BoardSprite(width, height, theme);
            this.view.addChild(this.boardSprite);

            this.boardSprite.x = DefaultWidth / 2;
            this.boardSprite.y = DefaultHeight / 2;
            
            this.boardSprite.addInputCallback((col: number, row: number) => { this.userInput(col, row); })
            //there is no custom Event. so this is the fastest option

        }

        // user input ===============================================================================================================

        //threat user input
        public userInput(col: number, row: number) {

            //invert a cross
            this.levelLogic.invertCross(col, row);

            //update sprites 
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            //verifies prize
            if (this.levelLogic.verifyPrize())
                this.earnPrize(col, row);

            //verifies winning
            if (this.levelLogic.verifyWin()) 
                this.win(col, row);

            this.levelLogic.moves++;
        }

        // GamePlay methods =========================================================================================================

        private earnPrize(col: number, row: number) {

            this.levelLogic.earnPrize();
            setTimeout(() => {
                //playSound
                Assets.playSound("prize");
                //apply radius effect
                this.boardSprite.radiusEffect(col, row)
            }, 50);
        }

        private skip() {
            InvertCrossaGame.skipLevel();
        }

        private hint() {

            var hintsQuantity = InvertCrossaGame.itemsData.getItemQuantity("hint") 
            if (hintsQuantity > 0) {

                var invertedBlocks = this.levelLogic.board.getInvertedBlocks();
                var hint = Math.floor(Math.random() * invertedBlocks.length);
                this.boardSprite.getBlockById(invertedBlocks[hint]).enableHint();

                hintsQuantity--;
                InvertCrossaGame.itemsData.saveQuantityItem("hint", hintsQuantity);

                this.menuOverlay.updateHint(InvertCrossaGame.itemsData.getItemQuantity("hint"));
            }
            else {
                this.popup.showtext("no more hints",3000);
            }
            
        }

        win(col: number, row: number) {

            InvertCrossaGame.projectManager.completeLevel(this.levelData);

            this.menuOverlay.fadeOut();
            this.boardSprite.lock();
            setTimeout(() => { this.boardSprite.winEffect(col, row) }, 100);

            this.menuOverlay.fadeOut();
            Assets.playSound("win");

            setTimeout(() => {
                InvertCrossaGame.completeLevel()

                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0}, 500, createjs.Ease.quadIn).call(() => {
                    this.boardSprite.visible = false;
                });

            }, 600);
        }

        loose() {

            this.menuOverlay.fadeOut();
            this.boardSprite.lock();           
            setTimeout(() => {InvertCrossaGame.exitLevel(true);}, 2000);;
            this.boardSprite.looseEffect();
        }


        //Menus =====================================================================================================================

        pauseGame() {

            this.boardSprite.lock();
            var med = DefaultWidth / 4;

            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, createjs.Ease.quadIn).call(() => {
                this.boardSprite.visible = false;
            });
        }

        unPauseGame() {

            this.boardSprite.unlock();
            var med = DefaultWidth / 4;

            this.boardSprite.scaleX = 0.5;
            this.boardSprite.alpha = 0;
            this.boardSprite.visible = true;

            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 150, createjs.Ease.circOut);
        }

        animatePuzzle(parameters){
                this.boardSprite.x = parameters.x;
                this.boardSprite.y = parameters.y;
                this.boardSprite.scaleX = parameters.scaleX;
                this.boardSprite.scaleY = parameters.scaleY;
                createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: DefaultWidth / 2, y: DefaultHeight / 2 }, 500, createjs.Ease.quadInOut);
        }

        //Screen =================================================================================================================

        public activate(parameters?: any) {

            super.activate(parameters);

            if (parameters) this.animatePuzzle(parameters);

        }
    }
}