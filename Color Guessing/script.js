const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

var best

const lifelineDisplay = document.querySelector('#lifeline');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes);
const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');


//varaiables...

var currentStreak = 0; // user --> track
var bestStreak = 0;  // previously data fetch -> store
var pickCorrectColor = 0; // random color
var color = []; // empty array -> 6 - color store index by index
var num = 6;  // loop control 
var lives = 3;
var tempBox;


//This function is created because we don't need to call it agian and again to perform that task so return function 
function webLoad() {
    onLoad();
    setGame();
    displayContent();
    updateHearts();    //reset hearts at start
    newRoundBtn.disabled = false;  //disabled new round until you lose 
}

//whenever the website will load then first it will load the entire data..
function onLoad() {
    var temp = localStorage.getItem('highBestStreak');
    if (temp != null) {
        bestStreak = parseInt(temp);// -->  Here's the local storage contains the data so it will return the data not null (if there's anything other than integer parseInt will conver it to integer)
    }
    else {
        bestStreak = 0; //-> if there is no data in local storage so it will return null instead of number 
    }
}

function displayContent() {
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}

// Hearts update
function updateHearts() {
    if (lives === 3) {
        lifelineDisplay.textContent = "❤️❤️❤️"
    }
    else if (lives === 2) {
        lifelineDisplay.textContent = "❤️❤️"
    }
    else if (lives === 1) {
        lifelineDisplay.textContent = "❤️"
    }
    else {
        lifelineDisplay.textContent = ""
        currentStreak = 0;
        colorBoxes.forEach(box => {
            box.style.pointerEvents = "none";
            box.style.opacity = "0.5";
        })
        displayContent();
    }
}

//random color Generator....

function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    // console.log(`rgb(${a},${b},${c})`);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num) {  //num -> 6
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

function pickGenerator() {
    const index = Math.floor(Math.random() * color.length);
    console.log(index);
    return color[index];
}


function setGame() {
    color = generateColor(num);
    pickCorrectColor = pickGenerator();
    colorDisplay.textContent = pickCorrectColor;
    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];
        // colorBoxes[i].disabled.backgroundColor="";
        colorBoxes[i].disabled = false; // enable the box (correct way)
    }
}

webLoad();

function handleCorrectGuess() {
    if (pickCorrectColor === tempBox.style.backgroundColor) {
        tempBox.style.border = '3px solid blue';
        console.log(tempBox);

        if (currentStreak >= 3) {
            messageDisplay.innerHTML = 'Streak!';
            messageDisplay.style.color = 'green';
        }

        if (currentStreak === 1) {
            messageDisplay.innerHTML = "First Win";
        }
    }

    if (currentStreak > bestStreak) {
    bestStreak = currentStreak;
    localStorage.setItem('highBestStreak', bestStreak);
    bestStreakDisplay.textContent = bestStreak;       
    colorDisplay.style.fontWeight = 'bold';          
    }

}

function handleWrongGuess() {
    tempBox.classList.add('shake');
    setTimeout(()=>{
        tempBox.classList.remove('shake');
    },3000)
    
}


function winGuess(event) {
    tempBox = event.target;
    tempBox.disabled = true;
    console.log('you clicked same button');
    if (pickCorrectColor === tempBox.style.backgroundColor) {
        messageDisplay.textContent = "you won";
        colorDisplay.style.color = pickCorrectColor;
        currentStreak++;
        console.log(pickCorrectColor)
        // console.log("kamlesh");
        // handleCorrectGuess();
        
        colorBoxes.forEach(box => {
            box.style.pointerEvents = "none";
            box.style.opacity = "0.5";
        })
        
        handleCorrectGuess();
        displayContent();
        updateHearts();
        lives++;
    }
    else {
        messageDisplay.textContent = "try again";
        lives--;
        updateHearts();
        handleWrongGuess();
    }
}

newRoundBtn.addEventListener('click', function () {
    lives = 3;
    colorDisplay.style.color = 'white'
    tempBox.style.border = '';
    console.log(tempBox)
    colorBoxes.forEach(box => {
        box.style.pointerEvents = "auto";
        box.style.opacity = 1;
    })
    messageDisplay.textContent = "New Round Started";
    newRoundBtn.disabled = false; // disable again until next loss
    // updateHearts();
    setGame();
})

easyBtn.addEventListener('click', () => {
    num = 3;
    easyBtn.classList.add('select');
    hardBtn.classList.remove('selected');
    colorDisplay.style.color = 'white';
    for (var i = num; i < colorBoxes.length; i++) {
        if (i < 3) {
            colorBoxes[i].style.display = 'block';
        }
        else {
            colorBoxes[i].style.display = 'none';
        }
    }
    lives = 3;
    messageDisplay.textContent = 'Easy mode Activated';
    setGame();
    handleWrongGuess();
})

colorBoxes.forEach((box) => {
    // console.log(box);
    box.addEventListener('click', winGuess);
});


