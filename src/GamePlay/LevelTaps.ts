module FlipPlus.GamePlay {
    export class LevelTaps extends LevelScreen {

        private moves;
        private currentPuzzle: number = 1;
        private puzzlesToSolve: number = 0;

        private lastTouchTime;

        constructor(levelData: Projects.Level) {
            super(levelData);
            

            
            //only adds this level if there are more than 1 puzzle to solve
            this.gameplayMenu.addItemsButtons([Items.SKIP]);

            if (this.levelData.puzzlesToSolve > 1) 
                this.gameplayMenu.addItemsButtons([Items.SOLVE]);
            
            //adds buttons and items
            this.gameplayMenu.addItemsButtons([Items.TAP, Items.HINT]);


            this.gameplayMenu.addEventListener(Items.TAP, () => { this.useItem(Items.TAP) });
            this.gameplayMenu.addEventListener(Items.SOLVE, () => { this.useItem(Items.SOLVE); })
            this.gameplayMenu.addEventListener(Items.HINT, () => { this.useItem(Items.HINT); })
            this.gameplayMenu.addEventListener(Items.SKIP, () => { this.useItem(Items.SKIP); })

            this.moves = this.levelData.moves;

            if (levelData.blocksData && levelData.blocksData.length>0) {
                this.levelLogic.board.setInvertedBlocks(levelData.blocksData)
                this.levelData.puzzlesToSolve = 1;
            }
            else {
                
                if (!this.levelData.puzzlesToSolve) this.levelData.puzzlesToSolve = 1;
                this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves);

            }

            
            this.puzzlesToSolve = levelData.puzzlesToSolve;

            

            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            
            //set default puzzles to solve
            //this.popup.showTimeAttack(StringResources.gp_mv_Popup1Title, StringResources.gp_mv_Popup1Text1, this.levelData.moves.toString(), this.levelData.puzzlesToSolve.toString(), StringResources.gp_mv_Popup1Text2, StringResources.gp_mv_Popup1Text3); 
            this.popup.showTaps(this.levelData.moves.toString()); 

            
            this.statusArea.setMode("moves");
            this.statusArea.setText3(this.moves.toString());
        }


        //threat user input
        private loosing = false;
        public userInput(col: number, row: number) {
            super.userInput(col, row);

            
            if (!this.levelLogic.verifyWin()) {
                //verifies if is a multiTouch
                if (Date.now() - this.lastTouchTime > 110 || !this.lastTouchTime)
                    this.moves--;

                this.lastTouchTime = Date.now();

                
                setTimeout(() => {
                    if (!this.loosing)
                        if (!this.levelLogic.verifyWin()) {
                            //loses game, if moves is over
                            if (this.moves <= 0) {
                                this.message.showtext(StringResources.gp_mv_noMoreMoves);
                                
                                // play sound
                                gameui.AudiosManager.playSound("Power Down");
                                
                                this.loose();
                                this.loosing = true;
                            }
                    }
                },110)
            }

            //updates moves count
            this.statusArea.setText3(this.moves.toString());

            
        }

        //Overriding methods.
        public win(col: number, row: number) {

            if (this.currentPuzzle >= this.puzzlesToSolve) {
                super.win(col, row);
            }
            else {

                //animate board and switch
                var defaultX = this.boardSprite.x;
                createjs.Tween.get(this.boardSprite).to({ x: defaultX - defaultWidth }, 250, createjs.Ease.quadIn).call(() => {
                    this.currentPuzzle++;
                    this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves);
                    this.boardSprite.clearHint();

                    this.boardSprite.x = defaultX + defaultWidth;
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
            this.moves += 2;
        }
    }
}