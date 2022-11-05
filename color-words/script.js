const words = [
    {
        word: 'червоний',
        color: 'red',
        id: 0,
    },
    {
        word: 'білий',
        color: 'white',
        id: 1,
    },
    {
        word: 'синій',
        color: 'blue',
        id: 2,
    },
    {
        word: 'жовтий',
        color: 'yellow',
        id: 3,
    },
    {
        word: 'помаранчевий',
        color: 'orangered',
        id: 4,
    },
    {
        word: 'зелений',
        color: 'green',
        id: 5,
    },
    {
        word: 'фіолетовий',
        color: 'purple',
        id: 6,
    },
    {
        word: 'чорний',
        color: 'black',
        id: 7,
    },
    {
        word: 'сірий',
        color: 'gray',
        id: 8,
    },
    {
        word: 'коричневий',
        color: 'saddlebrown',
        id: 9,
    },
    {
        word: 'блакитний',
        color: 'royalblue',
        id: 10,
    },
    {
        word: 'рожевий',
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
const bustUpSpanTime = document.getElementById('bust-up-span-time');
const bustUpSpanMistakes = document.getElementById('bust-up-span-mistakes');
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
        case 'timeout': gameoverTitle = 'Час вийшов! Кінець гри'
        break;
        case 'wrong': gameoverTitle = 'Неправильна відповідь! Кінець гри'
        break;
    }
    endgameEl.innerHTML = `
    <h1>${gameoverTitle}</h1>
    
    `;
    if (localStorage.CWbestScore<score) {
        localStorage.CWbestScore=score;
        endgameEl.innerHTML += `<h3 class="record">Новий рекорд!</h3><img src="../images/confetti2.gif" class="confetti">`
        setTimeout(()=>{
            document.querySelector('.confetti').style.opacity = '0';
            console.log('fade')
        }, 2300)
    } 
    endgameEl.innerHTML += `<p>Ваш рахунок ${score}</p>
    <button onclick="location.reload()" class="restart">Почати спочатку</button>
    <div id="endgame-achivments"></div>
    `;
    const endgameAchivments = document.getElementById('endgame-achivments');
    endgameEl.style.display = 'flex';
        if (score>=15) {
            localStorage.tp= +localStorage.tp + Math.floor(score/8);
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Ви добули туалетний папір у кількості ${Math.floor(score/8)} шт!</p><img src="../images/tp.png" height="80px"></div>`;
            
        }
        if (score>=20) {
            localStorage.msk= +localStorage.msk + Math.floor(score/12);
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Ви добули маски у кількості ${Math.floor(score/11)} шт!</p><img src="../images/msk.png" height="80px"></div>`;
        }
        if (score>=30) {
            localStorage.an= +localStorage.an + Math.floor(score/22);
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+'<div><p>Ви добули антисептик!</p><img src="../images/an.png" height="80px"></div>';
        } 
        
    //location.reload();
    console.log('score',score);

    
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
let bustVal = '<img src="../images/bust-up.png" class="bust-up-icon">';
document.querySelectorAll('.answer').forEach(item => {
    item.addEventListener('click',e =>{
        if (item.style.backgroundColor === randomWordObj.color) {
            newRound();
            updateScore()
        } else if (mistakeRoot>0) {
            mistakeRoot--;
            bustUpSpanMistakes.innerHTML =bustVal+ ` право на помилку (${mistakeRoot})`;
        } else {
            gameOver('wrong');
        } 
})  
})
function updateBustUpInners(bust){
    if (bust=='tp') {
        return ` +${time-30}s`
    } 
    if (bust=='msk') {
        return` право на помилку (${mistakeRoot})`
    } 
   /* if (bust=='mistakeRoot') {
        return ` (${mistakeRoot})`
    }
    */
}

function tpUseActions(){
    localStorage.tp--;
    time+=3;
    
    bustUpSpanTime.innerHTML = bustVal + updateBustUpInners('tp');
}
function mskUseActions(){
    localStorage.msk--;
    mistakeRoot++;
    
    bustUpSpanMistakes.innerHTML = bustVal + updateBustUpInners('msk');
}
function anUseActions(){
    localStorage.an--;
    mistakeRoot++;
    time+=10;
    bustUpSpanTime.innerHTML = bustVal +updateBustUpInners('tp');
    bustUpSpanMistakes.innerHTML = bustVal +updateBustUpInners('msk');
}

//localStorage.clear();
