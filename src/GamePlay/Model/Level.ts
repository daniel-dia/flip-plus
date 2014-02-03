/// <reference path="Board.ts" />


module InvertCross.GamePlay.Model {

    //Model
    export class Level {

        public board: Model.Board;

        //Definitions
        private static movePoint = -5;
        private static timePoint = -6;
        private static prizesPoint = 100;
        private static endPoint = 1000;

        //Level Data colections
        public moves: number = 0;
        public earnedPrizes: number = 0;
        public timeSpent: number = 0;
        public points: number = 0;

        //reference
        private level: Projects.Level;

        //Initialization methodos ============================================================================================================
        
        constructor(leveldata:Projects.Level) {
            
            //creates a board
            this.board = new Model.Board(leveldata.width, leveldata.height);
        }

        //Model methods =======================================================================================================================

        public getBlocks(): any {
            return this.board.blocks;
        }

        public invertCross(col, row) {
            this.board.invertCross(col,row);
        }
         
       // verify somethings ==================================================================================================================
        
        public verifyPrize() : boolean{
            var invertedCount: number = this.board.getInvertedBlocksCount();
            var goal = this.board.prizes[this.board.prizes.length-1]
            if (invertedCount <= goal) return true;
            else return false;
        }
       
        public verifyWin() :boolean {
            return this.board.verifyClean();
        }

        // GamePlay methods ===================================================================================================================

        public earnPrize() {

            this.board.prizes.pop();
            this.earnedPrizes++;
        }
    }
}