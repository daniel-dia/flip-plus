declare var Timer;
declare var TimerEvent;

module FlipPlus.GamePlay { 

    export class LevelTimeAttack extends LevelScreen {
         
        protected currentPuzzle: number = 1;
        protected puzzlesToSolve: number = 0;
        protected currentTime;
        protected timer;

        constructor(levelData: Levels.Level) {
            super(levelData);
            this.createMenu();
            this.startGame(levelData);
         }

        private createsTimer() {
            //Creates Timer
            this.timer = new Timer(1000);

            this.timer.addEventListener(TimerEvent.TIMER, (e) => {
                this.currentTime--;
                this.statusArea.setText3(this.currentTime.toString());
                if (this.currentTime <= 0) {

                    // suggest more time
                    this.timer.stop();
                    this.boardSprite.mouseEnabled = false;
                    this.popupHelper.showItemMessage(Items.TIME, this.getItemPrice(Items.TIME),
                        () => {
                            this.useItem(Items.TIME);
                            this.boardSprite.mouseEnabled = true;
                            this.timer.start();
                        },
                        () => {
                            gameui.AudiosManager.playSound("Power Down");
                            this.statusArea.setText3(StringResources.gp_pz_statusEnd);
                            this.message.showtext(StringResources.gp_pz_timeUP);
                            this.loose();
                        });

 
                }
                if (this.currentTime == 4) {
                    // play sound
                    gameui.AudiosManager.playSound("Ticking Clock");
                }
            });
        }

        private createMenu() {
            this.gameplayMenu.addItemsButtons([Items.SOLVE, Items.HINT]);
            this.gameplayMenu.addEventListener(Items.SKIP, () => { this.useItem(Items.SKIP); });
            this.gameplayMenu.addEventListener(Items.TIME, () => { this.useItem(Items.TIME); });
            this.gameplayMenu.addEventListener(Items.SOLVE, () => { this.useItem(Items.SOLVE); });
            this.gameplayMenu.addEventListener(Items.HINT, () => { this.useItem(Items.HINT); })
        }
        
        protected showNextPuzzle() {
            //animate board and switch
            var defaultX = this.boardSprite.x;
            createjs.Tween.removeTweens(this.boardSprite);
            createjs.Tween.get(this.boardSprite).to({ x: defaultX - defaultWidth }, 250, createjs.Ease.quadIn).call(() => {

                // update overlay
                this.statusArea.setText1(this.currentPuzzle.toString() + "/" + this.puzzlesToSolve.toString());

                // remove the current board
                
                // updates logic
                this.currentPuzzle++;
                this.createNewPuzzle(this.currentPuzzle);

                // creates a new board



                this.boardSprite.x = defaultX + defaultWidth;
                createjs.Tween.get(this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut)
            })
        }

        protected createNewPuzzle(currentPuzzle:number) {
            this.boardSprite.clearHint();

            // calculate new inverts
            this.levelLogic.board.setRandomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves)

            // create new board sprite
            this.createBoardSprite(this.levelData.width, this.levelData.height, this.levelData.theme);
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

        }
        
        private startGame(levelData: Levels.Level) {
            this.puzzlesToSolve = levelData.puzzlesToSolve;
            this.currentTime = levelData.time;
            this.currentPuzzle = 1;

            this.createNewPuzzle(this.currentPuzzle);

            this.statusArea.setMode(Items.TIME);
            this.statusArea.setText3(levelData.time.toString());

            this.createsTimer();
        }

        public desactivate() {
            this.timer.stop();
        }

        //Overriding methods.
        protected win(col: number, row: number) {

            if (this.currentPuzzle >= this.puzzlesToSolve) {
                this.timer.stop();
                super.win(col, row);
            }
            else {
                this.showNextPuzzle();
            }
        }
     
        public pauseGame() {
            super.pauseGame();
            this.timer.stop();
        }

        public unPauseGame() {
            super.unPauseGame();
            this.timer.start();
        }
 
        protected useItemTime() {
            this.currentTime += 10;
        }

        activate(parameters?: any) {
            super.activate();

            this.boardSprite.visible = false;
            //shows popup
            this.popup.showTimeAttack( this.levelData.time.toString(), this.levelData.puzzlesToSolve.toString()); 
            this.popup.addEventListener("onclose", () => {

                this.boardSprite.visible = true;
                //shows puzzle
                if (parameters) this.animatePuzzle(parameters);
                this.timer.start();
            });


        }
    }
}

