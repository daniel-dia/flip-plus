module FlipPlus.GamePlay {
    export class Moves extends LevelScreen {

        private moves;
        private currentPuzzle: number = 1;
        private puzzlesToSolve: number = 0;

        private lastTouchTime;

        constructor(levelData: Projects.Level) {
            super(levelData);
            

            //adds buttons and items
            this.gameplayMenu.addButtons(["touch", "hint"]);

            //only adds this level if there are more than 1 puzzle to solve
            if (this.levelData.puzzlesToSolve > 1) 
                this.gameplayMenu.addButtons(["solve"]);
            else
                this.gameplayMenu.addButtons(["skip"]);

            this.gameplayMenu.addEventListener("touch", () => { this.useItemTouch()});
            this.gameplayMenu.addEventListener("solve", () => { this.useItemSolve(); })
            this.gameplayMenu.addEventListener("hint", () => { this.useItemHint(); })
            this.gameplayMenu.addEventListener("skip", () => { this.useItemSkip(); })
    
            this.puzzlesToSolve = levelData.puzzlesToSolve;
            this.moves = this.levelData.moves;

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)

            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            
            //set default puzzles to solve
            if (!this.levelData.puzzlesToSolve) this.levelData.puzzlesToSolve = 1;
            this.popup.showTimeAttack(stringResources.gp_mv_Popup1Title, stringResources.gp_mv_Popup1Text1, this.levelData.puzzlesToSolve.toString(), this.levelData.moves.toString(), stringResources.gp_mv_Popup1Text2, stringResources.gp_mv_Popup1Text3); 

            this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves);

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

            //updates moves count
            this.statusArea.setText3(this.moves.toString());

            setTimeout(() => {
                //loses game, if moves is over
                if (!this.levelLogic.verifyWin()) {


                    if (this.moves < 0) {
                        this.message.showtext(stringResources.gp_mv_noMoreMoves);
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
                    this.boardSprite.clearHint();

                    this.boardSprite.x = defaultX + DefaultWidth;
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut)
                })

            }
        }


        private randomBoard(minMoves: number = 2, maxMoves: number = 5) {
            if (!this.puzzlesToSolve) this.puzzlesToSolve = 1;
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


        //========================== items ==================================
        private useItemTouch() {
            if (!this.useItem("touch")) return;
            this.moves += 2;
        }
        private useItemSolve() {
            if (!this.useItem("solve")) return;
            this.win(0, 0);
        }

    }
}