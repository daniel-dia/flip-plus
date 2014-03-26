module InvertCross.GamePlay {
    export class LevelCreator extends LevelScreen {

        private editWindow: Window;
        private static key = "customPuzzles";

        constructor(levelData: Projects.Level, editorWindow: Window) {
            
           this.editWindow = editorWindow;

            if (levelData == null) {
                levelData = new Projects.Level();
                levelData.width = 5;
                levelData.height = 5;
                levelData.blocksData = [];
                levelData.theme = "green"
            }

            super(levelData);


            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            this.menuOverlay.visible = false;

            this.updateSelectList();

            this.editWindow.document.getElementById("c_create").onclick = () => {
                levelData = this.getLevelDataFromForm();
                InvertCrossaGame.screenViewer.switchScreen(new LevelCreator(levelData, this.editWindow));
            }


            this.editWindow.document.getElementById("c_save").onclick = () => {
                var customData = this.loadStored();
                var levelData = this.getLevelDataFromForm();

                customData[levelData.name] = levelData;
                this.saveStored(customData)

                this.updateSelectList();
            }

            this.editWindow.document.getElementById("c_load").onclick = () => {
                var s = this.loadStored();

                var selected = (<HTMLSelectElement>this.editWindow.document.getElementById("c_select")).value;
                var level = s[selected];

                if (level) {
                    this.setFormFromLevelData(level);
                    InvertCrossaGame.screenViewer.switchScreen(new LevelCreator(level, this.editWindow));
                }

            }

            this.editWindow.document.getElementById("c_delete").onclick = () => {
                var s = this.loadStored();

                var selected = (<HTMLSelectElement>this.editWindow.document.getElementById("c_select")).value;
                delete s[selected];

                this.saveStored(s)

                this.updateSelectList();
            }

            this.editWindow.document.getElementById("c_export").onclick = () => {
                var exp = localStorage.getItem(LevelCreator.key);
                clipboardData.setData("text", exp);
                alert("levels copiados para clipboard");
            }
        }

        private loadStored(): any {
            var s = localStorage.getItem(LevelCreator.key);
            if (!s) 
                return {}
            else
                return JSON.parse(s);
        }

        private saveStored(value: any) {
            localStorage.setItem(LevelCreator.key, JSON.stringify(value));
        }

        private updateSelectList() {
            var s = this.loadStored();
            (<HTMLSelectElement>this.editWindow.document.getElementById("c_select")).options.length = 0;
            for (var i in s) {
                var option = this.editWindow.document.createElement("option");
                option.text = i;
                (<HTMLSelectElement>this.editWindow.document.getElementById("c_select")).add(option);
            }
        }

        private getLevelDataFromForm(): Projects.Level {
            var levelData = new Projects.Level();

            levelData.name= (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value;


            levelData.width = parseInt((<HTMLInputElement> this.editWindow.document.getElementById("c_width")).value);
            levelData.height = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_height")).value);
            levelData.type = (<HTMLInputElement>this.editWindow.document.getElementById("c_type")).value;
            levelData.theme = (<HTMLInputElement>this.editWindow.document.getElementById("c_theme")).value;

            levelData.moves = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_flips")).value);
            levelData.time = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_time")).value);
            levelData.puzzlesToSolve = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_p_solve")).value);

            if ((<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value)
                levelData.blocksData = JSON.parse((<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value);

            return levelData;
        }

        private setFormFromLevelData(levelData: Projects.Level) {

            if (levelData.name) (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value = levelData.name;
            if (levelData.width) (<HTMLInputElement> this.editWindow.document.getElementById("c_width")).value = levelData.width.toString();
            if (levelData.height) (<HTMLInputElement>this.editWindow.document.getElementById("c_height")).value = levelData.height.toString();
            if (levelData.type) (<HTMLInputElement>this.editWindow.document.getElementById("c_type")).value = levelData.type;
            if (levelData.theme) (<HTMLInputElement>this.editWindow.document.getElementById("c_theme")).value = levelData.theme;

            if (levelData.moves) (<HTMLInputElement>this.editWindow.document.getElementById("c_flips")).value = levelData.moves.toString();
            if (levelData.time) (<HTMLInputElement>this.editWindow.document.getElementById("c_time")).value = levelData.time.toString();
            if (levelData.puzzlesToSolve) (<HTMLInputElement>this.editWindow.document.getElementById("c_p_solve")).value = levelData.puzzlesToSolve.toString();

            if (levelData.blocksData)
                (<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value = JSON.stringify(levelData.blocksData);

        }

        //threat user input
        public userInput(col: number, row: number) {

            //invert a cross
            this.levelLogic.invertCross(col, row);

            //update sprites 
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            (<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value = JSON.stringify( this.levelLogic.board.getInvertedBlocks());

        }

        win(col: number, row: number) {
        }

    }
}