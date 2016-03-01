var positions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var permanentPositions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var moves = []; // numbers represent indicies of permanentPositions array
// vertical check (3), horizontal check (3), diagonal check (2)
var verticalCheck = [0,1,2];
var horizontalCheck = [0,3,6];
var diagonalCheck = [0,2];

// TIDY UP CODE

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
        
        // for each starting vertical node (on the top)
        for (i = 0; i < verticalCheck.length; i++) {
            var startNode = $("#" + permanentPositions[verticalCheck[i]]).text();
            var win = true;
            // if all 3 nodes are identical, then win = true
            for (j = 0; j < 3; j++) {
                if (startNode != $("#" + permanentPositions[verticalCheck[i]+j*3]).text()) {
                    win = false;
                }
            }
            if (win === true) {
                $("#title").text(startNode);
            }
        }
        
        // for each starting horizontal node (on the left)
        for (i = 0; i < horizontalCheck.length; i++) {
            var startNode = $("#" + permanentPositions[horizontalCheck[i]]).text();
            var win = true;
            // if all 3 nodes are identical, then win = true
            for (j = 0; j < 3; j++) {
                if (startNode != $("#" + permanentPositions[horizontalCheck[i]+j]).text()) {
                    win = false;
                }
            }
            if (win === true) {
                $("#title").text(startNode);
            }
        }
        
        // for each starting diagonal node (top left and top right)
        for (i = 0; i < diagonalCheck.length; i++) {
            var startNode = $("#" + permanentPositions[diagonalCheck[i]]).text();
            var win = true;
            // if all 3 nodes are identical, then win = true
            for (j = 0; j < 3; j++) {
                if (i === 0) {
                    // top left to bottom right
                    if (startNode != $("#" + permanentPositions[diagonalCheck[i]+j*4]).text()) {
                        win = false;
                    }
                } else if (i === 1) {
                    // top right to bottom left
                    if (startNode != $("#" + permanentPositions[diagonalCheck[i]+j*2]).text()) {
                        win = false;
                    }
                }
            }
            if (win === true) {
                $("#title").text(startNode);
            }
        }
    });
    
    
});