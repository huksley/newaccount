//  http://stackoverflow.com/questions/31391207/javascript-readasbinarystring-function-on-e11
if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
       var binary = "";
       var pt = this;
       var reader = new FileReader();      
       reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            //pt.result  - readonly so assign binary
            pt.content = binary;
            $(pt).trigger('onload');
        }
        reader.readAsArrayBuffer(fileData);
    }
}

var IE = navigator.appVersion;
if (String(IE).indexOf("Trident/") > 0) {
    var tr = parseInt(String(IE).replace(/.*Trident\//, "").replace(";.*", ""));
    if (tr > 0 && tr < 7) {
        alert("Internet explorer is too old (" + tr + ")\n" + IE);
    }
}

define("util", [ "admin-lte" ], function () {
});