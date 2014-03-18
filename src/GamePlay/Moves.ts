module InvertCross.GamePlay {
    export class Moves extends LevelScreen {

        private moves;
        
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

            this.moves = this.levelData.moves;

            this.popup.showtext("Solve this board with " +this.levelData.moves + " flips", 3000);


            this.statusArea.setMode("moves");
            this.statusArea.setText3(this.moves.toString());
        }


        //threat user input
        public userInput(col: number, row: number) {
            super.userInput(col, row);

            //loses game, if moves is over
            if (!this.levelLogic.verifyWin()) {
                this.moves--;
                this.statusArea.setText3(this.moves.toString());

                if (this.moves <= 0)
                    this.loose();
            }
            
        }
    }
}