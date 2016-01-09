// Module
module FlipPlus.UserData {

    export class ProjectsData {

        private projectKey = "Flipp_userData"
        private projectsUserData: Object;

        // ----------------------- Game Data ----------------------------------------------------------

        constructor() {
            this.loadFromStorage();
        }

        //Adds user data to a project
        public addUserData(projects: Array<Levels.BotLevelsSet>) {

            for (var p = 0; p < projects.length; p++) {

                var project = projects[p];
                var pd = this.getProjectData(project.name);

                project.UserData = pd;
                
                for (var l = 0; l < projects[p].levels.length; l++) { 
                    var level = projects[p].levels[l];
                    var ld = this.getLevelData(level.name);
                    level.userdata = ld;
                }
            }
        }
 
        //gets user data from storage and store it to a level data
        private getLevelData(LevelId: string): Levels.LevelUserData {

            var key: string = LevelId;
            var value: Levels.LevelUserData = this.projectsUserData[key];

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
        private getProjectData(projectId: string): Levels.ProjectUserData {

            var key: string = projectId;
            var value: Levels.ProjectUserData = this.projectsUserData[key];

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
            this.projectsUserData[key] = level.userdata;
            this.saveToStorage();
        }

        //updates storage with curret project user data 
        public saveProjectData(project: Levels.BotLevelsSet): void{
            var key: string = project.name;
            this.projectsUserData[key] = project.UserData;
            this.saveToStorage();
        }

        private saveToStorage() {
            if (this.projectsUserData) {
                var str = JSON.stringify(this.projectsUserData);
                localStorage.setItem(this.projectKey, str);
            }
        }

        private loadFromStorage() {
            var data = localStorage.getItem(this.projectKey);

            if (data)
                this.projectsUserData = JSON.parse(data);
            else
                this.projectsUserData = {};
            
        }

        //-------------------------------------------------------------------------------------------
        
        //clear all storage data
        public clearAllData() {
            localStorage.clear();
        }

        
    }
} 