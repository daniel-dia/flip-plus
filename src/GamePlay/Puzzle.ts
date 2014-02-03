/// <reference path="../../lib/easeljs.d.ts" /> 
/// <reference path="../../lib/soundjs.d.ts" /> 

/// <reference path="Views/Overlay.ts" />
/// <reference path="Views/BoardSprite.ts" />

/// <reference path="Model/Board.ts" />
 
/// <reference path="../../Gbase/ScreenState.ts" /> 

module InvertCross.GamePlay {
    export class Puzzle extends LevelScreen {
        
        constructor(levelData: Projects.Level) {
            super(levelData);

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)

            if (levelData.type == "draw") {
                if (levelData.drawData == null)
                    this.levelLogic.board.setDrawBlocks(levelData.blocksData);
                else
                    this.levelLogic.board.setDrawBlocks(levelData.drawData,false);
            }

            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            this.popup.showtext("fill this board", 3000);
        }
    }
}