module FlipPlus.GamePlay.Logic {
    export class Board {

        //board dimension
        public width: number;
        public height: number;

        //blocks data
        public blocks : Array<Array<Block>>;

        //mirrored bloks
        public mirroredBlocks: Array<Block>;

        //hidden blocks
        public hiddenBlocks: Array<Block>;

        //prizes intervals
        public prizes = [];
        
     
        constructor(width: number, height: number) {

            this.width =  width;
            this.height = height;
            
            //create blocks
            this.blocks = [];
            for (var col = 0; col < width; col++) {
                this.blocks[col] = [];
                for (var row = 0; row < height; row++) {
                    var b = new Logic.Block(col, row); 
                    this.blocks[col][row] = b;
                }
            }
        }

        //Verifies if all board are clean
        public verifyClean() {
            var totalState;

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++) {
                    totalState = totalState || this.blocks[col][row].state;
                }

            return !totalState;
        }

        //returns a blocks based on a id
        public getBlockByID(id: number): Block {
            var col = Math.floor(id / this.height);
            var row = id - col * this.height;
            return this.blocks[col][row];
        }

        public getInvertedBlocks(): number[] {
            var result: number[] = [];

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++) {
                    var b: Logic.Block = this.blocks[col][row];
                    if (b.inverted) result.push(row * this.width + col);
                }
            return result;
        }

        public getInvertedBlocksCount(): number {

            if (this.width == 5 && this.height == 5)
                return this.getInvertedCount5x5(this.getInvertedBlocks());
            else
                return this.getInvertedBlocks().length;

        }

        //return the minimal inverted blocks to a solutions in a 5x5 board based on a previously inverted blocks
        private getInvertedCount5x5(invertedBlocks: number[]): number {

            var maxBlocs: number = 25;

            var solutions = [];
            solutions[0] = [true, false, true, false, true, true, false, true, false, true, false, false, false, false, false, true, false, true, false, true, true, false, true, false, true];
            solutions[1] = [false, true, true, true, false, true, false, true, false, true, true, true, false, true, true, true, false, true, false, true, false, true, true, true, false];
            solutions[2] = [true, true, false, true, true, false, false, false, false, false, true, true, false, true, true, false, false, false, false, false, true, true, false, true, true];
            solutions[3] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

            var blocksArray: boolean[] = [];
            var invertsCount: number[] = [];

            for (var s = 0; s < maxBlocs; s++) blocksArray[s] = false;
            for (var i = 0; i < invertedBlocks.length; i++) blocksArray[invertedBlocks[i]] = true;

            
            //verifies for each solutions
            for (var s = 0; s < solutions.length; s++) {
                var sol: boolean[] = solutions[s];
                invertsCount[s] = 0;
                for (var i = 0; i < maxBlocs; i++) if (blocksArray[i]) sol[i] = !sol[i]
                for (var i = 0; i < maxBlocs; i++) if (sol[i]) invertsCount[s]++;
            }

            var result: number = maxBlocs;

            for (var s = 0; s < solutions.length; s++)
                if (invertsCount[s] < result) result = invertsCount[s];

            return result;

        }

        public setInvertedBlocks(invertedBlocks:Array<number>,prizesCount :number =2){
            var i: number = 0;

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++) {
                this.blocks[col][row].inverted = false;
                this.blocks[col][row].state = false;
            }

            if (invertedBlocks) {
                for (var i: number = 0; i < invertedBlocks.length; i++) {
                    var row = Math.floor(invertedBlocks[i] / this.width);
                    var col = invertedBlocks[i] - row * this.width;
                    if(col<this.width && row < this.height)
                    this.invertCross(col, row);
                }
                this.initializePrizes(prizesCount, invertedBlocks.length);
            }
        }

        public setDrawBlocks(drawBlocks: number[],cross:boolean=true) {
            var i: number = 0;

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++)
                    this.blocks[col][row].draw = false;
                
            if(drawBlocks)
            for (var i: number = 0; i < drawBlocks.length; i++) {
                var block = this.getBlockByID(drawBlocks[i]);
                this.invertDraw(block.col, block.row, cross);
            }
        }

        public setMirrorBlocks(mirroredBlocks: Array<number>) {

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++)
                    this.blocks[col][row].mirror = false;

            this.mirroredBlocks= new Array();

            if (mirroredBlocks)
                for (var i: number = 0; i < mirroredBlocks.length; i++) {
                    var block = this.getBlockByID(mirroredBlocks[i]);
                    this.mirroredBlocks.push(block);
                    block.mirror = true;
                }
        }

        public setHiddenBlocks(hiddenBlocks: Array<number>) {

            for (var col = 0; col < this.width; col++)
                for (var row = 0; row < this.height; row++)
                    this.blocks[col][row].hidden = false;

            this.hiddenBlocks = new Array();

            if (hiddenBlocks)
                for (var i: number = 0; i < hiddenBlocks.length; i++) {
                    var block = this.getBlockByID(hiddenBlocks[i]);
                    this.hiddenBlocks.push(block);
                    block.hidden = true;
                }
        }
        
        //Distribuite Prizes Along Board
        public initializePrizes(prizesNumber: number, minMoves: number = 0) {

            if (0 == minMoves)
                minMoves = this.getInvertedBlocks().length;

            if (prizesNumber < 1) return;

            var interval = minMoves / (prizesNumber + 1)

            for (var i = 0; i < prizesNumber; i++) {
                var val = (prizesNumber - i) * interval;
                val = minMoves - val;
                val = Math.floor(val);
                this.prizes.push(val);
            }
        }

        ///Invert a cross into the board
        public invertCross(col, row) {
            
            //invert flag
            this.blocks[col][row].toggleInverted();

            var blocks = this.getCrossToInvert(col, row);

            this.invertBlocks(blocks);
            this.mirrorBlocks(blocks);
            
        }

        private invertBlocks(blocks:Array<Block>) {
            //invert all blocks
            for (var b in blocks) 
                blocks[b].toggleState();
        }

        private mirrorBlocks(blocks: Array<Block>) {
            for (var b in blocks)

                if (blocks[b].mirror) {
                    for (var m in this.mirroredBlocks)
                        this.mirroredBlocks[m].toggleState();

                    return;
                }
        }

        //inverts all mirroered blocks
        private mirrorBlock(block: Block): boolean {

            //if block is mirrored, invert all related
            return block.mirror;
        }


        private getCrossToInvert(col, row): Array<Block> {
            var toInvert: Array<Block> = [];

            //invert block state
            toInvert.push(this.blocks[col][row]);

            //invert cross neighbor
            if (col > 0) toInvert.push(this.blocks[col - 1][row]);
            if (col < this.width - 1) toInvert.push(this.blocks[col + 1][row]);
            if (row < this.height - 1) toInvert.push(this.blocks[col][row + 1]);
            if (row > 0) toInvert.push(this.blocks[col][row - 1]);


            return toInvert;
        }



        ///Invert a cross into the board
        public invertDraw(col, row,cross:boolean=true) {

            //invert block state
            this.blocks[col][row].toggleDraw();

            if (!cross) return;

            //invert cross neighbor
            if (col > 0) this.blocks[col - 1][row].toggleDraw();
            if (col < this.width - 1) this.blocks[col + 1][row].toggleDraw();

            if (row < this.height - 1) this.blocks[col][row + 1].toggleDraw();
            if (row > 0) this.blocks[col][row - 1].toggleDraw();
        }

    }
}