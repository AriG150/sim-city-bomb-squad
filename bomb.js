
// Variables 
const STARTING_TIME = 30;
var remainingTime = 0; 
var gameOver = false;
var countDown = null;
var delay = null;

//false = not cut, true = cut // 
var wireState = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
}

var wiresToCut = [];

// DOM References
var timer = document.getElementById("timer");
var wireBox = document.getElementById("wirebox");
var resetButton = document.querySelector('button');
// TODO: add audio elements // 

// Event Listeners 
resetButton.addEventListener('click', reset);

wireBox.addEventListener('click', function(e) {
    var color = e.target.alt
    if (!wireState[color] && !gameOver && color){
        // If wire isn't cute and game isn't over...
        e.target.src = `img/cut-${color}-wire.png`;
        //TODO: play cut audio//
        wireState[color] = true;
        //Check for correctness: is it i 'wiresToCut', if it is we need to splice it out by knowing its index
        var wireIndex = wiresToCut.indexOf(color);
        if(wireIndex > -1) {
            //Correct wire cut 
            console.log(`${color} at index ${wireIndex} was correct`);
            wiresToCut.splice(wireIndex, 1);
            if (checkForWin()){
                endGame(true);
            }
        } else {
            //Incorrect wire cut 
            console.log(`${color} at index ${wireIndex} was wrong`);
            delay = setTimeout(endGame, 750, false);
            
        }

    }
});

// Functions 
function init(){
    wiresToCut.length=0;
    remainingTime = STARTING_TIME;
    for(let wire in wireState) {
        var rand = Math.random();
        if (rand > 0.5){
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    resetButton.disabled = true;
    //TODO: Play the siren 
    countDown = setInterval(updateClock, 1000);
}

function reset(){
    //Marking all wires uncut 
    for (let wire in wireState){
        wireState[wire] = false;
    }
    var color;
    for (let i = 0; i < wireBox.children.length; i++){
        color = wireBox.children[i].alt
        wireBox.children[i].src = `img/uncut-${color}-wire.png`
    }
    gameOver = false;
    document.body.classList.remove('exploded');
    timer.classList.remove('green');
    clearTimeout(delay);
    clearInterval(countDown);

    //TODO: Stop playing audio (victory and/or explosion)
    init();
}

function checkForWin() {
    return wiresToCut.length ? false : true; 
}

function endGame(win){
    clearTimeout(delay);
    clearInterval(countDown);
    gameOver = true;
    resetButton.disabled = false;


    if (win) {
        //we won! 
        console.log("You've saved the city!");
        timer.classList.add('green');
        //TODO: cheer
    }else{
        //we lose. 
        console.log("CaBOOOOM 💣")
        //TODO: explosion audio
        document.body.classList.add('exploded');

    }
}

function updateClock(){
    remainingTime --;
    if (remainingTime <= 0){
        endGame(false);
    }
    timer.textContent = `0:00:${remainingTime}`;
}

init();