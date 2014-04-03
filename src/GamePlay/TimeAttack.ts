declare var Timer;
declare var TimerEvent;

module InvertCross.GamePlay { 

    export class TimeAtack extends LevelScreen {
         
        private currentPuzzle: number = 1;
        private puzzlesToSolve: number = 0;
        private currentTime;
        private timer;

        constructor(levelData: Projects.Level) {
            super(levelData);

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
                    this.statusArea.setText3("END");
                    // this.boardSprite.visible = false;

                    this.message.showtext("Time's up");
                    this.loose();

                    this.timer.stop();
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
                createjs.Tween.get(this.boardSprite).to({ x: defaultX-DefaultWidth }, 250, createjs.Ease.quadIn).call(() => {
                 //   this.boardSprite.radiusEffect(col, row);
                    this.currentPuzzle++;
                    this.randomBoard(this.levelData.randomMinMoves, this.levelData.randomMaxMoves); 
                    this.boardSprite.x = defaultX + DefaultWidth;
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

        activate(parameters?: any) {
            super.activate();

            this.boardSprite.visible = false;
            //shows popup
            this.popup.showTimeAttack("Time Attack", "Solve ", this.levelData.puzzlesToSolve.toString(), this.levelData.time.toString()); 
            this.popup.addEventListener("onclose", () => {

                this.boardSprite.visible = true;
                //shows puzzle
                if (parameters) this.animatePuzzle(parameters);
                this.timer.start();
            });


        }
    }
}