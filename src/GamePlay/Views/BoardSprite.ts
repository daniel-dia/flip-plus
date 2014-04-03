module InvertCross.GamePlay.Views {
    export class BoardSprite extends createjs.Container {
        
        public blocksSprites:BlockSprite[][];
        private boardWidth :number;
        private boardHeight:number;
        private fx: InvertCross.Effects;
        private previousSound: number = 1;
        private locked = false;

        private callback: (col: number, row: number) => void;

        //indicator
        private tutorialIndiatcor: createjs.Sprite;

        constructor(levelWidth: number, levelHeight: number, levelTheme: string,levelType:string) {
            super();

            this.addBlocks(levelWidth, levelHeight, levelTheme, levelType);
            this.boardHeight = levelHeight;
            this.boardWidth = levelWidth;

            this.initializeEffects();

            //Positioning board
            var boardHeight = levelHeight * BlockSprite.defaultBlockSize;
            var boardWidth = levelWidth * BlockSprite.defaultBlockSize;

            this.regX =  boardWidth / 2;
            this.regY = boardHeight / 2;

            //load click indicator
            this.tutorialIndiatcor = Assets.getMovieClip("touch");
            this.tutorialIndiatcor.regX = this.tutorialIndiatcor.regY = -85;
            this.tutorialIndiatcor.mouseEnabled = false;
            this.addChild(this.tutorialIndiatcor);
            this.tutorialIndiatcor.visible = false;


        }

        //initializes the effectss sprites
        public initializeEffects() {
            this.fx = new InvertCross.Effects();
            this.addChild(this.fx);
        }

        //creates and add all blocks to the boardh
        private addBlocks(width: number, height: number, theme: string,levelType:string) {
            this.blocksSprites = [];

            //todo:  Talvez esse trecho não seja de responsabilidade do ThemeLoader
            for (var col = 0; col < width; col++) {
                this.blocksSprites[col] = [];
                for (var row = 0; row < height; row++) {

                    //Creates block Sprite
                    var blockSprite:BlockSprite = new BlockSprite(col,row,theme,levelType);

                    this.blocksSprites[col][row] = blockSprite;

                    //Add it to the board sprite
                    this.addChild(blockSprite);

                    //Add event listener to the boardSprite
                    blockSprite.addEventListener("click", (event: createjs.MouseEvent) => {
                        
                        if (this.locked) return;

                        var b: BlockSprite = <BlockSprite>event.target;
                        this.callback(b.col, b.row);
                                                                        
                        // play a Radom Sounds
                        var randomsound = Math.ceil(Math.random() * 3)
                        if (randomsound >= this.previousSound) randomsound++;
                        InvertCross.Assets.playSound("tile" + randomsound);
                        this.previousSound = randomsound;

                        //tutorialrelease
                        if (b.tutorialHighLighted) {

                            this.tutorialRelease();
                            this.dispatchEvent("ontutorialclick");
                        }

                    });

                    //moouse down
                    blockSprite.addEventListener("mousedown", (event: createjs.MouseEvent) => {
                        if (this.locked) return;
                        this.preInvertCross(<BlockSprite>event.target);
                    });

                    
                    //mouse up
                    blockSprite.addEventListener("pressup", (event: createjs.MouseEvent) => {
                        this.preInvertRelease(<BlockSprite>event.target);
                    });


                }
            }
        }

        //updates sprites in the board
        public updateSprites(blocks:Model.Block[][]) {
            for (var col = 0; col < this.blocksSprites.length; col++)
                for (var row = 0; row < this.blocksSprites[col].length; row++)
                    this.blocksSprites[col][row].updateSprite(blocks[col][row]);
        }

        //creates user input callback to the level
        public addInputCallback(callback: (col: number, row: number) => void) {
            this.callback = callback;
        }

        //retuns a blocks by a absolute ID
        public getBlockById(id: number) :BlockSprite{
            return this.blocksSprites[Math.floor(id / this.boardWidth)][id % this.boardHeight];
        }

        //===================================================  Tutorial =================================================================

        public tutorialHighlightBlocks(blockId: number) {
            var blocksCount = this.boardWidth * this.boardHeight;
        
            for (var b = 0; b < blocksCount; b++) {
                var block = this.getBlockById(b);
                block.tutorialLock();
            }
        
            var block = this.getBlockById(blockId);
            block.tutorialHighLight();

            this.tutorialIndiatcor.visible = true;
            this.tutorialIndiatcor.x = block.x;
            this.tutorialIndiatcor.y = block.y;
            
        }


        public tutorialRelease() {
            var blocksCount = this.boardWidth * this.boardHeight;

            for (var b = 0; b < blocksCount; b++) {
                var block = this.getBlockById(b);
                block.tutorialUnlock();
            }


            this.tutorialIndiatcor.visible = false;


        }

        public tutorialLockBlocks() {
            var blocksCount = this.boardWidth * this.boardHeight;

            for (var b = 0; b < blocksCount; b++) {
                var block = this.getBlockById(b);
                block.tutorialLock();
            }
        }

        //===================================================  Effects  =================================================================

        public preInvertCross(blockSP: BlockSprite) {

            blockSP.animatePreInvert();

            var col: number = blockSP.col;
            var row: number = blockSP.row;
            var h = this.boardHeight - 1;
            var w = this.boardWidth - 1;
            if (row > 0) this.blocksSprites[col][row - 1].animatePreInvert();
            if (row < h) this.blocksSprites[col][row + 1].animatePreInvert();
            if (col > 0) this.blocksSprites[col - 1][row].animatePreInvert();
            if (col < w) this.blocksSprites[col + 1][row].animatePreInvert();

        }

        public preInvertRelease(blockSP: BlockSprite) {
            blockSP.animatePreInvertRelease();

            var col: number = blockSP.col;
            var row: number = blockSP.row;
            var h = this.boardHeight - 1;
            var w = this.boardWidth - 1;
            if (row > 0) this.blocksSprites[col][row - 1].animatePreInvertRelease();
            if (row < h) this.blocksSprites[col][row + 1].animatePreInvertRelease();
            if (col > 0) this.blocksSprites[col - 1][row].animatePreInvertRelease();
            if (col < w) this.blocksSprites[col + 1][row].animatePreInvertRelease();
        }
  
        public radiusEffect(originCol: number, originRow: number) {
            var delay = 50;

            for (var radius = 1; radius < this.boardHeight * 2; radius++) {
            
                var points = this.getPointsDistingL1(radius);
            
                for (var i = 0; i < points.length; i++)
                    this.applyBounceEffect(originCol + points[i].x, originRow + points[i].y, (radius - 1) * delay);
            }

            //TODO: fazer classe só para isto.
            this.fx.castEffect(
                this.blocksSprites[originCol][originRow].x + 90,
                this.blocksSprites[originCol][originRow].y + 90,
                "Bolinhas",
                3
            );
        }
        
        public winEffect(originCol: number, originRow: number) {

            //create backgound
                        
            //define time duration
            this.radiusEffect(originCol, originRow);
            var total = this.boardHeight * this.boardWidth;
            var duration = 500;
            var delay = duration / total;
            
            //defineRandomOrder
            var arrayX = [];
            for (var i = 0; i < total; i++) arrayX[i] = i;
            this.shuffle(arrayX);
            
            
            for (var i = 0; i < total; i++) {
                var x = arrayX[i] % this.boardWidth;
                var y = Math.floor(arrayX[i] / this.boardWidth);
                this.applyHideEffect(x, y, delay * i);
            }
        }

        public looseEffect() {

            //define time duration
            var total = this.boardHeight * this.boardWidth;
            var duration= 500;
            var delay = duration / total;

            //defineRandomOrder
            var arrayX = [];
            for (var i = 0; i < total; i++) arrayX[i] = i;
            this.shuffle(arrayX);


            for (var i = 0; i < total; i++) {
                var x = arrayX[i] % this.boardWidth;
                var y = Math.floor(arrayX[i] /this.boardWidth);
                this.applyHideEffect(x, y, delay * i,false);
            }
        }

        private shuffle(o) { //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        public applyBounceEffect(col, row, delay) {

            if (col < 0) return;
            if (row < 0) return;
            if (col >= this.boardWidth) return;
            if (row >= this.boardHeight) return;

            var b: BlockSprite = this.blocksSprites[col][row];
            b.applyBounceEffect(delay);
        }

        public applyJoinEffect(col, row, delay) {

            if (col < 0) return;
            if (row < 0) return;
            if (col >= this.boardWidth) return;
            if (row >= this.boardHeight) return;

            var b: BlockSprite = this.blocksSprites[col][row];
            b.animatePreInvert();
        }

        public applyHideEffect(col, row, delay,fx=true  ) {

            if (col < 0) return;
            if (row < 0) return;
            if (col >= this.boardWidth) return;
            if (row >= this.boardHeight) return;

            var b: BlockSprite = this.blocksSprites[col][row];
            b.applyHideEffect(delay,!fx);

            if (fx) {
                //bolinhas effext
                setTimeout(() => {
                    this.fx.castEffect(
                        this.blocksSprites[col][row].x + 90,
                        this.blocksSprites[col][row].y + 90,
                        "Bolinhas",
                        3
                        );
                }, delay);
            }
        }

        //get all points disting from origin calculated by L1 geometry (Taxicab geometry)
        //== circles are losangles ==
        private getPointsDistingL1(distance: number): any[] {
            var response = [];
            var d = distance;

            if (d == 0) return [{ x: 0, y: 0 }];

            for (var i = 0; i <= d; i++) {
                var j = d - i;
                response.push({ x: +j, y: +i });
                response.push({ x: -j, y: +i });
                response.push({ x: +j, y: -i });
                response.push({ x: -j, y: -i });
            }
            return response;
        }
        
        //===================================================  Lock     =================================================================

        public lock() { this.locked = true; }
        public unlock() { this.locked = false; }


    }
}