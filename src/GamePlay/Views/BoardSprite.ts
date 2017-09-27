    module FlipPlus.GamePlay.Views {
    export class BoardSprite extends PIXI.Container {
        
        public blocksSprites:BlockSprite[][];
        private boardWidth :number;
        private boardHeight:number;
        private fx: FlipPlus.Effects;
        private previousSound: number = 1;
        private locked = false;
        private callback: (col: number, row: number) => void;

        //indicator
        private tutorialIndicator: PIXI.extras.MovieClip;

        constructor(levelWidth: number, levelHeight: number, levelTheme: string,levelType?:string) {
            super();

            this.addBlocks(levelWidth, levelHeight, levelTheme, levelType);
            this.boardHeight = levelHeight;
            this.boardWidth = levelWidth;

            this.initializeEffects();

            //Positioning board
            var boardHeight = levelHeight * BlockSprite.defaultBlockSize;
            var boardWidth = levelWidth * BlockSprite.defaultBlockSize;

            this.pivot.x =  boardWidth / 2;
            this.pivot.y = boardHeight / 2;

            //load click indicator
            this.tutorialIndicator = gameui.AssetsManager.getMovieClip("touch")
            this.tutorialIndicator.pivot.x = this.tutorialIndicator.pivot.y = -55;
            this.tutorialIndicator.mouseEnabled = false;
            this.addChild(this.tutorialIndicator);
            this.tutorialIndicator.visible = false;
        }

        //initializes the effectss sprites
        public initializeEffects() {
            this.fx = new FlipPlus.Effects();
            this.addChild(this.fx);
        }

        //creates and add all blocks to the boardh
        private addBlocks(width: number, height: number, theme: string, levelType: string) {

            this.blocksSprites = [];
                      
            for (var col = 0; col < width; col++) {
                this.blocksSprites[col] = [];
                for (var row = 0; row < height; row++) {

                    //Creates block Sprite
                    var blockSprite:BlockSprite = new BlockSprite(col,row,theme,levelType);

                    this.blocksSprites[col][row] = blockSprite;

                    // Add it to the board sprite
                    this.addChild(blockSprite);
                    
                    blockSprite.interactive = true;
                
                    // Add event listener to the boardSprite
                    blockSprite.on("pointerdown", (event: any) => { this.presdown(event); })
                    blockSprite.on("pointerup", (event: any) => { this.tap(event); })
                    blockSprite.on("pointerupoutside", (event: any) => { this.pressRelease(event); });
                 }
            }
        }

        private presdown(event: PIXI.interaction.InteractionEvent) {
            var target = event.currentTarget;
            if (this.locked) return;
            target["pressed"] = true;
            this.preInvertCross(<BlockSprite>target);
        }

        private tap(event: PIXI.interaction.InteractionEvent) {
            var target = event.currentTarget;

            if (!target["pressed"]) return;
            if (this.locked) return;

            target["pressed"] = false;
            this.preInvertRelease(<BlockSprite>target);
            
            // get block
            var b: BlockSprite = <BlockSprite>target;
            this.callback(b.col, b.row);

            // play a Radom Sounds
            var randomsound = Math.ceil(Math.random() * 4)
            gameui.AudiosManager.playSound("Mecanical Click" + randomsound, true); 

            //tutorialrelease
            if (b.tutorialHighLighted) {
                this.tutorialRelease();
                this.emit("ontutorialclick");
            }    
        }

        private pressRelease(event: PIXI.interaction.InteractionEvent) {
            var target = event.currentTarget;
            if (!target["pressed"]) return;
            target["pressed"] = false;
            this.preInvertRelease(<BlockSprite>target);
        }

        //update a SingleCross
        public updateCross(blocks: Logic.Block[][], col: number, row: number) {

            this.blocksSprites[col][row].updateSprite(blocks[col][row],0);

            if(blocks[col+1] && blocks[col+1][row]) this.blocksSprites[col+1][row].updateSprite(blocks[col+1][row],1);
            if(blocks[col-1] && blocks[col-1][row]) this.blocksSprites[col-1][row].updateSprite(blocks[col-1][row],2);
            if(blocks[col+0] && blocks[col][row+1]) this.blocksSprites[col][row+1].updateSprite(blocks[col][row+1],3);
            if(blocks[col+0] && blocks[col][row-1]) this.blocksSprites[col][row-1].updateSprite(blocks[col][row-1],4);
        }

        //updates sprites in the board
        public updateSprites(blocks: Logic.Block[][]) {
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
            return this.blocksSprites[id % this.boardWidth][Math.floor(id / this.boardWidth)];
        }

        //clear blocks hints
        public clearHint() {
            var blocksCount = this.boardWidth * this.boardHeight;
            for (var b = 0; b < blocksCount; b++) {
                var block = this.getBlockById(b);
                block.disableHint();
            }
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

            this.tutorialIndicator.visible = true;
            this.tutorialIndicator.x = block.x - 100;
            this.tutorialIndicator.y = block.y - 100;
            this.tutorialIndicator.interactive = false;
            this.tutorialIndicator.interactiveChildren = false;
            this.tutorialIndicator.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
            this.tutorialIndicator.play();
            
        }
        
        public tutorialRelease() {
            var blocksCount = this.boardWidth * this.boardHeight;

            for (var b = 0; b < blocksCount; b++) {
                var block = this.getBlockById(b);
                block.tutorialUnlock();
            }


            this.tutorialIndicator.visible = false;


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

            // define time duration
            this.radiusEffect(originCol, originRow);
            var total = this.boardHeight * this.boardWidth;
            var duration = 500;
            var delay = duration / total;
            
            // defineRandomOrder
            var arrayX = [];
            for (var i = 0; i < total; i++) arrayX[i] = i;
            this.shuffle(arrayX);
            
            
            for (var i = 0; i < total; i++) {
                var x = arrayX[i] % this.boardWidth;
                var y = Math.floor(arrayX[i] / this.boardWidth);
                this.applyHideEffect(x, y, delay * i);

                // hide all ? symbols from sprites
                this.blocksSprites[x][y].reveal();
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