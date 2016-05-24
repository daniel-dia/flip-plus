module FlipPlus.GamePlay {
    export class LevelPuzzle extends LevelScreen {

        // help
        private helped: boolean;
        private initialInvertedBlocks;

        constructor(levelData: Levels.Level) {
            super(levelData);

            if (levelData.customItems)
                this.gameplayMenu.addItemsButtons(levelData.customItems);
            else
                this.gameplayMenu.addItemsButtons([Items.HINT]);

            this.gameplayMenu.addEventListener(Items.SKIP, (parameter) => { this.useItem(Items.SKIP); });
            this.gameplayMenu.addEventListener(Items.HINT, (parameter) => { this.useItem(Items.HINT,(<any>parameter).parameters); }); //solve this problem

            if (levelData.blocksData) 
                this.levelLogic.board.setInvertedBlocks(levelData.blocksData)
            else
                levelData.blocksData = [];

            this.initialInvertedBlocks = levelData.blocksData;

            if (levelData.randomMinMoves && levelData.randomMaxMoves) {
                this.initialInvertedBlocks = this.levelLogic.board.setRandomBoard(levelData.randomMinMoves, levelData.randomMaxMoves);
            }

            //draw blocks
            if (levelData.type == "draw" &&  levelData.drawData == null)
                this.levelLogic.board.setDrawBlocks(levelData.blocksData);   
                          
            if (levelData.drawData) this.levelLogic.board.setDrawBlocks(levelData.drawData, true);

            //Mirror Blocks
            if (levelData.mirroredBlocks)
                this.levelLogic.board.setMirrorBlocks(levelData.mirroredBlocks);

            //hidden Blocks
            if (levelData.hiddenBlocks)
                this.levelLogic.board.setHiddenBlocks(levelData.hiddenBlocks);

            //TODO
            if(levelData)
                this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                           
        }

        // handles user input
        public userInput(col: number, row: number) {
            super.userInput(col, row);
            this.trySuggestHelp();
        }


        // #region  Helpers ==================================================================================================================
        
        // user helper
        private trySuggestHelp() {
            if (this.helped) return;

            var plays = this.levelData.userdata.playedTimes-1;
            var invertsInitial = this.initialInvertedBlocks.length;
            var inverts = this.levelLogic.board.getInvertedBlocksCount();

            // verify if user went too far from solution.
            if (inverts > invertsInitial * 2) {
                // verifies if user play a the same level lot of times
                if (plays > 3 && plays <= 5) {
                    // send message to ask to skip
                    this.showSkipMessage();
                    this.helped = true;
                }
                else if (plays >1 && plays <=3) {
                    // show message to ask restart
                    this.showHintMessage();
                    this.helped = true;
                }
                else if (plays <= 1) {
                    // show message to ask restart
                    this.showRestartMessage();
                    this.helped = true;
                }
            }
        }

        // show a message asking for user to restart
        private showRestartMessage() {
            this.popupHelper.showRestartMessage();
        }

        // show a message asking for user to skip
        private showSkipMessage() {
            this.popupHelper.showItemMessage(Items.SKIP, this.getItemPrice(Items.SKIP), () => { this.useItem(Items.SKIP) }, () => { }, "menu/imskip");
        }

        // show a message asking for user to hint
        private showHintMessage() {
            this.popupHelper.showItemMessage(Items.HINT, this.getItemPrice(Items.HINT), () => { this.useItem(Items.HINT) }, () => { }, "menu/imitem");
        }

        // #endregion

    }
}