module FlipPlus.GamePlay {
    export class Puzzle extends LevelScreen {
        
        constructor(levelData: Projects.Level) {
            super(levelData);

            if (levelData.customItems)
                this.gameplayMenu.addButtons(levelData.customItems);
            else
                this.gameplayMenu.addButtons(["skip", "hint"]);

            this.gameplayMenu.addEventListener("skip", (parameter) => { this.useItemSkip(); });
            this.gameplayMenu.addEventListener("hint", (parameter) => { this.useItemHint((<any>parameter).target); });

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

    }
}