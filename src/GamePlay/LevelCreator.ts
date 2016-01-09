declare function saveFile(name: string, data: string);
declare function loadFile(callback: (string) => any);


var levelsDataBackup;
var levelCreatorMode;
var levelCreatorTestMode;

module FlipPlus.GamePlay {
    export class LevelCreator extends LevelPuzzle {

        private stateDraw;
        private levelsBackup;

        private editWindow: Window;
        private static key = "customProjects";

        constructor(levelData: Levels.Level, editorWindow: Window, postback?: boolean) {


            //backups levels
            if (!levelsDataBackup) levelsDataBackup = levelData;

            this.editWindow = editorWindow;

            if (!postback) {

                window.onresize = () => { };
                FlipPlusGame.gameScreen.resizeGameScreen(420, 600, false);
                if (levelData == null) {
                    levelData = new Levels.Level();
                    levelData.width = 5;
                    levelData.height = 5;
                    levelData.blocksData = [];
                    levelData.theme = "green"
                }
                this.updateSelectList();
            }

            super(levelData);

            this.levelLogic.board.setInvertedBlocks(levelData.blocksData)
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);
            this.gameplayMenu.visible = false;



            this.editWindow.document.getElementById("c_create").onclick = () => {
                levelData = this.getLevelDataFromForm();
                FlipPlusGame.gameScreen.switchScreen(new LevelCreator(levelData, this.editWindow));
            }


            this.editWindow.document.getElementById("c_save").onclick = () => {
                var customData = this.loadStored();
                var levelData = this.getLevelDataFromForm();
                var projectId = this.getProjectIndexFromForm();
                var levelId = this.getLevelIndexFromForm();

                customData[projectId].levels[levelId] = levelData;
                this.saveStored(customData)

                //this.updateSelectList();
            }

