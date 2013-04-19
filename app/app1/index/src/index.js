define(function (require, exports) {
    var $ = require("jquery"),
        Dialog = require("dialog");
    $("#btnDialog").bind("click", function () {
        var mapDialog = new Dialog({type: "text", value: 'hello world!', width:'230px', height:'60px'});
        mapDialog.show();
    })
});