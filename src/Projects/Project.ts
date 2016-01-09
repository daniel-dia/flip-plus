module FlipPlus.Projects {

    // Class
    // Data Object - Model
    export class Project{

        //this will be the id for this chapter. the id must be unique. it will be referenced by the user saved data
        public name: string;

        //this will be the id for this chapter. the id must be unique. it will be referenced by the user saved data
        public nickName: string;

        //all the Levels belonging to this chapter
        public levels: Level[];

        //stars needed for unlock the project
        public cost: number;

        //userData related to project
        //TODO - remove it from here, put in other class. UserData Class...
        public UserData: ProjectUserData;

        //indicates if game is avaliable in free mode
        public free: boolean

    }

    export class ProjectUserData {

        //userInformation
        public unlocked: boolean;
        
        //cached inormation
        public complete: boolean;
        public stars: number;
        public percent: number;
        public maxScore: number; // just for action level
    }
}