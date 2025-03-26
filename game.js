var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

// game progress and sequence
function nextSequence() {
    var randomNumber = Math.floor((Math.random()) * 4);
    var randomChoosenColour = buttonColours[randomNumber];
    $("h1").text("level " + level);
    gamePattern.push(randomChoosenColour);
    console.log(gamePattern);
    $("#" + randomChoosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    level++;
}

// user click capture
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length) - 1);
});

// button sound
function playSound(name) {
    switch (name) {
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;

        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;

        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();

            break;

        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;

        default:
            break;
    }
}

// button animation
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

// game start logic
$(document).keydown(() => {
    if (gamePattern.length === 0) {
        nextSequence();
    } else {
        console.log(false);
    }
})

// check answer logic
function checkAnswer(currentLevel) {
    if (userClickedPattern[(userClickedPattern.length) - 1] === gamePattern[(userClickedPattern.length) - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }


    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 100);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// game restart logic
function startOver() {
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
}