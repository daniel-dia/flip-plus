module FlipPlus.Levels {

    // Controls projects and Levels.
    // Model
    export class LevelsManager {

        //Entire Projects Data
        protected levelsData: BotLevelsSet[];

        //current project/level wich user is playing (this shouldnt be here)
        protected currentProject: BotLevelsSet;
        protected currentLevel: Level;

        protected levelsUserDataManager: UserData.LevelsUserDataManager;

        // ------------------------------- initialization ----------------------------------------//

        constructor(data: Array<BotLevelsSet>, userData: UserData.LevelsUserDataManager) {
            this.levelsUserDataManager = userData;
            this.loadProjects(data);

            this.unlockProject(this.getAllProjects()[0]);
        }

        protected loadProjects(data: Array<BotLevelsSet>) {

            // clear projects Data
            for (var p in data) { delete data[p].UserData }

            // clear Levels Data
            for (var p in data) { for (var l in data[p].levels) { delete data[p].levels[l].userdata } }
            
            // set project stars costs
            for (var i = 0; i < data.length; i++) {
                data[i].cost = Math.ceil(0.8 * 3 * i);
            }

            // automatically fix names
            this.fixName(data);

            // save data
            this.levelsData = data;
            
            //create a user data for each level/project
            this.levelsUserDataManager.addUserData(this.levelsData);
        }

        protected fixName(data: Array<BotLevelsSet>) {

            function add40(v: number) {
                var str = "0000000" + (v.toString());
                return (str).substr(str.length - 4);
            }
            
            for (var p in data) {
                for (var l in data[p].levels) {

                    var project = data[p];
                    var level = data[p].levels[l];

                    // adds LevelId and ProjectId properties
                    level.projectId = p;
                    level.leveld = parseInt(l);
                    
                    // Fix level name
                    level.name = add40((parseInt(p) + 1) * 100 + (parseInt(l) + 1))
                }
            }
        }

        // ------------------------------- manager Levels ----------------------------------------

        // get current Level 
        public getCurrentLevel(): Level {
            return this.currentLevel;
        }

        // set current level
        public setCurrentLevel(level: Level) {
            this.currentLevel = level;
            for (var p in this.levelsData) {
                if (this.levelsData[p].levels.indexOf(level) >= 0) {
                    this.setCurrentProject(this.levelsData[p]);
                    break;
                }
            }
            
        }

        // undo a level
        public undoLevel(level: Level) {
            level.userdata.solved = false
        }
  
        // skip a project
        public skipLevel(level: Level) {
            if (level == null) return;

            //TODO: Verifies if skip is possible

            //if the level is not solved yet
            if (!level.userdata.solved) {
                level.userdata.skip = true;

                // updates next level
                var nextLevel: Levels.Level = this.getNextLevel();
                if (nextLevel != null)
                    this.unlockLevel(nextLevel);
                    
                // updates project info
                this.updateProjectUserData(this.getCurrentProject());

                // save user data
                this.levelsUserDataManager.saveLevelData(level);
                this.levelsUserDataManager.saveProjectData(this.getCurrentProject());
            }
        }

        // Finish a project.
        public completeLevel(level: Level): void {

            // updates level;
            level.userdata.solved = true;
            level.userdata.skip = false;
            level.userdata.unlocked = true;

            // updates next level
            var nextLevel: Levels.Level = this.getNextLevel();

            if (nextLevel != null)
                this.unlockLevel(nextLevel);

            // unlock project by Stars
            this.updateUnlockedProjectsByStars();

            // updates project info
            this.updateProjectUserData(this.getCurrentProject());
           
            // save user data
            this.levelsUserDataManager.saveLevelData(level);
            this.levelsUserDataManager.saveProjectData(this.getCurrentProject());
        }

        // get next level inside a project
        public getNextLevel(): Level {

            // get current project and level
            var project = this.getCurrentProject();
            var level = this.getCurrentLevel();

            //if is not on a project or level return null
            if (project == null || level == null) return null;

            // seek for all levels in the project
            // -1 is to avoid the "last" project and stack overflow
            var levels: Level[] = project.levels;
            for (var l = 0; l < levels.length - 1; l++)

                //identify the current level and return its next
                if (levels[l] == level) return levels[l + 1]

            // if not found return null
            return null;
        }

        // ------------------------------- manager Projects ----------------------------------------

        // get current Project
        public getCurrentProject(): BotLevelsSet { return this.currentProject; }

        // set current project
        public setCurrentProject(project: BotLevelsSet) { this.currentProject = project; }

        // get all Projects
        public getAllProjects(): BotLevelsSet[] {
            return this.levelsData;
        }

        // get a single project by name
        public getProjectByName(name: string): BotLevelsSet {
            for (var p in this.levelsData)
                if (this.levelsData[p].name == name) return this.levelsData[p];

            return null;
        }

        // get all finished Projects
        public getFinihedProjects(): BotLevelsSet[] {
            this.updateProjectsUserData();

            //return array with avaliable projects
            var finishedProjects: BotLevelsSet[] = [];

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.levelsData.length; i++)
                if (this.levelsData[i].UserData.complete)
                    finishedProjects.push(this.levelsData[i]);

            return finishedProjects;
        }

        // get highest active project
        public getHighestProjectIndex(): number {
            this.updateProjectsUserData();
            var highest = 1;

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.levelsData.length; i++) {
                highest = i;
                if (!this.levelsData[i].UserData.complete) break;
            }

            return highest;
        }

        // get the current project index
        public getCurrentProjectIndex(): number {
            return this.getAllProjects().indexOf(this.getCurrentProject());
        }
        
        // get first non completed project
        public getFirstNonCompleted(): number {
            this.updateProjectsUserData();
            var highest = 1;

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.levelsData.length; i++) {
                highest = i;
                if (!this.levelsData[i].UserData.complete) break;
            }

            return highest;
        }

        // get all unlockedProjects
        public getUnlockedProjects(): BotLevelsSet[] {

            this.updateProjectsUserData();
            //return array with avaliable projects
            var unlockedProjects: BotLevelsSet[] = [];

            //verifies all projects and add the non complete to array, till reach max number
            for (var i: number = 0; i < this.levelsData.length; i++)
                if (this.levelsData[i].UserData.unlocked)
                    unlockedProjects.push(this.levelsData[i]);

            return unlockedProjects;
        }
        
        // getProjectStars
        public getStarsCount(): number {
            var stars = 0;

            for (var p in this.levelsData)
                if(this.levelsData[p].UserData.stars)
                    stars += this.levelsData[p].UserData.stars;

            return stars;
        }

        // unlock a project based on user parts ballance
        public unlockProject(project: BotLevelsSet) {

            // unlock project user data
            project.UserData.unlocked = true;

            // unlocks all level of project
            if (project.name == "Bot01")
                this.unlockLevel(project.levels[0]);
            else
                for (var l = 0; l < project.levels.length; l++)
                    this.unlockLevel(project.levels[l]);

            // save user data
            this.levelsUserDataManager.saveProjectData(project);
            this.levelsUserDataManager.saveLevelData(project.levels[0]);
        }

        // unlock next project
        public unlockNextProject(project: BotLevelsSet) {
            var nextProject = this.getNextProject(project);
            this.unlockProject(nextProject);
        }

        // get next project
        private getNextProject(project: BotLevelsSet) {
            var projects = this.getAllProjects();

            for (var p = 0; p < projects.length - 1; p++)
                if (projects[p] == project)
                    return projects[p + 1];
        }

        // unlock a level inside a project
        private unlockLevel(level: Level) {

            // analytics
            if (!level.userdata.unlocked) FlipPlusGame.analytics.logLevelUnlock(level.name);

            // unlock level user data
            level.userdata.unlocked = true;
            this.levelsUserDataManager.saveLevelData(level);
        }

        // Finish a project.
        public completeProject(project: BotLevelsSet): void {

            //TODO colocar isso em outro lugar
            // set played the intro when a project is complete
            FlipPlusGame.storyData.setStoryPlayed("intro");

            if (project.UserData.complete == true) return;

            project.UserData.complete = true;
            this.levelsUserDataManager.saveProjectData(project);

            // unlock next project (No more stars count)
            var nextProject = this.getNextProject(project);
            this.unlockProject(nextProject);

            FlipPlusGame.levelsUserDataManager.saveProjectData(project);
            FlipPlusGame.levelsUserDataManager.saveProjectData(nextProject);

        }

        // unlocks projects based on stars
        public updateUnlockedProjectsByStars() {
            var stars = this.getStarsCount();

            for (var p in this.levelsData)
                if (this.levelsData[p].cost <= stars)
                    this.unlockProject(this.levelsData[p]);
        }

        // updates user data project status
        public updateProjectsUserData() {
            for (var i = 0; i < this.levelsData.length; i++)
                this.updateProjectUserData(this.levelsData[i]);
        }

        // updates user data project status
        protected updateProjectUserData(project: BotLevelsSet) {

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

            // updates project stars count
            project.UserData.stars = stars;
 
            //complete Project
            if (solvedLevels == project.levels.length)
                this.completeProject(project);

        }
    }
}