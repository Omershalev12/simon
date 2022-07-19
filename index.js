var colorArr = ["red","blue","green","yellow"];
var gameSequence = [];
var playerSequence = [];
var levelCount = 0;
$(document).keypress(game);
$(document).on('tap', game);
$("button").click(playerChoose);

function game(){
    playerSequence = [];
    $(document).off();
    levelCount = gameSequence.length + 1;
    $("h1").html("Level " + levelCount);
    var nextColor = colorArr[nextMove()];
    gameSequence.push(nextColor);
    $("#" + nextColor).fadeOut(100).fadeIn(100);
    var audio1 = new Audio ("sounds/" + nextColor + ".mp3");
    audio1.play();
}

function nextMove(){
    var randomColor = Math.floor(Math.random() * 4);
    return randomColor;
}

function playerChoose(){
    chosenColor = $(this).attr("id");
    playerSequence.push(chosenColor);
    $("button#" + chosenColor).addClass("pressed");
    setTimeout(function(){ $("button#" + chosenColor).removeClass("pressed");}, 100);
    isCorrect();
}

function isCorrect(){
    if(playerSequence[(playerSequence.length - 1)] !== gameSequence[(playerSequence.length - 1)] || playerSequence.length > gameSequence.length){
        startOver();
    }
    else{
        var audio1 = new Audio ("sounds/" + chosenColor + ".mp3");
        audio1.play();
        if(playerSequence.length === gameSequence.length){
            setTimeout(game, 1000);
        }
    }
}

function startOver() {
    var audio1 = new Audio ("sounds/wrong.mp3");
    audio1.play();
    gameSequence = [];
    levelCount = 0;
    $(document).keypress(game);
    $("h1").html("Game Over, Press Any Key to Restart");
}