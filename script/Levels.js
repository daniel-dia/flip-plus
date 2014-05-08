var levelsData = [
    {

        nickName: "S-N3S", name: "Bot01", cost: 00, free: true, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [12], tutorial: [{ text: "flip  the white squares to make them color squares", title: "The plus shape" }, { click: 12 }, { atEnd: true, text: "tiles always flip in a \"plus shape\" \nfrom the center", title: "Great" }] },
            { "name": "02", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [8, 16], tutorial: [{ text: "to finish the board, you have to turn \nevery white block in color block", title: "Flip to build" }, { click: 8 }, { atEnd: true, text: "Great, no white tiles in the board", title: "Board complete!" }, { atEnd: true, text: "you solved all green blocks", title: "Star" }] },
            { "name": "03", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [2, 12, 22], tutorial: [{ text: "the plus shape inverts the tiles, \nwhite gets color and color gets white", title: "Flip to invert" }, { click: 2 }, { atEnd: true, text: "purple tiles work the \nsame way as green tiles", title: "Nice Work" }] },
            { "name": "04", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 12, 17], tutorial: [{ text: "the light bulb button gives you a hin", title: "hints" }, { item: "hint", parameter: 7 }, { click: 7 }, { atEnd: true, text: "light bulbs help you out, \nbut they are limited", title: "too easy?" }, { atEnd: true, text: "you don't get a star when you use itens \nto solve the board,\nbut keep going for now, Nes need repairs", title: "No star" }] },
            { "name": "05", "width": 5, "height": 5, "type": "tutorial", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [2, 10, 12, 14, 22], tutorial: [{ text: "finish this board \nto complete S-N3S repairs!", title: "Bot S-N3S" }, { click: 2 }] }
        ],
    },
    {
        nickName: "R-MS", name: "Bot02", cost: 00, free: true, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "draw", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [4, 8, 16, 20] },
            { "name": "02", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 11, 13, 17] },
            { "name": "03", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 4, 6, 12, 18, 20, 24] },
            { "name": "04", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [6, 8, 12, 16, 18] },
            { "name": "05", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 5, 19, 23] },
            { "name": "06", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 4, 11, 14, 21, 24] },
            { "name": "07", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [3, 7, 9, 11, 13, 15, 17, 21] },
            { "name": "08", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [4, 5, 13, 16] },
            { "name": "09", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": 30, "puzzlesToSolve": 3, "blocksData": [2, 5, 9, 15, 19, 22] },
            { "name": "10", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 3, 11, 20, 23] }
        ]
    },

    {
        nickName: "P1K-4", name: "Bot03", cost: 00, free: true, levels: [
            { "name": "3.1", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 2, 3, 11, 13, 21, 22, 23] },
            { "name": "3.2", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [6, 7, 8, 16, 17, 18] },
            { "name": "3.3", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": 0, "blocksData": [1, 8, 10, 17, 24] },
            { "name": "3.4", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 4, 8, 11, 18, 20, 24] },
            { "name": "3.5", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 8, 11, 12, 13, 16, 17] },
            { "name": "3.6", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 3, 6, 10, 12, 14, 16, 20, 23] },
            { "name": "3.7", "width": 5, "height": 5, "type": "time", "theme": "purple", "moves": null, "time": 20, "puzzlesToSolve": 3, "randomMaxMoves": 4, "randomMinMoves": 3, "blocksData": [] },
            { "name": "3.8", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 1, 5, 8, 21, 24, 28, 29] },
            { "name": "3.9", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 2, 6, 12, 19, 21, 25] },
            { "name": "3.10", "width": 4, "height": 4, "type": "time", "theme": "yellow", "moves": null, "time": 20, "puzzlesToSolve": 10, "randomMaxMoves": 2, "randomMinMoves": 2, "blocksData": [] }]
    },
    {
        nickName: "L-1NK", name: "Bot04", cost: 00, free: true, levels: [
        { "name": "4.1", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [4, 8, 11, 16, 23, 29] },
        { "name": "4.2", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [2, 9, 10, 11, 15, 16, 24, 27] },
        { "name": "4.3", "width": 6, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 1, 3, 4, 12, 17, 25, 26, 28, 29] },
        { "name": "4.4", "width": 6, "height": 5, "type": "time", "theme": "green", "moves": null, "time": 25, "puzzlesToSolve": 5, "randomMaxMoves": 5, "randomMinMoves": 3 },
        { "name": "4.5", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 4, 7, 11, 16, 22, 25, 29] },
        { "name": "4.6", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [4, 5, 8, 12, 14, 17, 20, 23, 27, 29] },
        { "name": "4.7", "width": 6, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [7, 10, 12, 13, 15, 17, 18, 22] },
        { "name": "4.8", "width": 3, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 2, 4, 6, 7, 8, 10, 12, 14] },
        { "name": "4.9", "width": 3, "height": 3, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [1, 3, 4, 5, 6, 7] },
        { "name": "4.10", "width": 6, "height": 4, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 3, 6, 9, 10, 13, 14, 17, 20, 23] }
        ]
    },

    {
        name: "Bot05", cost: 00, nickName: "B00-M", free: true, levels: [
        { "name": "5.1", "width": 3, "height": 3, "type": "time", "theme": "green", "moves": null, "time": 10, "puzzlesToSolve": 5, "randomMaxMoves": 3, "randomMinMoves": 2, "blocksData": [] },
        { "name": "5.2", "width": 6, "height": 6, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 7, 14, 20, 25, 30, 31, 32] },
        { "name": "5.3", "width": 6, "height": 6, "type": "time", "theme": "green", "moves": null, "time": 25, "puzzlesToSolve": 4, "randomMaxMoves": 6, "randomMinMoves": 6, "blocksData": [] },
        { "name": "5.4", "width": 6, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [5, 7, 10, 19, 20, 24, 26, 28, 30, 31] },
        { "name": "5.5", "width": 4, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        { "name": "5.6", "width": 6, "height": 3, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 1, 2, 8, 9, 15, 16, 17] },
        { "name": "5.7", "width": 6, "height": 6, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [1, 2, 4, 6, 8, 17, 23, 24, 26, 31, 32, 34] },
        { "name": "5.8", "width": 5, "height": 5, "type": "moves", "theme": "yellow", "moves": 2, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 4, 20, 24] },
        { "name": "5.9", "width": 3, "height": 7, "type": "moves", "theme": "yellow", "moves": 3, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 3, 6, 14, 17, 20] },
        { "name": "5.10", "width": 6, "height": 5, "type": "moves", "theme": "yellow", "moves": 4, "time": null, "puzzlesToSolve": null, "randomMaxMoves": null, "randomMinMoves": null, "blocksData": [0, 8, 10, 19, 21, 29] }
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
    "bonus1": { id: "bonus1", cost: 3, timeOut: 24 * 60 },
    "bonus2": { id: "bonus2", cost: 20, timeOut: 1.5 * 24 * 60 },
    "bonus3": { id: "bonus3", cost: 30, timeOut: 2 * 24 * 6 }
}