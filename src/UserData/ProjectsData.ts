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
        public addUserData(projects: Projects.Project[]) {

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
        private getLevelData(LevelId: string): Projects.LevelUserData {

            var key: string = LevelId;
            var value: Projects.LevelUserData = this.projectsUserData[key];

            if (value == null) {
                var ud = new Projects.LevelUserData();
                ud.solved = false;
                ud.skip = false;
                ud.unlocked = false;
                return ud;
            }
            return value;
        }     

        //gets user data from storage and store it to a project data
        private getProjectData(projectId: string): Projects.ProjectUserData {

            var key: string = projectId;
            var value: Projects.ProjectUserData = this.projectsUserData[key];

            if (value == null) {
                var ud = new Projects.ProjectUserData();
                ud.unlocked = false;
                ud.percent = 0;
                ud.complete = false;
                return ud;
            }
            else
                return value;
        }
        
        //updates storage with curret level user data 
        public saveLevelData(level: Projects.Level) {
            var key: string = level.name;
            this.projectsUserData[key] = level.userdata;
            this.saveToStorage();
        }

        //updates storage with curret project user data 
        public saveProjectData(project: Projects.Project): void{
            var key: string = project.name;
            this.projectsUserData[key] = project.UserData;
            this.saveToStorage();
        }


        private saveToStorage() {
            if (this.projectsUserData) {
                localStorage.setItem(this.projectKey, JSON.stringify(this.projectsUserData));
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