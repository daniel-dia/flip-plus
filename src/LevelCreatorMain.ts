/*
/// <reference path="InvertCrossGame.ts" /> 

var sandboxLevel: InvertCross.GamePlay.LevelScreen;
var h: HTMLInputElement;
var w: HTMLInputElement;
var r: HTMLInputElement;
var levelname: HTMLInputElement;

window.onload = function () {
    InvertCross.InvertCrossaGame.initialize();
    resizeTo(300, 800);
    initialize();

};
          
function initialize() {
    h        = <HTMLInputElement> document.getElementById("h");
    w        = <HTMLInputElement> document.getElementById("w");
    levelname = <HTMLInputElement> document.getElementById("name");
    r         = <HTMLInputElement> document.getElementById("result");
}

function generate() {

    sandboxLevel = new InvertCross.GamePlay.LevelScreen(+w.value, +h.value, "simple");
    InvertCross.InvertCrossaGame.screenViewer.switchScreen(sandboxLevel);

}

function update() {

    var r = <HTMLDivElement> document.getElementById("result");
    r.innerHTML = serialize();
}


function load() {
    
    var mylevel;

    eval("var mylevel=" + r.value);
    w.value = mylevel.width;
    h.value = mylevel.height;
    levelname.value = mylevel.name;
    generate()
    sandboxLevel.level.board.setInvertedBlocks(mylevel.blocks);
    sandboxLevel.boardSprite.updateSprites();
    update();
}

function copy() {
    update();
    window.clipboardData.setData("Text", r.value)
    alert("text Copied");
}

function serialize(): string{
    if (!sandboxLevel) return "";

    var s: string = "";
    s += "{";
    s += "name:\"" + levelname.value + "\"";
    s += ",";
    s += "width:" + sandboxLevel.level.board.width;
    s += ",";
    s += "height:" + sandboxLevel.level.board.height;
    s += ",";
    s += "blocks:[" + sandboxLevel.level.board.getInvertedBlocks() + "]";
    s += "}";
    return s;
}
*/