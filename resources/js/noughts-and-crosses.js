var positions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var permanentPositions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
// vertical check (3), horizontal check (3), diagonal check (2)
var verticalCheck = [0,1,2];
var horizontalCheck = [0,3,6];
var diagonalCheck = [0,2];
// tracks who is using noughts, and who is using crosses
var player = "";
var opponent = "";
var win = false;

function compMove() {
    var compMoveIndex = Math.floor(Math.random()*positions.length);
    $("#" + positions[compMoveIndex]).text(opponent);
    positions.splice(compMoveIndex, 1);
}

function winCondition(winner, direction, winIndex) {
    win = true;
    if (winner == player) {
        $("#endModalLabel").text("You Win!");
    } else if (winner == opponent) {
        $("#endModalLabel").text("You Lose!");
    } else {
        $("#endModalLabel").text("Draw!");
    }
    // adding highlighting if player or computer wins
    if (winner != "draw") {
        for (i = 0; i < 3; i++) {
            if (direction == "vertical") {
                if (winner == player) {
                    $("#" + permanentPositions[winIndex+i*3]).addClass("btn-success");
                } else {
                    $("#" + permanentPositions[winIndex+i*3]).addClass("btn-danger");
                }
            } else if (direction == "horizontal") {
                if (winner == player) {
                    $("#" + permanentPositions[winIndex+i]).addClass("btn-success");
                } else {
                    $("#" + permanentPositions[winIndex+i]).addClass("btn-danger");
                }
            } else if (direction == "diagonal") {
                if (winIndex == 0) {
                    if (winner == player) {
                        $("#" + permanentPositions[winIndex+i*4]).addClass("btn-success");
                    } else {
                        $("#" + permanentPositions[winIndex+i*4]).addClass("btn-danger");
                    }
                } else {
                    if (winner == player) {
                        $("#" + permanentPositions[winIndex+i*2]).addClass("btn-success");
                    } else {
                        $("#" + permanentPositions[winIndex+i*2]).addClass("btn-danger");
                    }
                }
            }
        }
    }
    $("#endModal").modal("show");
    moves = [];
    positions = permanentPositions.slice();
}

function winCheck() {
    // checking for win conditions
    // for each topmost node
    for (i = 0; i < verticalCheck.length; i++) {
        var startNode = $("#" + permanentPositions[verticalCheck[i]]).text();
        if (startNode != "") {
            var win = true;
            // if any node under it is not identical, there is not a match (win = false)
            for (j = 0; j < 3; j++) {
                if (startNode != $("#" + permanentPositions[verticalCheck[i]+j*3]).text()) {
                    win = false;
                }
            }
            if (win === true) {
                winCondition(startNode, "vertical", verticalCheck[i]);
            }
        }
    }

    // for each leftmost node
    for (i = 0; i < horizontalCheck.length; i++) {
        var startNode = $("#" + permanentPositions[horizontalCheck[i]]).text();
        if (startNode != "") {
            var win = true;
            // if any node to the right of it is not identical, there is not a match (win = false)
            for (j = 0; j < 3; j++) {
                if (startNode != $("#" + permanentPositions[horizontalCheck[i]+j]).text()) {
                    win = false;
                }
            }
            if (win === true) {
                winCondition(startNode, "horizontal", horizontalCheck[i]);
            }
        }
    }

    // for each starting diagonal node (top left and top right)
    for (i = 0; i < diagonalCheck.length; i++) {
        var startNode = $("#" + permanentPositions[diagonalCheck[i]]).text();
        if (startNode != "") {
            var win = true;
            // if any node in to its right/left diagonal is not identical, there is not a match (win = false)
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
                winCondition(startNode, "diagonal", diagonalCheck[i]);
            }
        }
    }
    //checking for a draw
    if (positions.length == 0) {
        winCondition("draw", null);
    }
}


$(document).ready(function() {
    $("#startModal").modal("show");
    
    $("#btn-nought").on("click", function() {
        player = $("#btn-nought").text();
        opponent = $("#btn-cross").text();
        compMove();
    });
    
    $("#btn-reset").on("click", function() {
        for (i = 0; i < permanentPositions.length; i++) {
            $("#" + permanentPositions[i]).text("");
            $("#" + permanentPositions[i]).removeClass("btn-success");
            $("#" + permanentPositions[i]).removeClass("btn-danger");
        }
        win = false;
        compMove();
    });
    
    $("#btn-cross").on("click", function() {
        player = $("#btn-cross").text();
        opponent = $("#btn-nought").text();
        compMove();
    });
    
    $(".btn-grid").on("click", function() {
        var position = $(this).attr("id");
        var moveIndex = positions.indexOf(position);
        
        if ($(this).text() != "X" && $(this).text() != "O") {
            // player move
            $("#" + position).text(player);
            positions.splice(moveIndex, 1);
            winCheck();
            // computer move
            if (win === false) {
                compMove();
                winCheck();
            }
        }
    }); 
});