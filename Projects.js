var levels = [

            { type: "puzzle", name: "01", theme: "green", width: 5, height: 5, blocksData: [2, 12, 22] },
            //{ type: "moves", name: "02", theme: "green", width: 5, height: 5, moves: 4, blocksData: [5, 9, 15, 19], drawData: [6, 8, 16, 18] },
            //{ type: "moves", name: "03", theme: "green", width: 5, height: 5, moves: 4, blocksData: [0, 10, 12, 20] },
            //{ type: "moves", name: "04", theme: "purple", width: 5, height: 5, moves: 4, blocksData: [7, 11, 13, 17] },
            { type: "flip", name: "08", theme: "purple", width: 5, height: 5, moves: 5, blocksData: [5, 9, 11, 13, 15, 19] }, 
            { type: "time", name: "05", theme: "yellow", width: 5, height: 5, time: 2, puzzlesToSolve: 1 },
           
            

]

var levelsData = [
    {
        nickName: "Robot01", name: "Bot01", cost: 00, levels: [
            {
                type: "tutorial", name: "01", theme: "green", width: 5, height: 5, blocksData: [12], tutorial: [
                  {text: "Click to invert a +"},
                  { click: 12 }
                ]
            },
            {
                type: "tutorial", name: "02", theme: "green", width: 5, height: 5, blocksData: [11, 13], tutorial: [
                  { click: 11 },
                  { click: 13 }
                ]
            },
            {
                type: "tutorial", name: "03", theme: "purple", width: 5, height: 5, blocksData: [2, 22], tutorial: [
                  { click: 2  },
                  { click: 22 }
                ]
            },
            {
                type: "tutorial", name: "04", theme: "purple", width: 5, height: 5, blocksData: [0, 4, 24, 20], tutorial: [
                  { click: 0  },
                  { click: 4  },
                  { click: 24 },
                  { click: 20 },
                ]
            },
            {
                type: "tutorial", name: "08", theme: "yellow", width: 5, height: 5, blocksData: [12, 17, 7], tutorial: [
                  { item: "hint", parameter:12},
                  { click: 12 },
                  { click: 7  },
                  { click: 17 },
                ]
            },
        ], free: true                                                                                  
    },

    { nickName: "Robot02", name: "Bot02", cost: 02, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot03", name: "Bot03", cost: 05, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot04", name: "Bot04", cost: 05, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot05", name: "Bot05", cost: 11, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot06", name: "Bot06", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot07", name: "Bot07", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot08", name: "Bot08", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot09", name: "Bot09", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot10", name: "Bot10", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "Robot11", name: "Bot11", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot12", name: "Bot12", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot13", name: "Bot13", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot14", name: "Bot14", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot15", name: "Bot15", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot16", name: "Bot16", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot17", name: "Bot17", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
    { nickName: "robot18", name: "Bot18", cost: 15, levels: JSON.parse(JSON.stringify(levels)), free: true },
]



