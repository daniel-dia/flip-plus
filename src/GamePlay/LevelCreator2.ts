declare function saveFile(name: string, data: string);
declare function loadFile(callback: (string) => any);


var levelsDataBackup;
var levelCreatorMode;
var levelCreatorTestMode;

module FlipPlus.GamePlay {
    export class LevelCreator2 extends Puzzle {
        private callback;

        private stateDraw;
        private levelsBackup;

        private editWindow: Window;
        private static key = "customProjects";

        constructor(levelData: Projects.Level, callback:any) {

            FlipPlus.FlipPlusGame.gameScreen.resizeGameScreen(420, 600, false);
            FlipPlus.FlipPlusGame.gameScreen.resizeGameScreen = function () { };

            if (!levelData.width && levelData.width!= 0 ) levelData.width = 5;
            if (!levelData.height && levelData.height != 0) levelData.height = 5;
            if (!levelData.theme) levelData.theme= "yellow";
            if (!levelData.type) levelData.type = "puzzle";

            this.callback = callback;
         
            super(levelData);

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            this.gameplayMenu.visible = false;

        }

 

        //threat user input
        public userInput(col: number, row: number) {

            var id = row + col * this.levelData.height;

            //invert a cross
            this.levelLogic.invertCross(col, row);

            //update sprites 
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            this.levelData.blocksData = this.levelLogic.board.getInvertedBlocks();
            if(this.callback)this.callback(this.levelData);

        }


        private toogleItemInArray(array: Array<any>, item: any) {

            var index = array.indexOf(item);
            if (index >= 0) array.splice(index, 1);
            else array.push(item);

        }

        win(col: number, row: number) {
        }

    }
}