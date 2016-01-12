module FlipPlus.Levels {

    // Controls projects and Levels.
    // Model
    export class ActionLevelsManager extends LevelsManager {
 
     
        // #region initialization ----------------------------------------//
   
        
        protected loadProjects(data: Array<BotLevelsSet>) {
            for (var p in data) { delete data[p].UserData }
            for (var p in data) { for (var l in data[p].levels) { delete data[p].levels[l].userdata } }

            this.levelsData = data;
 
            // get a user data for each level/project
            this.levelsUserDataManager.addUserData(this.levelsData);
        }
        
        // #endregion

        //Updates user data project status
        protected updateProjectUserData(project: BotLevelsSet) {

            var solvedLevels = 0;

            //count solved levels
            for (var l = 0; l < project.levels.length; l++)
                if (project.levels[l].userdata.solved ||
                    project.levels[l].userdata.skip ||
                    project.levels[l].userdata.item)

                    solvedLevels++;

            //calculate percentage
            project.UserData.percent = solvedLevels / project.levels.length;

            //calculate Stars
            var stars: number = 0;
            var temp: Object = new Object;
            for (var l = 0; l < project.levels.length; l++) {
                var level: Level = project.levels[l];

                if (temp[level.theme] == null) temp[level.theme] = true;

                if (!level.userdata.solved || level.userdata.item) temp[level.theme] = false;
            }
            for (var i in temp) {
                if (temp[i]) stars++;
            }

            //updates project stars count
            project.UserData.stars = stars;

            //verifies if level can be ulocked
            this.unlockProject(project);
            
            //complete Project
            if (solvedLevels == project.levels.length)
                this.completeProject(project);

        }
    }
}