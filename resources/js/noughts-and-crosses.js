var positions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
var permanentPositions = ["top-left", "top-mid", "top-right", "mid-left", "mid-mid", "mid-right", "btm-left", "btm-mid", "btm-right"];
// vertical check (3), horizontal check (3), diagonal check (2)
var verticalCheck = [0,1,2];
var horizontalCheck = [0,3,6];
var diagonalCheck = [0,2];
// tracks who is using noughts, and who is using crosses
var player = "";
var opponent = "";

// TIDY UP CODE
// modal should pop up at start, and once won

function winCondition(winner) {
    if (winner == player) {
        $("#endModalLabel").text("You Win!");
    } else if (winner == opponent) {
        $("#endModalLabel").text("You Lose!");
    } else {
        $("#endModalLabel").text("Draw!");
    }
    $("#endModal").modal("show");
    moves = [];
    positions = permanentPositions;
    for (i = 0; i < permanentPositions.length; i++) {
        //console.log(permanentPositions[i]);
        $("#" + permanentPositions[i]).text("");
    }
}

$(document).ready(function() {
    $("#startModal").modal("show");
    
    $("#btn-nought").on("click", function() {
        player = $("#btn-nought").text();
        opponent = $("#btn-cross").text();
    });
    
    $("#btn-cross").on("click", function() {
        player = $("#btn-cross").text();
        opponent = $("#btn-nought").text();
    });
    
    $(".btn-default").on("click", function() {
        var position = $(this).attr("id");
        var moveIndex = positions.indexOf(position);
        
        if ($(this).text() != "X" && $(this).text() != "O") {
            $("#" + position).text(player);
            positions.splice(moveIndex, 1);
            var compMoveIndex = Math.floor(Math.random()*positions.length);
            $("#" + positions[compMoveIndex]).text(opponent);
            positions.splice(compMoveIndex, 1);
            
            
            
            // for each starting vertical node (on the top)
            console.log("check vertical");
            for (i = 0; i < verticalCheck.length; i++) {
                var startNode = $("#" + permanentPositions[verticalCheck[i]]).text();
                if (startNode != "") {
                    var win = true;
                    // if all 3 nodes are identical, then win = true
                    for (j = 0; j < 3; j++) {
                        if (startNode != $("#" + permanentPositions[verticalCheck[i]+j*3]).text()) {
                            console.log(startNode + " " + $("#" + permanentPositions[verticalCheck[i]+j*3]).text());
                            win = false;
                        }
                    }
                    if (win === true) {
                        winCondition(startNode);
                    }
                }
            }

            // for each starting horizontal node (on the left)
            console.log("check horizontal");
            for (i = 0; i < horizontalCheck.length; i++) {
                var startNode = $("#" + permanentPositions[horizontalCheck[i]]).text();
                if (startNode != "") {
                    var win = true;
                    // if all 3 nodes are identical, then win = true
                    
                    for (j = 0; j < 3; j++) {
                        if (startNode != $("#" + permanentPositions[horizontalCheck[i]+j]).text()) {
                            console.log(startNode + " " + $("#" + permanentPositions[verticalCheck[i]+j]).text()); 
                            win = false;
                        }
                    }
                    if (win === true) {
                        winCondition(startNode);
                    }
                }
            }

            // for each starting diagonal node (top left and top right)
            console.log("check diagonal");
            for (i = 0; i < diagonalCheck.length; i++) {
                var startNode = $("#" + permanentPositions[diagonalCheck[i]]).text();
                if (startNode != "") {
                    var win = true;
                    // if all 3 nodes are identical, then win = true
                    for (j = 0; j < 3; j++) {
                        if (i === 0) {
                            // top left to bottom right
                            if (startNode != $("#" + permanentPositions[diagonalCheck[i]+j*4]).text()) {
                                console.log(startNode + " " + $("#" + permanentPositions[verticalCheck[i]+j*4]).text()); 
                                win = false;
                            }
                        } else if (i === 1) {
                            // top right to bottom left
                            if (startNode != $("#" + permanentPositions[diagonalCheck[i]+j*2]).text()) {
                                console.log(startNode + " " + $("#" + permanentPositions[verticalCheck[i]+j]).text());
                                win = false;
                            }
                        }
                    }
                    if (win === true) {
                        winCondition(startNode);
                    }
                }
            }
            //checking for a draw
            
            if (positions.length == 0) {
                console.log("check draw");
                winCondition("draw");
            }
        }
    }); 
});