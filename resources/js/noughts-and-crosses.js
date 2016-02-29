var positions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var moves = [];

$(document).ready(function() {
    $(".btn-default").on("click", function() {
        var position = $(this).attr("id");
        var moveIndex = positions.indexOf(position);
        
        if ($(this).text() != "X" && $(this).text() != "O") {
            $("#" + position).text("X");
            moves.push(moveIndex);
            positions.splice(moveIndex, 1);
            var compMoveIndex = Math.floor(Math.random()*positions.length);
            $("#" + positions[compMoveIndex]).text("O");
            moves.push(compMoveIndex)
            positions.splice(compMoveIndex, 1);
        }
    });
});