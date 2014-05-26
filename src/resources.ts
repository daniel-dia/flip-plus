module InvertCross {

    export interface StringResources {

        ld: string;

        //mainMenu
        mm_play: string;

        it_text1: string;
        it_text2: string;
        //options
        op_back: string;
        op_erase: string;
        op_options: string;

        //projects
        pr_notStarsTitle: string;
        pr_notStarsText: string;
        pr_notTimeText: string;

        //workshopw
        ws_Locked: string;
        ws_NotFree: string;
        //ws_: string;
        //ws_: string;
        //ws_: string;
        //ws_: string;

        //game play
        gp_noMoreSkip: string;
        gp_noMoreHints: string;
        gp_finishPuzzle: string;

        //puzzle
        gp_pz_Popup1Title: string;
        gp_pz_Popup1Text1: string;
        gp_pz_Popup1Text2: string;
        gp_pz_Popup1Text3: string;
        gp_pz_statusEnd: string;
        gp_pz_timeUP: string;

        //moves
        gp_mv_Popup1Title: string;
        gp_mv_Popup1Text1: string;
        gp_mv_Popup1Text2: string;
        gp_mv_Popup1Text3: string;
        gp_mv_statusEnd: string;
        gp_mv_noMoreMoves: string;

        //b1
        b1_popup1Ttitle: string;
        b1_popup1Text: string;

        //b2
        b2_noMoreChances: string;
        b2_finish: string;

        //b3

    }
}

var stringResources: InvertCross.StringResources =
    {
        ld: "Loading",

        it_text1: "N3-S needs \n repair",
        it_text2: "alone = bad\nfriends=good",

        mm_play: "PLAY",

        op_back: "Back",
        op_erase: "Erase All Data",
        op_options: "Options",

        pr_notStarsTitle: "Not enught stars",
        pr_notStarsText: "you only have # stars. \nYou need at least stars # \nto unlock this project\n play more levels to earn stars.",
        pr_notTimeText: "Not Yet.#You must wait # before play this bonus level",

        ws_Locked: "LOCKED",
        ws_NotFree: "NOT FREE",

        gp_noMoreSkip: "no more skips",
        gp_noMoreHints: "no more hints",
        gp_finishPuzzle: "Well done",

        gp_pz_Popup1Title: "Time Attack",
        gp_pz_Popup1Text1: "Solve",
        gp_pz_Popup1Text2: "boards in",
        gp_pz_Popup1Text3: "seconds",
        gp_pz_statusEnd: "END",
        gp_pz_timeUP: "Time's up",

        gp_mv_Popup1Title: "Flip Challenge",
        gp_mv_Popup1Text1: "Solve",
        gp_mv_Popup1Text2: "boards in",
        gp_mv_Popup1Text3: "flips",
        gp_mv_statusEnd: "END",
        gp_mv_noMoreMoves: "No more moves",

        b1_popup1Ttitle: "Pick 3 Barrels",
        b1_popup1Text: "Some Barrels has hiddens items",
        b2_noMoreChances: "No more chances",
        b2_finish: "Well done!",
    }