            this.editWindow.document.getElementById("c_load").onclick = () => {
                var s = this.loadStored();

                var selectedLevel = (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_level")).value;
                var selectedProject = (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_project")).value;
                var level = s[selectedProject].levels[selectedLevel];

                if (level) {
                    this.setFormFromLevelData(level);
                    FlipPlusGame.gameScreen.switchScreen(new LevelCreator(level, this.editWindow, true));
                }
                else {
                    alert("There nothing saved in this level. Please create a new one")
                }

            }

            this.editWindow.document.getElementById("c_export").onclick = () => {
                var data = this.loadStored();

                if (data) {
                    
                    //remove trashes from saved data
                    for (var p in data) { delete data[p].UserData }
                    for (var p in data) { for (var l in data[p].levels) { delete data[p].levels[l].userdata } }
                    for (var p in data) { for (var l in data[p].levels) { data[p].levels[l].name = p + "/" + l } }

                    var value = JSON.stringify(data,null,"    ")
                    saveFile('Levels.js', "var levelsData =" + value)
                   // (<HTMLTextAreaElement>this.editWindow.document.getElementById("c_exported")).value = JSON.stringify(exp);
                }
            }

            this.editWindow.document.getElementById("c_select_project").onchange = () => {
                var value = (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_project")).value;
                this.selecteProject(parseInt(value));
            }

            this.editWindow.document.getElementById("c_select_level").ondblclick = () => {
                this.editWindow.document.getElementById("c_load").onclick(null);
            }

            this.editWindow.document.getElementById("c_import").onclick = () => {

                loadFile((data: string) => {
                    try {
                       
                        data = data.replace("var levelsData =", "");
                        var dataParsed = JSON.parse(data);
                        data = JSON.stringify(dataParsed);
                        localStorage.setItem(LevelCreator.key, data);
                        this.updateSelectList();
                        setTimeout(() => { alert("Levels imported"); }, 200);
                    } catch (er) {
                        alert("This file is invalid " + er.message);
                    }
                });

                //var exp = (<HTMLTextAreaElement>this.editWindow.document.getElementById("c_exported")).value;
            }

            this.editWindow.document.getElementById("c_test").onclick = () => {
                levelCreatorTestMode = !levelCreatorTestMode;

                levelsData = this.loadStored();
                for (var p in levelsData) {
                    levelsData[p].cost = 0;
                }
                FlipPlus.FlipPlusGame.initializeGame();
                //window.onresize = () => { };
                //console.log("ctest")
                //FlipPlus.InvertCrossaGame.redim(420, 600, false);
            }
        }

        private loadStored(): any {
            var s = localStorage.getItem(LevelCreator.key);
            if (!s)
                return levelsData;
            else
                return JSON.parse(s);
        }

        private saveStored(value: any) {
            localStorage.setItem(LevelCreator.key, JSON.stringify(value));
        }

        private updateSelectList() {
            var s = this.loadStored();

            (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_project")).options.length = 0;
            (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_level")).options.length = 0;

            for (var i in s) {
                var option = this.editWindow.document.createElement("option");
                option.text = s[i].name;
                option.value = i;
                (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_project")).add(option);
            }
        }

        private selecteProject(projectIndex: number) {
            var s = this.loadStored();

            (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_level")).options.length = 0;

            var project: Levels.BotLevelsSet = s[projectIndex];
            for (var l in project.levels) {
                var option = this.editWindow.document.createElement("option");
                option.text = "Bot" + (projectIndex + 1) + " Level " + (parseInt(l) + 1) + "  " + project.levels[l].type;
                option.value = l;
                (<HTMLSelectElement>this.editWindow.document.getElementById("c_select_level")).add(option);
            }
        }

        private getProjectIndexFromForm(): number {
            var selected = parseInt((<HTMLSelectElement>this.editWindow.document.getElementById("c_select_project")).value);
            return selected;
        }

        private getLevelIndexFromForm(): number {
            var selected = parseInt((<HTMLSelectElement>this.editWindow.document.getElementById("c_select_level")).value);
            return selected;
        }

        private getLevelDataFromForm(): Levels.Level {
            var levelData = new Levels.Level();

            //levelData.name= (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value;


            levelData.width = parseInt((<HTMLInputElement> this.editWindow.document.getElementById("c_width")).value);
            levelData.height = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_height")).value);
            levelData.type = (<HTMLInputElement>this.editWindow.document.getElementById("c_type")).value;
            levelData.theme = (<HTMLInputElement>this.editWindow.document.getElementById("c_theme")).value;

            levelData.moves = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_flips")).value);
            levelData.time = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_time")).value);
            levelData.puzzlesToSolve = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_p_solve")).value);

            levelData.randomMaxMoves = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_r_max")).value);
            levelData.randomMinMoves = parseInt((<HTMLInputElement>this.editWindow.document.getElementById("c_r_min")).value);

            levelData.drawData = this.levelData.drawData;
            levelData.mirroredBlocks = this.levelData.mirroredBlocks;
            levelData.hiddenBlocks = this.levelData.hiddenBlocks;

            if ((<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value)
                levelData.blocksData = JSON.parse((<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value);

            return levelData;
        }

        private setFormFromLevelData(levelData: Levels.Level) {

            //if (levelData.name) (<HTMLInputElement> this.editWindow.document.getElementById("c_name")).value = levelData.name;
            if (levelData.width) (<HTMLInputElement> this.editWindow.document.getElementById("c_width")).value = levelData.width.toString();
            if (levelData.height) (<HTMLInputElement>this.editWindow.document.getElementById("c_height")).value = levelData.height.toString();
            if (levelData.type) (<HTMLInputElement>this.editWindow.document.getElementById("c_type")).value = levelData.type;
            if (levelData.theme) (<HTMLInputElement>this.editWindow.document.getElementById("c_theme")).value = levelData.theme;

            if (levelData.moves) (<HTMLInputElement>this.editWindow.document.getElementById("c_flips")).value = levelData.moves.toString();
            if (levelData.time) (<HTMLInputElement>this.editWindow.document.getElementById("c_time")).value = levelData.time.toString();
            if (levelData.puzzlesToSolve) (<HTMLInputElement>this.editWindow.document.getElementById("c_p_solve")).value = levelData.puzzlesToSolve.toString();

            if (levelData.randomMaxMoves) (<HTMLInputElement>this.editWindow.document.getElementById("c_r_max")).value = levelData.randomMaxMoves.toString();
            if (levelData.randomMinMoves) (<HTMLInputElement>this.editWindow.document.getElementById("c_r_min")).value = levelData.randomMinMoves.toString();

            if (levelData.blocksData)
                (<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value = JSON.stringify(levelData.blocksData);

        }

        //threat user input
        public userInput(col: number, row: number) {

            var id = row + col * this.levelData.height;

            if ((<HTMLInputElement>document.getElementById("c_drawing")).checked) {
                if (!this.levelData.drawData) this.levelData.drawData = [];
                this.toogleItemInArray(this.levelData.drawData, id);

                this.levelLogic.board.setDrawBlocks(this.levelData.drawData);

            }

            else if ((<HTMLInputElement>document.getElementById("c_mirrowing")).checked) {
                this.levelLogic.board.blocks[col][row].mirror = !this.levelLogic.board.blocks[col][row].mirror;
                if (!this.levelData.mirroredBlocks) this.levelData.mirroredBlocks = [];
                this.toogleItemInArray(this.levelData.mirroredBlocks, id);
            }

            else if ((<HTMLInputElement>document.getElementById("c_hidding")).checked) {
                this.levelLogic.board.blocks[col][row].hidden = !this.levelLogic.board.blocks[col][row].hidden;
                if (!this.levelData.hiddenBlocks) this.levelData.hiddenBlocks = [];
                this.toogleItemInArray(this.levelData.hiddenBlocks, id);
            } else {

                //invert a cross
                this.levelLogic.invertCross(col, row);

            }

            //update sprites 
            this.boardSprite.updateSprites(this.levelLogic.board.blocks);

            (<HTMLInputElement>this.editWindow.document.getElementById("c_blocks")).value = JSON.stringify(this.levelLogic.board.getInvertedBlocks());

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