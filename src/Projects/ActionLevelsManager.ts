declare var ActionLevelsData: Array<FlipPlus.Projects.Level>

module FlipPlus.Projects {

    // Controls projects and Levels.
    // Model
    export class ActionLevelsManager {

        // Entire Projects Data
        private actionLevelsData: Array<Project>;
             
        // Current Action level 
        private currentLevel: FlipPlus.Projects.Level;
        
        // user data    
        private userData: UserData.ProjectsData;
        
        // #region initialization ----------------------------------------//
        
        constructor(levelsData: Array<Project>, userData: UserData.ProjectsData) {
            this.userData = this.userData = userData;
            this.loadProjects(levelsData);
        }
        
        private loadProjects(data: Array<Project>) {
             this.actionLevelsData = data;
 
            // get a user data for each level/project
            this.userData.addUserData(this.actionLevelsData);
        }
        
        // #endregion

        // #region manager Levels 

        public getAllActionLevels(): Array<FlipPlus.Projects.Project> {
            return this.actionLevelsData;
        }

        public getActionLevel(index: number) {
            return this.actionLevelsData[index];
        }

        public getCurrentActionLevel() {
            return this.currentLevel;
        }

        public unlockActionLevel(index: number) {

        }
       
        public getActionLevelStars(index: number):number {
            return 0;
        }

        // #endregion
    }
}