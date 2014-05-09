module InvertCross.GamePlay {
    export class Moves extends LevelScreen {

        private moves;
        private currentPuzzle: number = 1;
        private puzzlesToSolve: number = 0;

        private lastTouchTime;

        constructor(levelData: Projects.Level) {
            super(levelData);

            this.puzzlesToSolve = levelData.puzzlesToSolve;
            this.moves = this.levelData.moves;

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)

            if (levelData.type == "draw") {
                if (levelData.drawData == null)
                    this.levelLogic.board.setDrawBlocks(levelData.blocksData);
                else
                    this.levelLogic.board.setDrawBlocks(levelData.drawData,false);
            }

            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            
            //set default puzzles to solve
            if (!this.levelData.puzzlesToSolve) this.levelData.puzzlesToSolve = 1;
            this.popup.showTimeAttack("Flip Challenge","Solve", this.levelData.puzzlesToSolve.toString(), this.levelData.moves.toString(),"boards in ","flips"); 

            this.statusArea.setMode("moves");
            this.statusArea.setText3(this.moves.toString());
        }


        //threat user input
        public userInput(col: number, row: number) {
            super.userInput(col, row);


                //verifies if is a multiTouch
            if (Date.now() - this.lastTouchTime > 100 || !this.lastTouchTime)    
                this.moves--;
                
            this.lastTouchTime = Date.now();

            setTimeout(() => {
                //loses game, if moves is over
                if (!this.levelLogic.verifyWin()) {

                    this.statusArea.setText3(this.moves.toString());

                    if (this.moves <= 0) {
                        this.message.showtext("no more moves");
                        this.loose();
                    }
                }
            }, 100);
        }

        //Overriding methods.
        public win(col: number, row: number) {

            if (this.currentPuzzle >= this.puzzlesToSolve) {
                super.win(col, row);
            }
            else {

                //animate board and switch
                var defaultX = this.boardSprite.x;
                createjs.Tween.get(this.boardSprite).to({ x: defaultX - DefaultWidth }, 250, createjs.Ease.quadIn).call(() => {
                    this.currentPuzzle++;
                    this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves);
                    this.boardSprite.x = defaultX + DefaultWidth;
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut)
                })

            }
        }


        private randomBoard(minMoves: number = 2, maxMoves: number = 5) {

            this.statusArea.setText1(this.currentPuzzle.toString() + "/" + this.puzzlesToSolve.toString());

            var moves: number = Math.floor(Math.random() * (maxMoves - minMoves)) + minMoves;
            var lenght: number = this.levelLogic.board.width * this.levelLogic.board.height;
            var inverted: boolean[] = [];

            for (var m = 0; m < moves; m++) {
                var index = Math.floor(Math.random() * (lenght));
                while (inverted[index] == true) index = (index + 1) % lenght;
                inverted[index] = true;
            }

            for (var i = 0; i < lenght; i++) {
                if (inverted[i] == true)
                    this.levelLogic.board.invertCross(
                        i % this.levelLogic.board.width,
                        Math.floor(i / this.levelLogic.board.width)
                        );
            }

            this.levelLogic.board.initializePrizes(2);
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
        }

    }
}