var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');
var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var statusMessage = document.querySelector('#statusMessage');
var clickPerSec = document.querySelector('#clickPerSec')

// Extra variable required -> total: 5

var current = 0;
var high = 0;
var timer1 = 10;
var flag = false;
var timeId = null;
var scale = 1;

function onWebsite() {
  loadData();
  displayContent();
}
function loadData() {
  var temp = localStorage.getItem('highScore');
  if (temp != null) {
    high = temp;
  }
  else {
    high = 0;
  }
}

function displayContent() {
  currentScore.textContent = current;
  highScore.textContent = high;
  timer.textContent = timer1;
}

function statusMsg(msg) {
  statusMessage.textContent = msg;
}


function endGame() {
  clearInterval(timeId);
  flag = false;
  clickButton.disabled = true;
  startButton.disabled = false;
  clickButton.style.transform = 'scale(1.0)';

  if (current > high) {
    localStorage.setItem('highScore', current);
    highScore.textContent = current;
    statusMsg("Scored High");

    //   6. Confetti on New High Score
    // What: If new high score → change background to yellow flash for 1 sec.
    // Where: In endGame() → document.body.style.background = 'gold' + setTimeout to reset.
    document.body.style.background = 'gold';
    setTimeout(() => {
      document.body.style.background = `linear-gradient(135deg, #1f1f1f, #2e2e2e)`
    }, 1000)
  }
  else {
    statusMsg(`Your current score is ${current}`);
  }
  
  //   4. Show Clicks Per Second (CPS)
  // What: At game end, show "You clicked X times per second!".
  // Where: In endGame() → calculate currentScore / 10.
  clickPerSec.textContent = `Click / Second = ${current / 10}`;

  //   5. Start Button Says "Play Again" After Game
  // What: After game ends, change Start button text to "Play Again".
  // Where: In endGame() → startButton.innerText = "Play Again"
  startButton.innerHTML = 'Play Again';
}


function startGame() {
  clickPerSec.textContent = 'Click / Second = 0'
  clickButton.disabled = false;
  startButton.disabled = true;
  clickButton.style.backgroundColor = 'red';
  flag = true;
  timer1 = 10;
  current = 0;
  scale = 1;

  //   2. "Click Me!" Message Flashes on Start
  // What: When game starts, show "Click Me!" for 1 second.
  // Where: In startGame() → setTimeout to clear a message.
  statusMsg("Click Me!");
  var tempId = setTimeout(() => {
    if (timer1 > 1) {
      statusMsg("The Game is Started")
    }
  }, 1000)


  timeId = setInterval(
    function () {
      timer1--; // 10,9,8,7,6,5,4,3,2,1,,-1
      if (timer1 <= 0) {
        endGame();
      }
      displayContent();
    }, 1000)
}

function handleClick() {
  if (scale < 2) {
    scale = scale + 0.01;
  }
  clickButton.style.transform = `scale(${scale})`;
}

// 1. Click Counter Turns Red When > 20
// What: When score goes above 20, make the score text red.
// Where: In updateDisplay() → add a line with style.color.
function updateDisplay() {
  if (current > 20) {
    currentScore.style.color = 'red';
  }
  else {
    currentScore.style.color = '#4ecdc4';
  }
}

function userClick() {
  if (flag) {
    current++;
    displayContent();
  }
  displayContent();
  handleClick();
}

onWebsite();

startButton.addEventListener('click', startGame);

clickButton.addEventListener('click', userClick);