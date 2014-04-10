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
        public message: Menu.View.Message;

        //Level
        public levelLogic: Model.Level; //friendly
        public levelData: Projects.Level;
        
        //
        usedItem: string;

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
            this.initializeBoardSprites(leveldata.width, leveldata.height, leveldata.theme, this.levelLogic.getBlocks(), leveldata.type);

            //initialize overlay
            this.initializeOverlays();

            //adds message
            this.message = new Menu.View.Message();
            this.view.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.view.addChild(this.popup)

            this.popup.addEventListener("onshow", () => {
                this.menuOverlay.fadeOut();
                this.boardSprite.mouseEnabled = false;
            });

            this.popup.addEventListener("onclose", () => {
                this.menuOverlay.fadeIn();
                this.boardSprite.mouseEnabled = true;
            });

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
            this.menuOverlay.addEventListener("restart", (e: createjs.Event) => { InvertCrossaGame.replayLevel(); });
            this.menuOverlay.addEventListener("skip", (e: createjs.Event) => { this.skip(); });
            this.menuOverlay.addEventListener("hint", (e: createjs.Event) => { this.hint(e.target); });
            this.menuOverlay.addEventListener("back", () => { InvertCrossaGame.exitLevel(); });
            this.menuOverlay.y = 1800;

            this.menuOverlay.updateButtonLabel("hint", InvertCrossaGame.itemsData.getItemQuantity("hint"));
            this.menuOverlay.updateButtonLabel("skip", InvertCrossaGame.itemsData.getItemQuantity("skip"));

            if (InvertCrossaGame.projectManager.getCurrentProject() != undefined) {
                var levels: Projects.Level[] = InvertCrossaGame.projectManager.getCurrentProject().levels;

                this.statusArea = new Views.StatusArea();
                this.statusArea.setText2(levels.indexOf(this.levelData) + 1 + " - " + levels.length);
                this.statusArea.setText1("");
                this.statusArea.setText3("");
                this.view.addChild(this.statusArea);
            }

        }

        private initializeBoardSprites(width: number, height: number, theme: string, blocks: any, type: string) {

            //AddBoard
            this.boardSprite = new Views.BoardSprite(width, height, theme, type);
            this.view.addChild(this.boardSprite);

            this.boardSprite.x = DefaultWidth / 2;
            this.boardSprite.y = DefaultHeight / 2;

            this.boardSprite.addInputCallback((col: number, row: number) => { this.userInput(col, row); })
            //TODO create a custom event

        }

        // user input ===============================================================================================================

        // Threat user input
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

        //skips the level
        private skip() {

            if (this.levelData.userdata.skip || this.levelData.userdata.solved) {
                InvertCrossaGame.skipLevel();

            } else {
                var itemQuantity = InvertCrossaGame.itemsData.getItemQuantity("skip");
                if (itemQuantity > 0) {
                    InvertCrossaGame.itemsData.decreaseItemQuantity("skip");
                    InvertCrossaGame.skipLevel(true);
                }
                else {
                    this.popup.showtext("no more skips");
                }
            }
        }
        
        private hint(blockId?) {

            var itemQuantity = InvertCrossaGame.itemsData.getItemQuantity("hint")
            if (itemQuantity > 0) {

                if (typeof blockId != "number") {
                    var invertedBlocks = this.levelLogic.board.getInvertedBlocks();
                    var index = Math.floor(Math.random() * invertedBlocks.length);
                    blockId = invertedBlocks[index];
                }

                this.boardSprite.getBlockById(blockId).enableHint();
                InvertCrossaGame.itemsData.decreaseItemQuantity("hint");
                this.menuOverlay.updateButtonLabel("hint", InvertCrossaGame.itemsData.getItemQuantity("hint"));
                this.usedItem = "hint";
            }
            else {
                this.popup.showtext("no more hints");
            }
        }

        win(col: number, row: number) {

            //play a win sound
            Assets.playSound("win");

            //verifies if user already completed this level and verifies if player used any item in the game
            if (!this.levelData.userdata.solved)
                this.levelData.userdata.item = this.usedItem;

            //verifies if is the first time cimpletting the level
            var complete1stTime = false;
            if (!this.levelData.userdata.solved) complete1stTime = true;

            //set model to complete level.
            InvertCrossaGame.projectManager.completeLevel(this.levelData);
            
            //change screen and animate.
            this.message.showtext("Well done!", 1000, 800);

            //hide all menus
            this.menuOverlay.fadeOut();
            this.boardSprite.lock();

            //apply effect on sprites
            setTimeout(() => {
                this.boardSprite.winEffect(col, row)
            }, 200);

            //animates board to fade out;
            setTimeout(() => {
              
                //remove all tweens
                createjs.Tween.removeTweens(this.boardSprite);
                //cache board
                var bounds = this.boardSprite.getBounds();
                this.boardSprite.cache(bounds.x, bounds.y, bounds.width, bounds.height);
                //animate to out
                createjs.Tween.get(this.boardSprite).to({ scaleX: 0, scaleY: 0 }, 500, createjs.Ease.quadIn).call(() => {
                    this.boardSprite.visible = false;
                    this.boardSprite.uncache();
                })

                //switch screen
                InvertCrossaGame.completeLevel(complete1stTime)
                
                
            }, 1800);
        }

        loose() {

            this.menuOverlay.fadeOut();
            this.boardSprite.lock();
            setTimeout(() => { InvertCrossaGame.looseLevel(); }, 3000);;
            this.boardSprite.looseEffect();
        }

        // Menus =====================================================================================================================

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

        animatePuzzle(parameters) {
            this.boardSprite.x = parameters.x;
            this.boardSprite.y = parameters.y;
            this.boardSprite.scaleX = parameters.scaleX;
            this.boardSprite.scaleY = parameters.scaleY;
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: DefaultWidth / 2, y: DefaultHeight / 2 }, 500, createjs.Ease.quadInOut);
        }

        // Screen =================================================================================================================

        public activate(parameters?: any) {

            super.activate(parameters);
            if (parameters) this.animatePuzzle(parameters);

        }
    }
}