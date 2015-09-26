function createSpriteSheetFromFont(fontJson,imagePath) {

    var frames = [];
    var animations = {}

    var newchar = [];
    for (var c in fontJson.chars.char) {
        var char = fontJson.chars.char[c];
         if (char["@height"] <1) char["@height"] = 1
         if (char["@width"] <1) char["@width"] = 1

         frames[c] = [
             parseInt(char["@x"]),
             parseInt(char["@y"]),
             parseInt(char["@width"]), // Math.ceil(parseInt(char["@width"]/15)) + 
             parseInt(char["@height"]),
             0,
             parseInt(-char["@xoffset"]),
             parseInt(-char["@yoffset"])
             ];
         animations[String.fromCharCode(char["@id"]).toString()] = parseInt(c);
    }

    return {
        "images": [imagePath + fontJson.pages[0]['@file']],
        "frames": frames,
        "animations": animations
    }
}