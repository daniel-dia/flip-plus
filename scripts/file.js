/*============================================== Save ============================================== */
function saveFile(fileName, data) {
    var blob = new Blob([data], { type: "application/json" });

    if (navigator.msSaveBlob)
        navigator.msSaveBlob(blob, fileName);
    else
        window.saveAs(blob, fileName)
}

/*============================================== Load ============================================== */
var _fileLoaded;
function loadFile(fileLoaded) {

    _fileLoaded = fileLoaded;
    var fileInput = document.createElement('input');
    fileInput.type = "file";
    fileInput.setAttribute("style", "display: none");
    fileInput.setAttribute("accept", ".js")
    document.body.appendChild(fileInput);
    fileInput.onchange = function (evt) {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    if (_fileLoaded) _fileLoaded(e.target.result);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsText(f);
        }
    }

    fileInput.click();
    setTimeout(function () { document.body.removeChild(fileInput); }, 10000);
}


