module FlipPlus.Levels {

    // Controls projects and Levels.
    // Model
    export class ProjectManager {

        //Entire Projects Data
        private projects: BotLevelsSet[];

        //current project/level wich user is playing (this shouldnt be here)
        private currentProject: BotLevelsSet;
        private currentLevel: Level;

        private userData: UserData.Levels;

        // ------------------------------- initialization ----------------------------------------//

        constructor(data: Array<BotLevelsSet>, userData: UserData.Levels) {
            this.userData = userData;
            this.loadProjects(data);
            
        }

        private loadProjects(data: Array<BotLevelsSet>) {
        
            for (var p in data) { delete data[p].UserData }
            for (var p in data) { for (var l in data[p].levels) { delete data[p].levels[l].userdata } }
            for (var p in data) { for (var l in data[p].levels) { data[p].levels[l].name = p+"/"+l} }
                
            this.projects = data;

            //append the project name in each level.
            //for (var p in this.projects)
            //    for (var l in this.projects[p].levels) {
            //        this.projects[p].levels[l].name = this.projects[p].name + "/" + this.projects[p].levels[l].name;
            //        ///this.projects[p].levels[l].project = this.projects[p];
            //    }

            //create a user data for each level/project
            this.userData.addUserData(this.projects);
        }

        // ------------------------------- manager Levels ----------------------------------------

        //get current Level 
        public getCurrentLevel(): Level {
            return this.currentLevel;
        }

        //set current level
        public setCurrentLevel(level: Level) {
            this.currentLevel = level;
            for (var p in this.projects) {
                if (this.projects[p].levels.indexOf(level) >= 0) {
                    this.setCurrentProject(this.projects[p]);
                    break;
                }
            }
            
        }

        //undo a level
        public undoLevel(level: Level) {
            level.userdata.solved = false
        }
  
        //skip a project
        public skipLevel(level: Level) {
            if (level == null) return;

            //TODO: Verifies if skip is possible

            //if the level is not solved yet
            if (!level.userdata.solved) {
                level.userdata.skip = true;

                //updates next level
                var nextLevel: Levels.Level = this.getNextLevel();
                if (nextLevel != null)
                    this.unlockLevel(nextLevel);
                    
                //updates project info
                this.updateProjectUserData(this.getCurrentProject());

                //save user data
                this.userData.saveLevelData(level);
                this.userData.saveProjectData(this.getCurrentProject());
            }
        }

        //Finish a project.
        public completeLevel(level: Level): void {

            //updates level;
            level.userdata.solved = true;
            level.userdata.skip = false;
            level.userdata.unlocked = true;

            //updates next level
            var nextLevel: Levels.Level = this.getNextLevel();
            if (nextLevel != null)
                this.unlockLevel(nextLevel);

            //updates project info
            this.updateProjectUserData(this.getCurrentProject());

            //save user data
            this.userData.saveLevelData(level);
            this.userData.saveProjectData(this.getCurrentProject());
        }

        //get next level inside a project
        public getNextLevel(): Level {

            //get current project and level
            var project = this.getCurrentProject();
            var level = this.getCurrentLevel();

            //if is not on a project or level return null
            if (project == null || level == null) return null;

            //seek for all levels in the project
            // -1 is to avoid the "last" project and stack overflow
            var levels: Level[] = project.levels;
            for (var l = 0; l < levels.length - 1; l++)

                //identify the current level and return its next
                if (levels[l] == level) return levels[l + 1]

            // if not found return null
            return null;
        }

        // ------------------------------- manager Projects ----------------------------------------

        //get current Project
        public getCurrentProject(): BotLevelsSet { return this.currentProject; }

        //set current project
        public setCurrentProject(project: BotLevelsSet) { this.currentProject = project; }

        //Get all Projects
        public getAllProjects(): BotLevelsSet[] {
            return this.projects;
        }

        //get a single project by name
        public getProjectByName(name: string): BotLevelsSet {
            for (var p in this.projects)
                if (this.projects[p].name == name) return this.projects[p];

            return null;
        }

        //get all finished Projects
        public getFinihedProjects(): BotLevelsSet[] {
            //return array with avaliable projects
            var finishedProjects: BotLevelsSet[] = [];

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.projects.length; i++)
                if (this.projects[i].UserData.complete)
                    finishedProjects.push(this.projects[i]);

            return finishedProjects;
        }

        //get all unlockedProjects
        public getUnlockedProjects(): BotLevelsSet[] {
            //return array with avaliable projects
            var unlockedProjects: BotLevelsSet[] = [];

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.projects.length; i++)
                if (this.projects[i].UserData.unlocked)
                    unlockedProjects.push(this.projects[i]);

            return unlockedProjects;
        }
        
        //getProjectStars
        public getStarsCount(): number {
            var stars = 0;

            for (var p in this.projects)
                if(this.projects[p].UserData.stars)
                    stars += this.projects[p].UserData.stars;

            return stars;
        }

       //unlock a project based on user parts ballance
        public unlockProject(project: BotLevelsSet) {

           // //verifies if money was propery taken
            if (this.getStarsCount() >= project.cost) {

                //unlock project user data
                project.UserData.unlocked = true;
                //unlocks first level of project
                project.levels[0].userdata.unlocked = true;

                //save user data
                this.userData.saveProjectData(project);
                this.userData.saveLevelData(project.levels[0]);

           }
        }

        //unlock a level inside a project
        private unlockLevel(level: Level) {

            //unlock level user data
            level.userdata.unlocked = true;
            this.userData.saveLevelData(level);
        }

        //Finish a project.
        public completeProject(project: BotLevelsSet): void {

            //TODO colocar isso em outro lugar
            //set played the intro when a project is complete
            FlipPlusGame.storyData.setStoryPlayed("intro");

            if (project.UserData.complete == true) return;

            project.UserData.complete = true;
            this.userData.saveProjectData(project);

        }

        //Updates user data project status
        private updateProjectsUserData() {
            for (var i = 0; i < this.projects.length; i++)
                this.updateProjectUserData(this.projects[i]);
        }

        //Updates user data project status
        private updateProjectUserData(project: BotLevelsSet) {

            var solvedLevels = 0;

            //count solved levels
            for (var l = 0; l < project.levels.length; l++)
                if (project.levels[l].userdata.solved   ||
                    project.levels[l].userdata.skip     ||
                    project.levels[l].userdata.item     )

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