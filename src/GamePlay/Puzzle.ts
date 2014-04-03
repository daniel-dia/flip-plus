module InvertCross.GamePlay {
    export class Puzzle extends LevelScreen {
        
        constructor(levelData: Projects.Level) {
            super(levelData);

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)

            if (levelData.type == "draw") {
                if (levelData.drawData == null)
                    this.levelLogic.board.setDrawBlocks(levelData.blocksData);
                else
                    this.levelLogic.board.setDrawBlocks(levelData.drawData, false);
            }

            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
                           
        }

    }
}