module FlipPlus.Projects {

    export class Level {

        //game type: Puzzle, time Atack, Draw
        public type: string;

        //this will be the id for this level. the id must be unique. it will be referenced by the user saved data
        public name; string;

        //the theme that will be ussed for this level.
        public theme: string;

        //sets the width and heght of the board for this level
        public width: number;
        public height: number;

        //the numberId of the invertedBlock.
        //the blockId is a number from 1 to (widthxheight).
        //By instance. in a 5x5 board, the upper-left block is "1", the bottom-right will be "25"
        public blocksData: number[];

        //the numberId of the drawBlocks.
        public drawData: number[];

        //the number id for the mirrowered bloks
        public mirroredBlocks: Array<number>

        //the number id for the hidden block
        public hiddenBlocks: Array<number>
        
        //prize is activated when there is less than N inverted blocks.
        //by instancce. prizes={1,3,6). this level will have 3 prizes. Each of them will be earned when 
        //the player left 6 3 and 1 inverted block on the puzze
        public prizes: number[];

        // ================ specific for each type ===============================

        public moves: number;

        //time is the time left used on timeAttack levels
        public time: number; 

        //time is the number of puzzles to get solved
        public puzzlesToSolve: number; 

        // ================ Random Generator =====================================

        public randomMinMoves: number;

        public randomMaxMoves: number;

        // ================ Tutorial =============================================

        public tutorial: Array<tutorialStep>;

        // ================ User data ============================================

        public userdata: LevelUserData;

        // ================ reference ============================================
        // reference to the level project
        //public project: Project;

    }

    export interface tutorialStep {
        text?: string;
        title?: string;
        item?: string;
        click?: number;
        parameter?: any;
        atEnd?: boolean;
    }


    export class LevelUserData {
        public solved: boolean;
        public skip: boolean;
        public unlocked: boolean;
        public item: string;
    }
}