// Module
module FlipPlus.UserData {

    export class Levels {

        private projectKey = "Flipp_userData"
        private levelsSavedData: Object;

        // ----------------------- Game Data ----------------------------------------------------------

        constructor() {
            this.loadFromStorage();
        }

        //Adds user data to a project
        public addUserData(botLevelSet: Array<Levels.BotLevelsSet>) {

            for (var p = 0; p < botLevelSet.length; p++) {

                var project = botLevelSet[p];
                var pd = this.getProjectData(project.name);

                project.UserData = pd;
                
                for (var l = 0; l < botLevelSet[p].levels.length; l++) { 
                    var level = botLevelSet[p].levels[l];
                    var ld = this.getLevelData(level.name);
                    level.userdata = ld;
                }
            }
        }
 
        //gets user data from storage and store it to a level data
        private getLevelData(LevelId: string): Levels.LevelUserData {

            var key: string = LevelId;
            var value: Levels.LevelUserData = this.levelsSavedData[key];

            if (value == null) {
                var ud = new Levels.LevelUserData();
                ud.solved = false;
                ud.skip = false;
                ud.unlocked = false;
                return ud;
            }
            return value;
        }     

        //gets user data from storage and store it to a project data
        private getProjectData(botId: string): Levels.ProjectUserData {

            var key: string = botId;
            var value: Levels.ProjectUserData = this.levelsSavedData[key];

            if (value == null) {
                var ud = new Levels.ProjectUserData();
                ud.unlocked = false;
                ud.percent = 0;
                ud.complete = false;
                return ud;
            }
            else
                return value;
        }
        
        //updates storage with curret level user data 
        public saveLevelData(level: Levels.Level) {
            var key: string = level.name;
            this.levelsSavedData[key] = level.userdata;
            this.saveToStorage();
        }

        //updates storage with curret project user data 
        public saveProjectData(botLevelSet: Levels.BotLevelsSet): void{
            var key: string = botLevelSet.name;
            this.levelsSavedData[key] = botLevelSet.UserData;
            this.saveToStorage();
        }

        private saveToStorage() {
            if (this.levelsSavedData) {
                var str = JSON.stringify(this.levelsSavedData);
                localStorage.setItem(this.projectKey, str);
            }
        }

        private loadFromStorage() {
            var data = localStorage.getItem(this.projectKey);

            if (data)
                this.levelsSavedData = JSON.parse(data);
            else
                this.levelsSavedData = {};
            
        }

        //-------------------------------------------------------------------------------------------
        
        //clear all storage data
        public clearAllData() {
            localStorage.clear();
        }

        
    }
} 