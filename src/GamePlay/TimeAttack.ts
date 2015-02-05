declare var Timer;
declare var TimerEvent;

module FlipPlus.GamePlay { 

    export class TimeAtack extends LevelScreen {
         
        private currentPuzzle: number = 1;
        private puzzlesToSolve: number = 0;
        private currentTime;
        private timer;

        constructor(levelData: Projects.Level) {
            super(levelData);

            this.gameplayMenu.addButtons(["skip", "time", "solve", "hint"]);
            this.gameplayMenu.addEventListener("skip", () => { this.useItemSkip(); });
            this.gameplayMenu.addEventListener("time", () => { this.useItemTime(); });
            this.gameplayMenu.addEventListener("solve", () => { this.useItemSolve(); });
            this.gameplayMenu.addEventListener("hint", () => { this.useItemHint(); })
                                                
            this.puzzlesToSolve = levelData.puzzlesToSolve;
            this.currentTime = levelData.time;

            this.randomBoard(levelData.randomMinMoves,levelData.randomMaxMoves); 

            this.statusArea.setMode("time");
            this.statusArea.setText3(levelData.time.toString());

            this.createsTimer();

        }

        public createsTimer() {
            //Creates Timer
            this.timer = new Timer(1000);

            this.timer.addEventListener(TimerEvent.TIMER, (e) => {
                this.currentTime--;
                this.statusArea.setText3(this.currentTime.toString());
                if (this.currentTime <= 0) {

                    // play sound
                    gameui.AudiosManager.playSound("Power Down");
                    this.statusArea.setText3(stringResources.gp_pz_statusEnd);
                    
                    this.message.showtext(stringResources.gp_pz_timeUP);
                    this.loose();

                    this.timer.stop();
                }
                if (this.currentTime == 4) {
                    // play sound
                    gameui.AudiosManager.playSound("Ticking Clock");
                }
            });
        }

        public desactivate() {
            this.timer.stop();
        }

        //Overriding methods.
        public win(col: number, row: number) {

            if (this.currentPuzzle >= this.puzzlesToSolve) {
                this.timer.stop();
                super.win(col, row);
            }
            else {

                //animate board and switch
                var defaultX = this.boardSprite.x;
                createjs.Tween.removeTweens(this.boardSprite);
                createjs.Tween.get(this.boardSprite).to({ x: defaultX-defaultWidth }, 250, createjs.Ease.quadIn).call(() => {

                    this.currentPuzzle++;
                    this.boardSprite.clearHint();
                    this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves); 
                    
                    this.boardSprite.x = defaultX + defaultWidth;
                    createjs.Tween.get(this.boardSprite).to({ x: defaultX }, 250, createjs.Ease.quadOut)
                })

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
        
        private randomBoard(minMoves: number = 2, maxMoves: number = 5) {

            this.statusArea.setText1(this.currentPuzzle.toString() + "/" + this.puzzlesToSolve.toString());

            var moves :number = Math.floor(Math.random() * (maxMoves - minMoves)) + minMoves;
            var lenght: number = this.levelLogic.board.width * this.levelLogic.board.height;
            var inverted: boolean[] = [];

            for (var m = 0; m < moves; m++) {
                var index = Math.floor(Math.random() * (lenght));
                while (inverted[index] == true) index = (index+1) % lenght;
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

        private useItemSolve() {
            if (!this.useItem("solve")) return;
            this.win(0,0);
        }

        private useItemTime() {
            if (!this.useItem("time")) return;
            this.currentTime += 10;
        }

        activate(parameters?: any) {
            super.activate();

            this.boardSprite.visible = false;
            //shows popup
            this.popup.showTimeAttack(stringResources.b1_popup1Ttitle,stringResources.gp_pz_Popup1Text1, this.levelData.puzzlesToSolve.toString(), this.levelData.time.toString(),stringResources.gp_pz_Popup1Text2,stringResources.gp_pz_Popup1Text3); 
            this.popup.addEventListener("onclose", () => {

                this.boardSprite.visible = true;
                //shows puzzle
                if (parameters) this.animatePuzzle(parameters);
                this.timer.start();
            });


        }
    }
}