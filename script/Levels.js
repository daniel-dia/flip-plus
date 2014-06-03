var levelsData = [
    {





        nickName: "S-N3S", name: "Bot01", cost: 00, free: true, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":   [12], tutorial: [{ text: "flip  the white squares to make them color squares", title: "The plus shape" }, { click: 12 }, { atEnd: true, text: "tiles always flip in a \"plus shape\" \nfrom the center", title: "Great" }] },
            { "name": "02", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":   [16,8], tutorial: [{ text: "to finish the board, you have to turn \nevery white block in color block", title: "Flip to build" }, { click: 16 }, { atEnd: true, text: "Great, no white tiles in the board", title: "Board complete!" }, { atEnd: true, text: "you solved all green blocks", title: "Star" }] },
            { "name": "03", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":  [10,12,14], tutorial: [{ text: "the plus shape inverts the tiles, \nwhite gets color and color gets white", title: "Flip to invert" }, { click: 10 }, { atEnd: true, text: "purple tiles work the \nsame way as green tiles", title: "Nice Work" }] },
            { "name": "04", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":  [11,12,13], tutorial: [{ text: "the light bulb button gives you a hin", title: "hints" }, { item: "hint", parameter: 12 }, { click: 12 }, { atEnd: true, text: "light bulbs help you out, \nbut they are limited", title: "too easy?" }, { atEnd: true, text: "you don't get a star when you use itens \nto solve the board,\nbut keep going for now, Nes need repairs", title: "No star" }] },
            { "name": "05", "width": 5, "height": 5, "type": "tutorial", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":  [10,2,12,22,14], tutorial: [{ text: "finish this board \nto complete S-N3S repairs!", title: "Bot S-N3S" }, { click: 10 }] }
        ],
    },
    {
        nickName: "R-MS", name: "Bot02", cost: 00, free: true, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [20, 16, 8, 4], hiddenBlocks: [15, 9],mirroredBlocks:[1,3] },
            { "name": "02", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                    [11,7,17,13]},
            { "name": "03", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                    [0,20,6,12,18,4,24]},
            { "name": "04", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                    [6,16,12,8,18]},
            { "name": "05", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                   [5,1,23,19]},
            { "name": "06", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                   [5,20,7,22,9,24]},
            { "name": "07", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                   [15,11,21,7,17,3,13,9]},
            { "name": "08", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                   [20,1,17,8]},
            { "name": "09", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": 30, "puzzlesToSolve": 3,       "blocksData":                   [10,1,21,3,23,14]},
            { "name": "10", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                   [0,15,7,4,19]},
        ]
    },

    {
        nickName: "P1K-4", name: "Bot03", cost: 00, free: true, levels: [
            { "name": "3.1", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                       [5,10,15,7,17,9,14,19]},
            { "name": "3.2", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                       [6,11,16,8,13,18]},
            { "name": "3.3", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": 0, "blocksData":                                          [5,16,2,13,24]},
            { "name": "3.4", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                       [0,20,16,7,18,4,24]},
            { "name": "3.5", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                      [11,16,7,12,17,8,13]},
            { "name": "3.6", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                      [0,15,6,2,12,22,8,4,19]},
            { "name": "3.7", "width": 5, "height": 5, "type": "time", "theme": "purple", "moves": null, "time": 20, "puzzlesToSolve": 3, "randomMaxMoves": 4, "randomMinMoves": 3, "blocksData":   []},
            { "name": "3.8", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                      [0,6,1,19,10,28,23,29]},
            { "name": "3.9", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData":                                      [0,12,7,14,27,10,5]},
            { "name": "3.10", "width": 4, "height": 4, "type": "time", "theme": "yellow", "moves": null, "time": 20, "puzzlesToSolve": 10, "randomMaxMoves": 2, "randomMinMoves": 2, "blocksData": []}
        ]
    },
    {
        nickName: "L-1NK", name: "Bot04", cost: 00, free: true, levels: [
        { "name": "4.1", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [24,19,8,9,22,29]},
        { "name": "4.2", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [12,25,2,8,3,9,28,17]},
        { "name": "4.3", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0,6,18,24,14,15,5,11,23,29]},
        { "name": "4.4", "width": 6, "height": 5, "type": "time", "theme": "green", "moves": null, "time": 25, "puzzlesToSolve": 5, "randomMaxMoves": 5, "randomMinMoves": 3 },                           
        { "name": "4.5", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[0,24,13,8,9,16,5,29]},
        { "name": "4.6", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[24,1,19,14,26,15,4,22,17,29]},
        { "name": "4.7", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[13,2,14,20,3,15,21,16]},
        { "name": "4.8", "width": 3, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[0,6,12,4,7,10,2,8,14]},
        { "name": "4.9", "width": 3, "height": 3, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[3,1,4,7,2,5]},
        { "name": "4.10", "width": 6, "height": 4, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":[0,18,13,8,14,9,15,10,5,23]},
        ]
    },

    {
        name: "Bot05", cost: 00, nickName: "B00-M", free: true, levels: [
        { "name": "5.1", "width": 3, "height": 3, "type": "time", "theme": "green", "moves": null, "time": 10, "puzzlesToSolve": 5, "randomMaxMoves": 3, "randomMinMoves": 2, "blocksData": [] },         
        { "name": "5.2", "width": 6, "height": 6, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":   [0,7,14,15,10,5,11,17]},
        { "name": "5.3", "width": 6, "height": 6, "type": "time", "theme": "green", "moves": null, "time": 25, "puzzlesToSolve": 4, "randomMaxMoves": 6, "randomMinMoves": 6, "blocksData": [] },         
        { "name": "5.4", "width": 6, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":  [30,7,25,9,15,4,16,28,5,11]},
        { "name": "5.5", "width": 4, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":  [1,5,9,13,17,21,2,6,10,14,18,22]},
        { "name": "5.6", "width": 6, "height": 3, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":  [0,6,12,14,3,5,11,17]},
        { "name": "5.7", "width": 6, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":  [6,12,24,1,13,32,33,4,16,11,17,29]},
        { "name": "5.8", "width": 5, "height": 5, "type": "moves", "theme": "yellow", "moves": 2, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":      [0,20,4,24]},
        { "name": "5.9", "width": 3, "height": 7, "type": "moves", "theme": "yellow", "moves": 3, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":      [0,9,18,2,11,20]},
        { "name": "5.10", "width": 6, "height": 5, "type": "moves", "theme": "yellow", "moves": 4, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData":     [0,19,2,27,10,29]},
        ]
    },

    { name: "Bot06", cost: 15, nickName: "K-R8Y", free: true, levels: [] },
    { name: "Bot07", cost: 15, nickName: "ME64-x", free: true, levels: [] },
    { name: "Bot08", cost: 15, nickName: "K0N-6", free: true, levels: [] },
    { name: "Bot09", cost: 15, nickName: "B-GH", free: true, levels: [] },
    { name: "Bot10", cost: 15, nickName: "BJ-KZ", free: true, levels: [] },
    { name: "Bot11", cost: 15, nickName: "BMS-M", free: true, levels: [] },
    { name: "Bot12", cost: 15, nickName: "S-H06", free: true, levels: [] },
    { name: "Bot13", cost: 15, nickName: "D-D1", free: true, levels: [] },
    { name: "Bot14", cost: 15, nickName: "R-GH", free: true, levels: [] },
    { name: "Bot15", cost: 15, nickName: "P4C-M", free: true, levels: [] },
    { name: "Bot16", cost: 15, nickName: "G-GH", free: true, levels: [] },
    { name: "Bot17", cost: 15, nickName: "T-BLK", free: true, levels: [] },
    { name: "Bot18", cost: 15, nickName: "Y0S-1", free: true, levels: [] },
]




//time im minutes
var bonusData = {
    "Bonus1": { id: "Bonus1", cost: 1, timeOut: 0},//24 * 60 },
    "Bonus2": { id: "Bonus2", cost: 1, timeOut: 0},//1.5 * 24 * 60 },
    "Bonus3": { id: "Bonus3", cost: 1, timeOut: 0},//2 * 24 * 6 }
}