var positions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var moves = []; // moves given as indexes of positions array, e.g. 1 = top-mid

$(document).ready(function() {
    $(".btn").on("click", function() {
        var position = $(this).attr("id");
        var validMove = true;
        
        if ($(this).text() != "X" && $(this).text() != "O") {
            $("#" + position).text("X");
        }
    });
});