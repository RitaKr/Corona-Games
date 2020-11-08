const words = [
    {
        word: 'красный',
        color: 'red',
        id: 0,
    },
    {
        word: 'белый',
        color: 'white',
        id: 1,
    },
    {
        word: 'синий',
        color: 'blue',
        id: 2,
    },
    {
        word: 'жёлтый',
        color: 'yellow',
        id: 3,
    },
    {
        word: 'оранжевый',
        color: 'orangered',
        id: 4,
    },
    {
        word: 'зелёный',
        color: 'green',
        id: 5,
    },
    {
        word: 'фиолетовый',
        color: 'purple',
        id: 6,
    },
    {
        word: 'чёрный',
        color: 'black',
        id: 7,
    },
    {
        word: 'серый',
        color: 'gray',
        id: 8,
    },
    {
        word: 'коричневый',
        color: 'saddlebrown',
        id: 9,
    },
    {
        word: 'голубой',
        color: 'royalblue',
        id: 10,
    },
    {
        word: 'розовый',
        color: 'hotpink',
        id: 11,
    },
];
let colors = ['red', 'white', 'blue', 'yellow', 'orangeRed', 'green', 'purple', 'black', 'gray', 'saddlebrown','royalblue', 'hotpink'];

const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const endgameEl = document.getElementById('end-game');

//localStorage.clear();

function setGameLocalItems() {
    if (localStorage.CWtimesPlayed == null) {
        localStorage.setItem('CWtimesPlayed', 0);
    } 
    if (localStorage.CWbestScore== null) {
        localStorage.setItem('CWbestScore', 0);
    } 
}



let randomWordObj;
let color;
let rightAnswer;
let rightId;
let score = 0;
let time = 30;
let gameoverTitle;
let timeInterval;
let mistakeRoot = 0;

function updateGameLocalInners() {
    bestEl.innerHTML = localStorage.CWbestScore;
    timesPlayedSpan.innerHTML = localStorage.CWtimesPlayed;
    if (localStorage.CWtimesPlayed>1 && localStorage.CWtimesPlayed<5) {
        TimesWordEnding.innerHTML="а"
    } else  {
        TimesWordEnding.innerHTML=""
    }
}



function updateTime (){
    time--;
    timeEl.innerHTML = time + " с";
    if (time===0) {
        gameOver('timeout');
    }
}

function gameOver(reason){
    clearInterval(timeInterval);
    switch (reason) {
        case 'timeout': gameoverTitle = 'Время вышло! Игра окончена'
        break;
        case 'wrong': gameoverTitle = 'Неправильный ответ! Игра окончена'
        break;
    }
    endgameEl.innerHTML = `
    <h1>${gameoverTitle}</h1>
    <p>Твой счёт ${score}</p>
    <button onclick="location.reload()" class="restart">Заново</button>
    <div id="endgame-achivments"></div>
    `;
    const endgameAchivments = document.getElementById('endgame-achivments');
    endgameEl.style.display = 'flex';
        if (score>=15) {
            localStorage.tp= +localStorage.tp + Math.floor(score/8);
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Вы добыли туалетную бумагу в количестве ${Math.floor(score/8)} шт!</p><img src="../images/tp.png" height="80px"></div>`;
            
        }
        if (score>=20) {
            localStorage.msk= +localStorage.msk + Math.floor(score/11);
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Вы добыли маски в количестве ${Math.floor(score/11)} шт!</p><img src="../images/msk.png" height="80px"></div>`;
        }
        if (score>=30) {
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+'<div><p>Вы добыли антисептик!</p><img src="../images/an.png" height="80px"></div>';
            localStorage.an++;
        } 
        
    //location.reload();
    console.log('score',score);

    if (localStorage.CWbestScore<score) {
        localStorage.CWbestScore=score;
    } 
    console.log('best score',localStorage.CWbestScore);
    localStorage.CWtimesPlayed++;
    updateGameLocalInners()
}

function getRandomWord(arr){
    return arr[Math.floor(Math.random()*arr.length)];
   
}

function generateAnswers() {
    let f=false;
    let f2=false;
    let buttonsArr = ['btn1', 'btn2', 'btn3', 'btn4'];
    document.querySelectorAll('.answer').forEach((item, i) => {
        item.style.backgroundColor = getRandomWord(colors);
        item.classList.remove('right');
        if (item.style.backgroundColor === randomWordObj.color) {
            f=true; 
            rightId = item.id; 
            buttonsArr.splice(i, 1)
        }
        if (item.style.backgroundColor === color) {
            f2=true;
            teaseId = item.id; 
            buttonsArr.splice(i, 1)
        }
    });
    
    if (f==false) {
        rightId = getRandomWord(buttonsArr);
        buttonsArr.splice(buttonsArr.indexOf(rightId), 1);  
        document.getElementById(rightId).style.backgroundColor = randomWordObj.color;
    }
    if (f2==false) {
        teaseId = getRandomWord(buttonsArr);
        if (rightId !== teaseId) {
            buttonsArr.splice(buttonsArr.indexOf(teaseId), 1);
            document.getElementById(teaseId).style.backgroundColor = color;
        } else {
            teaseId = getRandomWord(buttonsArr);
        }
        
    }
}
function addWordToDOM(){
    randomWordObj = getRandomWord(words);
    color = getRandomWord(colors);
    word.innerHTML = randomWordObj.word;
    word.style.color = color;  
}
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
    updateGameLocalInners()
}
function newRound() {
    addWordToDOM();
    generateAnswers();
    
}
function startGame(reason) {
    timeInterval = setInterval(updateTime, 1000);
    newRound();
    switch (reason) {
        case 'restart': 
        score = 0;
    time = 30;
        endgameEl.remove();
        updateScore()
        break;
        case 'start': 
        startBtn.remove();
        break;
    }
    
}
document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click',e =>{
        if (item.style.backgroundColor === randomWordObj.color) {
            newRound();
            updateScore()
        } else if (mistakeRoot>0) {
            mistakeRoot--;
        } else {
            gameOver('wrong');
        } 
})  
})

function tpUseActions(){
    localStorage.tp--;
    time+=3;
}
function mskUseActions(){
    localStorage.msk--;
    mistakeRoot++;
}
function anUseActions(){
    localStorage.an--;
    mistakeRoot++;
    time+=10;
}
//localStorage.clear();