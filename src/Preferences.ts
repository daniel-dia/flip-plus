var DefaultWidth = 1536;
var DefaultHeight = 2048 - 8;
var defaultFont = "'Exo 2.0'";

var defaultFontFamilyNormal = " 80px  " + defaultFont;
var defaultFontFamilyStrong = " 80px " + defaultFont;
var defaultFontFamilyHighlight = " Bold 130px " + defaultFont;
var defaultNumberHighlight = " 220px " + defaultFont;

var defaultFontColor = "#FF6";
var highlightFontColor = "#f2cb46";
var alternativeFontColor = "#3d8c9a";
var shadowFontColor = "#1b4f5e";

var storagePrefix = "flipp_";


var bonusStars = {
    "bonus1": 3,
    "bonus2": 20,
    "bonus3": 30
}; // stars needed

var bonusTimer = {
    "bonus1": 24 * 60,
    "bonus2": 1.5 * 24 * 60,
    "bonus3": 2 * 24 * 6
}; //in minutes