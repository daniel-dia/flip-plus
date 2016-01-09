module FlipPlus.Levels {

    // Controls projects and Levels.
    // Model
    export class ActionLevelsManager {

        // Entire Projects Data
        private actionLevelsData: Array<BotLevelsSet>;
             
        // Current Action level 
        private currentLevel: FlipPlus.Levels.Level;
        
        // user data    
        private levelsUserDataManager: UserData.LevelsUserDataManager;
        
        // #region initialization ----------------------------------------//
        
        constructor(levelsData: Array<BotLevelsSet>, levelsUserDataManager: UserData.LevelsUserDataManager) {
            this.levelsUserDataManager = this.levelsUserDataManager = levelsUserDataManager;
            this.loadProjects(levelsData);
        }
        
        private loadProjects(data: Array<BotLevelsSet>) {
             this.actionLevelsData = data;
 
            // get a user data for each level/project
            this.levelsUserDataManager.addUserData(this.actionLevelsData);
        }
        
        // #endregion

        // #region manager Levels 

        public getAllActionLevels(): Array<FlipPlus.Levels.BotLevelsSet> {

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