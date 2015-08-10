module FlipPlus.GamePlay {
    export class Puzzle extends LevelScreen {

        // help
        private helped: boolean;

        constructor(levelData: Projects.Level) {
            super(levelData);

            if (levelData.customItems)
                this.gameplayMenu.addButtons(levelData.customItems);
            else
                this.gameplayMenu.addButtons([Items.SKIP, Items.HINT]);

            this.gameplayMenu.addEventListener(Items.SKIP, (parameter) => { this.useItemSkip(); });
            this.gameplayMenu.addEventListener(Items.HINT, (parameter) => { this.useItemHint((<any>parameter).target); });

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)

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

            var plays = this.levelData.userdata.playedTimes;
            var invertsInitial = this.levelData.blocksData.length;
            var inverts = this.levelLogic.board.getInvertedBlocksCount();

            // verify if user went too far from solution.
            if (inverts > invertsInitial * 2) {
                // verifies if user play a the same level lot of times
                if (plays > 2) {
                    // send message to ask to skip
                    this.showSkipMessage();
                    this.helped = true;
                }
                else {
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
            this.popupHelper.showItemMessage(Items.SKIP, this.getItemPrice(Items.SKIP), () => { }, () => { this.useItemSkip() },"menu/imskip" );
        }
        // #endregion

    }
}