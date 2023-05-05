let gamePattern = [];                           
let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

$(".btn").on("click",function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);                 // Play sound
    animatePress(userChosenColour);             // Animation
    checkAnswer(userClickedPattern.length-1);   // userClickedPattern.length alway set to 1-4. because lenght = 4. so need to -1 for 0 - 3 array.
})

$(document).on("keypress" ,function(){
    if (!gameStarted){                           // "!": if gameStarted = false;
        $("#level-title").text("Level" + level);
        nextSquence();
        gameStarted = true;
    }
})

function nextSquence(){                                      // this is start of game. userClicledPattern need always empty array.
    userClickedPattern = [];        
    let randomNumber = Math.floor(Math.random() * 4) ;      // generate 0 - 3 random number
    let randomChosenColour = buttonColors[randomNumber];    // call to buttonColors[] which array in color.
    gamePattern.push(randomChosenColour);                   // gamePattern take random array number(color) and push empty array.

    playSound(randomChosenColour);                                      // Play sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   // Animation
    level++;                                                            // level always +1
    $("#level-title").text("Level "+ level);                            // change level-title html into the new one.
}

function playSound(name){
    let soundS = new Audio("sounds/" + name + ".mp3")                    
    soundS.play();                                                      
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed")
    },100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){       // if gamepattern and userpattern is same. call to nextSquence function after 1000ms.
            setTimeout(function(){
                nextSquence();
            }, 1000);
        }
    }
    else {                                                         // if not call to startover and restart the game.
        let wSound = new Audio("sounds/wrong.mp3");                // dont forget gameStarted = false in startOver function. 
        wSound.play();                                             // because key press only work if gameStarted = false;
        bodyWrong();
        console.log("Wrong");
        startOver();
    }
}

function bodyWrong(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart.")
}

function startOver(){
   level = 0;               // game restart always start level 0
   gamePattern = []         // gamePatter always empty when restarting.
   gameStarted = false;     // gameStarted need to false. because keypress function only work if gameStarted = false. if its not, never restar the game.
}