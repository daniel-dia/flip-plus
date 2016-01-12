declare var Timer;
declare var TimerEvent;

module FlipPlus.GamePlay { 

    export class LevelAction extends LevelTimeAttack {

        constructor(levelData: Levels.Level) {
            levelData.puzzlesToSolve = levelData.actionPuzzles.length;
            super(levelData);
        }

        protected createNewPuzzle(currentPuzzle: number) {

            this.boardSprite.clearHint();

            // get current puzzle
            var puzzle = this.levelData.actionPuzzles[currentPuzzle-1];
            
            // recreates the level logic
            this.levelLogic.board = new Logic.Board(puzzle.width, puzzle.height);

            // set puzzle blocks new puzzle
            if (puzzle.invertedBlocks)
                this.levelLogic.board.setInvertedBlocks(puzzle.invertedBlocks)
            else
                this.levelLogic.board.setRandomBoard(puzzle.randomMinMoves, puzzle.randomMaxMoves);

            // create new board sprite view
            this.createBoardSprite(puzzle.width, puzzle.height, puzzle.color || "green");
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

        }


    }
}