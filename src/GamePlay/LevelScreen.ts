module FlipPlus.GamePlay {

    //Controller
    export class LevelScreen extends gameui.ScreenState {

        //Display Sprites
        public boardSprite: Views.BoardSprite;
        private fx: Effects;

        //Overlays // friendly
        public gameplayMenu: Views.GamePlayMenu;
        public statusArea: Views.StatusArea;
        public popup: Menu.View.Popup;
        public message: Menu.View.Message;

        //Level
        public levelLogic: Model.Level; //friendly
        public levelData: Projects.Level;

        public itemsFunctions: any;
        
        // Used to know the last item used by the user in this level
        public usedItem: string;


        //Initialization methodos ===================================================================================================

        constructor(leveldata: Projects.Level) {

            super();

            this.itemsFunctions = {};

            //Store level data;
            this.levelData = leveldata;

            //initializate level Model
            this.levelLogic = new Model.Level(leveldata);

            //play BgSound
            ///gameui.AssetsManager.stopMusic();

            //creates all screen objects
            this.createScene(leveldata);

        }

        // Create Scene ===============================================================================================================

        private createScene(leveldata: Projects.Level) {

            //creates a Background
            this.addBackground();

            //initialize board sprites
            this.initializeBoardSprites(leveldata.width, leveldata.height, leveldata.theme, this.levelLogic.getBlocks(), leveldata.type);

            //initialize overlay
            this.initializeOverlays();

            //adds message
            this.message = new Menu.View.Message();
            this.content.addChild(this.message);

            //adds popup
            this.popup = new Menu.View.Popup();
            this.content.addChild(this.popup)

            this.popup.addEventListener("onshow", () => {
                this.gameplayMenu.fadeOut();
                this.boardSprite.mouseEnabled = false;
            });

            this.popup.addEventListener("onclose", () => {
                this.gameplayMenu.fadeIn();
                this.boardSprite.mouseEnabled = true;
            });

        }

        private addBackground() {
            var bg = gameui.AssetsManager.getBitmap("workshop/bgworkshop");
            this.content.addChild(bg);
            bg.y = -339;
            bg.scaleY = 1.3310546875;
            bg.alpha = 0.4;
        }

        private initializeOverlays() {

            //intialize  menu overlay
            this.gameplayMenu = new Views.GamePlayMenu();
            this.gameplayMenu.y = -248;
            this.footer.addChild(this.gameplayMenu);
            
            //level control
            this.gameplayMenu.addEventListener("pause", () => { this.pauseGame(); });
            this.gameplayMenu.addEventListener("unpause", () => { this.unPauseGame(); });
            this.gameplayMenu.addEventListener("restart", (e: createjs.Event) => { FlipPlusGame.replayLevel(); });
            this.gameplayMenu.addEventListener("back", () => { FlipPlusGame.exitLevel(); });

            //upper staus area
            if (FlipPlusGame.projectManager.getCurrentProject() != undefined) {
                var levels: Projects.Level[] = FlipPlusGame.projectManager.getCurrentProject().levels;
                this.statusArea = new Views.StatusArea();
                this.statusArea.setText2(levels.indexOf(this.levelData) + 1 + " - " + levels.length);
                this.statusArea.setText1("");
                this.statusArea.setText3("");
                this.header.addChild(this.statusArea);
            }
        }

        private initializeBoardSprites(width: number, height: number, theme: string, blocks: any, type: string) {

            //AddBoard
            this.boardSprite = new Views.BoardSprite(width, height, theme, type);
            this.content.addChild(this.boardSprite);

            this.boardSprite.x = DefaultWidth / 2;
            this.boardSprite.y = DefaultHeight / 2;

            this.boardSprite.addInputCallback((col: number, row: number) => { this.userInput(col, row); })
            //TODO create a custom event

        }

        public back() {
            this.pauseGame();
        }

        // user input ===============================================================================================================

        // handles user input
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
                ///gameui.AssetsManager.playSound("prize");

                //apply radius effect
                this.boardSprite.radiusEffect(col, row)

            }, 50);
        }

        win(col: number, row: number,messageText:boolean=true) {

            //play a win sound
            ///gameui.AssetsManager.playSound("win");

            //verifies if user already completed this level and verifies if player used any item in the game
            if (!this.levelData.userdata.solved)
                this.levelData.userdata.item = this.usedItem;

            if (this.usedItem == null)
                this.levelData.userdata.item = null;

            //verifies if is the first time cimpletting the level
            var complete1stTime = false;
            if (!this.levelData.userdata.solved) complete1stTime = true;

            //set model to complete level.
            FlipPlusGame.projectManager.completeLevel(this.levelData);

            //change screen and animate.
            if (messageText)
                this.message.showtext(stringResources.gp_finishPuzzle, 1000, 800);

            //hide all menus
            this.gameplayMenu.fadeOut();
            this.boardSprite.lock();

            //apply effect on sprites
            setTimeout(() => {
                this.boardSprite.winEffect(col, row)
            }, 200);

            //animates board to fade out;
            setTimeout(() => { this.winSwitchScreen(complete1stTime) }, 1800);
        }

        winSwitchScreen(complete1stTime:boolean) { 

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
                FlipPlusGame.completeLevel(complete1stTime);
        }

        loose() {

            this.gameplayMenu.fadeOut();
            this.boardSprite.lock();
            setTimeout(() => { FlipPlusGame.looseLevel(); }, 3000);;
            this.boardSprite.looseEffect();
        }


        // Items ====================================================================================================================

        useItem(item: string):boolean {
            //if user has iteem
            var itemQuantity = FlipPlusGame.itemsData.getItemQuantity(item)
            if (itemQuantity > 0) {

                //updates data
                FlipPlusGame.itemsData.decreaseItemQuantity(item);
                this.usedItem = item;

                //updates Items buttons labels Quantity on footer
                this.gameplayMenu.updateItemsQuatity();

                return true;
            } else {
                //show a text
                this.popup.showtext(stringResources.gp_noMoreHints);

                return false;
            }
        }

        //skips the level
        useItemSkip() {
            if (!this.useItem("skip")) return;
            if (this.levelData.userdata.skip || this.levelData.userdata.solved) 
                FlipPlusGame.skipLevel(false);
            else
                FlipPlusGame.skipLevel(true);
        }

        //set hint for a block
        useItemHint(blockId?) {

            if (!this.useItem("hint")) return;

            //if the hint block is not pre defined
            if (typeof blockId != "number") {

                //get all inverted blocks
                var filtredInvertedBlocks = [];
                var invertedBlocks = this.levelLogic.board.getInvertedBlocks();
                for (var i in invertedBlocks) {
                    //remove the already hinted from the list
                    if (!this.boardSprite.getBlockById(invertedBlocks[i]).isHintEnabled())
                        filtredInvertedBlocks.push(invertedBlocks[i]);
                }

                //if theres no inverted itens, return
                if (filtredInvertedBlocks.length == 0) return;

                //randomly select one from the list
                var index = Math.floor(Math.random() * filtredInvertedBlocks.length);
                blockId = filtredInvertedBlocks[index];
            }

            //enablehint for the selected block;
            this.boardSprite.getBlockById(blockId).enableHint();
            
        }

        private usesolve() {
            this.win(0,0);
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
            this.boardSprite.y = parameters.y+2048;
            this.boardSprite.scaleX = parameters.scaleX;
            this.boardSprite.scaleY = parameters.scaleY;
            createjs.Tween.get(this.boardSprite).to({ scaleX: 1, scaleY: 1, x: DefaultWidth / 2, y: DefaultHeight / 2 }, 500, createjs.Ease.quadInOut);
        }

        // Screen =================================================================================================================

        public activate(parameters?: any) {

            super.activate(parameters);
            if (parameters) this.animatePuzzle(parameters);

            //updates Items buttons labels Quantity on footer
            this.gameplayMenu.updateItemsQuatity();

        }
    }
}