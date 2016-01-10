declare var Timer;
declare var TimerEvent;

module FlipPlus.GamePlay { 

    export class LevelAction extends LevelTimeAttack {

        

        protected createNewPuzzle(currentPuzzle: number) {

            

            this.boardSprite.clearHint();
            var puzzle = this.levelData.actionPuzzles[currentPuzzle];
            
            // create new puzzle

            this.createBoardSprite(puzzle.width, puzzle.height, puzzle.color, puzzle.invertedBlocks, "action");

            if (puzzle.invertedBlocks)
                this.levelLogic.board.setInvertedBlocks(puzzle.invertedBlocks)
            else
                this.randomBoard(puzzle.randomMinMoves, puzzle.randomMaxMoves);
        }


    }
}