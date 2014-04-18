var levels = [

            { type: "puzzle", name: "01", theme: "green", width: 5, height: 5, blocksData: [2, 12, 22] },
            //{ type: "moves", name: "02", theme: "green", width: 5, height: 5, moves: 4, blocksData: [5, 9, 15, 19], drawData: [6, 8, 16, 18] },
            //{ type: "moves", name: "03", theme: "green", width: 5, height: 5, moves: 4, blocksData: [0, 10, 12, 20] },
            //{ type: "moves", name: "04", theme: "purple", width: 5, height: 5, moves: 4, blocksData: [7, 11, 13, 17] },
            { type: "flip", name: "08", theme: "purple", width: 5, height: 5, moves:6, puzzlesToSolve: 5},
            { type: "time", name: "05", theme: "yellow", width: 5, height: 5, time: 2, puzzlesToSolve: 1 },



]

var levelsData = [
    {

        nickName: "S-N3S", name: "Bot01", cost: 00, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [12], tutorial: [{ text: "flip white squares to color squares", title: "The plus shape" }, { click: 12 }, {atEnd:true,  text: "tiles always flip in a \"plus shape\" \nfrom the center", title: "Great" }] },
            { "name": "02", "width": 5, "height": 5, "type": "tutorial", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [8, 16], tutorial: [{ text: "to finish the board, you have to turn \nevery white block in color block", title: "Flip to build" }, { click: 8 }, { atEnd: true, text: "Great, no white tiles in the board", title: "Board complete!" }, { atEnd: true, text: "you solved all green blocks", title: "Star" }] },
            { "name": "03", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [2, 12, 22], tutorial: [{ text: "the plus shape inverts the tile, \nwhite gets color and color gets white", title: "Flip to invert" }, { click: 2 }, { atEnd: true, text: "purple tiles work the \nsame way as green tiles", title: "Nice Work" }] },
            { "name": "04", "width": 5, "height": 5, "type": "tutorial", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 12, 17], tutorial: [{ text: "the light bulb button gives you a hin", title: "hints" }, { item: "hint", parameter: 7 }, { click: 7 }, { atEnd: true, text: "light bulbs help you out, \nbut they are limited", title: "too easy?" }, { atEnd: true, text: "you don't get a star when you use itens \nto solve the board,\nbut keep going for now, Nes need repairs", title: "No star" }] },
            { "name": "05", "width": 5, "height": 5, "type": "tutorial", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [2, 10, 12, 14, 22], tutorial: [{ text: "finish this board \nto complete S-N3S repairs!", title: "Bot S-N3S" }, { click: 2 }] }
        ], free: true
    },
    {
        nickName: "RMS-M", name: "Bot02", cost: 02, levels: [
            { "name": "01", "width": 5, "height": 5, "type": "draw", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [4, 8, 16, 20] },
            { "name": "02", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 11, 13, 17] },
            { "name": "03", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 4, 6, 12, 18, 20, 24] },
            { "name": "04", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [6, 8, 12, 16, 18] },
            { "name": "05", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 5, 19, 23] },
            { "name": "06", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 4, 11, 14, 21, 24] },
            { "name": "07", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [3, 7, 9, 11, 13, 15, 17, 21] },
            { "name": "08", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [4, 5, 13, 16] },
            { "name": "09", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": 30, "puzzlesToSolve": 3, "blocksData": [2, 5, 9, 15, 19, 22] },
            { "name": "10", "width": 5, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 3, 11, 20, 23] }],
        free: true
    },

    {
        nickName: "P1K-4", name: "Bot03", cost: 05, levels: [
          { "name": "3.1", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [1, 2, 3, 11, 13, 21, 22, 23] },
          { "name": "3.2", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [6, 7, 8, 16, 17, 18] },
          { "name": "3.3", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": 0, "blocksData": [1, 8, 10, 17, 24] },
          { "name": "3.4", "width": 5, "height": 5, "type": "puzzle", "theme": "green", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 4, 8, 11, 18, 20, 24] },
          { "name": "3.5", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [7, 8, 11, 12, 13, 16, 17] },
          { "name": "3.6", "width": 5, "height": 5, "type": "puzzle", "theme": "purple", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 3, 6, 10, 12, 14, 16, 20, 23] },
          { "name": "3.7", "width": 5, "height": 5, "type": "time", "theme": "purple", "moves": null, "time": 30, "puzzlesToSolve": 3, "blocksData": [] },
          { "name": "3.8", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 1, 5, 8, 21, 24, 28, 29] },
          { "name": "3.9", "width": 6, "height": 5, "type": "puzzle", "theme": "yellow", "moves": null, "time": null, "puzzlesToSolve": null, "blocksData": [0, 2, 6, 12, 19, 21, 25] },
          { "name": "3.10", "width": 6, "height": 5, "type": "time", "theme": "yellow", "moves": null, "time": 20, "puzzlesToSolve": 3, "blocksData": [] }]
, free: true
    },
    { name: "Bot04", cost: 05, levels: JSON.parse(JSON.stringify(levels)), nickName: "L-1NK", free: true },
    { name: "Bot05", cost: 11, levels: JSON.parse(JSON.stringify(levels)), nickName: "B00-M", free: true },
    { name: "Bot06", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "K-R8Y", free: true },
    { name: "Bot07", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "ME64-x", free: true },
    { name: "Bot08", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "K0N-6", free: true },
    { name: "Bot09", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "B-GH",  free: true },
    { name: "Bot10", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "BJ-KZ", free: true },
    { name: "Bot11", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "BMS-M", free: true },
    { name: "Bot12", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "S-H06", free: true },
    { name: "Bot13", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "D-D1",  free: true },
    { name: "Bot14", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "R-GH",  free: true },
    { name: "Bot15", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "P4C-M", free: true },
    { name: "Bot16", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "G-GH",  free: true },
    { name: "Bot17", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "T-BLK", free: true },
    { name: "Bot18", cost: 15, levels: JSON.parse(JSON.stringify(levels)), nickName: "Y0S-1", free: true },
]


