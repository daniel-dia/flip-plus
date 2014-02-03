// Module
module InvertCross.UserData {

    export class ProjectsData {

        // ----------------------- Game Data ----------------------------------------------------------

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
            var key: string =  LevelId;
            var value: string = localStorage.getItem(key);

            if (value == null) {
                var ud = new Projects.LevelUserData();
                ud.solved = false;
                ud.skip = false;
                ud.unlocked = false;
                return ud;
            }
            return JSON.parse(value);
        }     

        //gets user data from storage and store it to a project data
        private getProjectData(projectId: string): Projects.ProjectUserData {

            var key: string = projectId;
            var value: string = localStorage.getItem(key);

            if (value == null) {
                var ud = new Projects.ProjectUserData();
                ud.unlocked = false;
                ud.percent = 0;
                return ud;
            }
            else
                return JSON.parse(value);
        }
        
        //updates storage with curret level user data 
        public saveLevelData(level: Projects.Level) {
            var key: string = level.name;
            localStorage.setItem(key, JSON.stringify(level.userdata));
        }

        //updates storage with curret project user data 
        public saveProjectData(project: Projects.Project): void{
            var key: string =  project.name;
            localStorage.setItem(key, JSON.stringify(project.UserData));
        }

        //-------------------------------------------------------------------------------------------
        
        //clear all storage data
        public clearAllData() {
            localStorage.clear();
        }

        
    }
} 