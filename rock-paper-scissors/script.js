let uScore = 0;
let cScore = 0;
const uScore_span = document.getElementById('user-score');
const cScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
let result_div = document.querySelector('.result p');
const r_div = document.getElementById('rock');
const p_div = document.getElementById('paper');
const s_div = document.getElementById('scissors');
const smallUserWord = '(игрок)'.fontsize(4).sup();
const smallCompWord = '(комп)'.fontsize(4).sup();
const fiveRounds_button = document.getElementById('five');
const tenRounds_button = document.getElementById('ten');
const twentyRounds_button = document.getElementById('twenty');
const fiftyRounds_button = document.getElementById('fifty');
let rounds_div = document.getElementById('rounds');
let gameDuration = 0;
const gameResult_div = document.getElementById('end-game');
let clicks =0;
let roundsNumber_p = document.getElementById('rounds-number');
const winsSpan = document.getElementById('wins');
const drawsSpan = document.getElementById('draws');
const losesSpan = document.getElementById('loses');


if (sessionStorage.RPSwinsStraight === null || sessionStorage.RPSwinsStraight === NaN) {
    sessionStorage.setItem('RPSwinsStraight',0);
}
function setGameLocalItems() {
    if (localStorage.RPStimesPlayed == null) {
        localStorage.setItem('RPStimesPlayed', 0);
    } 
    if (localStorage.RPSdraws== null) {
        localStorage.setItem('RPSdraws', 0);
    } 
    if (localStorage.RPSwins == null) {
        localStorage.setItem('RPSwins', 0);
    } 
    if (localStorage.RPSloses== null) {
        localStorage.setItem('RPSloses', 0);
    } 
}
function updateGameLocalInners() {
    winsSpan.innerHTML = localStorage.RPSwins;
    drawsSpan.innerHTML = localStorage.RPSdraws;
    losesSpan.innerHTML = localStorage.RPSloses;
    timesPlayedSpan.innerHTML = localStorage.RPStimesPlayed;
    if (localStorage.RPStimesPlayed>1 && localStorage.RPStimesPlayed<5) {
        TimesWordEnding.innerHTML="а"
    } else  {
        TimesWordEnding.innerHTML=""
    }
}


    




function getComputerChoice(){
    const choices=['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random()*3);
    return choices[randomNumber];
}  

function wordToImage(choice) {
    if (choice=='rock'){
        return `<img src="images/rock.png" class="small-img">`;
    }
    if (choice=='paper'){
        return `<img src="images/paper.png" class="small-img">`;
    }
    if (choice=='scissors'){
        return `<img src="images/scissors.png" class="small-img">`;
    }
}

function win(user, comp){
    
    const uChoice_div = document.getElementById(user);
    uScore++;
    uScore_span.innerHTML = uScore;
    cScore_span.innerHTML = cScore;
    result_div.innerHTML = `${wordToImage(user)}${smallUserWord} побеждает ${wordToImage(comp)}${smallCompWord}. Вы победили!`;
    uChoice_div.classList.add('win');
    setTimeout(() => uChoice_div.classList.remove('win') , 500);
      
}


function lose(user, comp){
    
    const uChoice_div = document.getElementById(user);
    cScore++;
    uScore_span.innerHTML = uScore;
    cScore_span.innerHTML = cScore;
    result_div.innerHTML = `${wordToImage(user)}${smallUserWord} проигрывает ${wordToImage(comp)}${smallCompWord}. Вы проиграли...`;
    uChoice_div.classList.add('lose');
    setTimeout(() => uChoice_div.classList.remove('lose'), 500);

}
function draw(user, comp){
    
    const uChoice_div = document.getElementById(user);
    uScore_span.innerHTML = uScore;
    cScore_span.innerHTML = cScore;
    result_div.innerHTML = `${wordToImage(user)}${smallUserWord} равняеться ${wordToImage(comp)}${smallCompWord}. Ничья!`;
    uChoice_div.classList.add('draw');
    setTimeout(() => uChoice_div.classList.remove('draw'), 500);
}
function game(userChoice) {
   const computerChoice = getComputerChoice();
   /*
   document.querySelectorAll('.choice').forEach(item => item.style.background = 'none');
   document.getElementById(computerChoice).style.background = 'yellow';
   */
    switch (userChoice + computerChoice) {
        case 'paperrock': 
        case 'rockscissors': 
        case 'scissorspaper': 
        win(userChoice, computerChoice);
        break;
        case 'paperscissors': 
        case 'rockpaper': 
        case 'scissorsrock': 
        lose(userChoice, computerChoice);
        break;
        case 'paperpaper': 
        case 'rockrock': 
        case 'scissorsscissors': 
        draw(userChoice, computerChoice);
        break;
   }
   clicks++;
   roundsNumber_p.innerHTML ='Раунд '+clicks;
   if (clicks>=gameDuration) {
    
    if (uScore>cScore) {
        gameResult_div.innerHTML = `
        <h1>Вы победили!</h1>
        <img src="../images/confetti2.gif" class="confetti">
        <p>Счёт ${uScore}:${cScore}</p>
        <button onclick="location.reload()" class="restart">Заново</button>
        <div id="endgame-achivments"></div>
        
        `;
        setTimeout(()=>{
            document.querySelector('.confetti').style.opacity = '0';
            console.log('fade')
        }, 2300)
        //menuEl.style.display = 'none';
        const endgameAchivments = document.getElementById('endgame-achivments');
        sessionStorage.RPSwinsStraight++;
        console.log(sessionStorage.RPSwinsStraight);
        localStorage.tp++;
        endgameAchivments.innerHTML = endgameAchivments.innerHTML+ '<div><p>Вы добыли туалетную бумагу!</p><img src="../images/tp.png" height="80px"></div>';
        if (sessionStorage.RPSwinsStraight==2) {
            localStorage.msk++;
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+ '<div><p>Вы добыли маску!</p><img src="../images/msk.png" height="80px"></div>';
        } else if (sessionStorage.RPSwinsStraight==3) {
            localStorage.an++;
            endgameAchivments.innerHTML = endgameAchivments.innerHTML+'<div><p>Вы добыли антисептик!</p><img src="../images/an.png" height="80px"></div>';
        }
        
        localStorage.RPSwins++;          
    }
    if (uScore<cScore) {
        gameResult_div.innerHTML = `
    <h1>Вы проиграли!</h1>
    <p>Счёт ${uScore}:${cScore}</p>
    <button onclick="location.reload()" class="restart">Заново</button>
    <div id="endgame-achivments">${achivment}</div>
    `;
        
        localStorage.RPSloses++;
        sessionStorage.RPSwinsStraight=0; 
    }
    if (uScore===cScore) {
        gameResult_div.innerHTML = `
    <h1>Ничья!</h1>
    <p>Счёт ${uScore}:${cScore}</p>
    <button onclick="location.reload()" class="restart">Заново</button>
    <div id="endgame-achivments">${achivment}</div>
    `;
        localStorage.RPSdraws++; 
        sessionStorage.RPSwinsStraight=0;
    }
    localStorage.RPStimesPlayed++;
    setTimeout(() => {
        gameResult_div.style.display='flex';
        updateGameLocalInners()
    }, 800); 
    
   }
}

function main(duration) {
rounds_div.remove();
gameDuration=duration;

    r_div.addEventListener('click', () =>{ 
        if (clicks<gameDuration) {
            game('rock')
        }
    });
    p_div.addEventListener('click', () => { 
        if (clicks<gameDuration) {
            game('paper')
        }
    });
    s_div.addEventListener('click', () => { 
        if (clicks<gameDuration) {
            game('scissors')
        }
    });
}

    
function startGame() {
    rounds_div.style.display='flex';
    startBtn.remove();
    fiveRounds_button.addEventListener('click', () => main(5));
    tenRounds_button.addEventListener('click', () => main(10));
    twentyRounds_button.addEventListener('click', () => main(20));
    fiftyRounds_button.addEventListener('click', () => main(50));
}

function tpUseActions(){
    
    let exchangeItem = prompt('На что хотите обменять? Введите м если хотите обменять 3 рулона туалетной бумаги на 1 маску. Либо введите а, если хотите обменять 5 рулонов туалетной бумаги на 1 антисептик')
    console.log(exchangeItem);
    if (exchangeItem=='v'||exchangeItem=='V'||exchangeItem=='m'||exchangeItem=='M'||exchangeItem=='м'||exchangeItem=='М') {
        if (localStorage.tp>=4){
            localStorage.tp-=4;
            localStorage.msk++;
        } else {
            alert(`Недостаточно туалетной бумаги :(`)
        }
    } else if (exchangeItem=='a'||exchangeItem=='A'||exchangeItem=='f'||exchangeItem=='F'||exchangeItem=='а'||exchangeItem=='А') {
        if (localStorage.tp>=6){
            localStorage.tp-=6;
            localStorage.an++;
        }else {
            alert(`Недостаточно туалетной бумаги :(`)
        }
    }
}
function mskUseActions(){
    let exchangeItem = prompt('На что хотите обменять? Введите т если хотите обменять 1 маску на 4 рулона туалетной бумаги. Либо введите а, если хотите обменять 2 маски на 1 антисептик')
    console.log(exchangeItem);
    if (exchangeItem=='т'||exchangeItem=='Т'||exchangeItem=='t'||exchangeItem=='T'||exchangeItem=='n'||exchangeItem=='N') {
        if (localStorage.msk>=1){
            localStorage.msk--;
            localStorage.tp= +localStorage.tp + 3;
        } else {
            alert(`Недостаточно масок :(`)
        }
    } else if (exchangeItem=='a'||exchangeItem=='A'||exchangeItem=='f'||exchangeItem=='F'||exchangeItem=='а'||exchangeItem=='А') {
        if (localStorage.msk>=3){
            localStorage.msk-=3;
            localStorage.an++;
        }else {
            alert(`Недостаточно масок :(`)
        }
    }
    
}
function anUseActions(){
    let exchangeItem = prompt('На что хотите обменять? Введите т если хотите обменять 1 антисептик на 6 рулонов туалетной бумаги. Либо введите м, если хотите обменять 1 антисептик на 3 маски')
    console.log(exchangeItem);
    if (exchangeItem=='т'||exchangeItem=='Т'||exchangeItem=='t'||exchangeItem=='T'||exchangeItem=='n'||exchangeItem=='N') {
        if (localStorage.an>=1){
            localStorage.an--;
            localStorage.tp= +localStorage.tp + 5;
        } else {
            alert(`Недостаточно антисептиков :(`)
        }
    } else if (exchangeItem=='v'||exchangeItem=='V'||exchangeItem=='m'||exchangeItem=='M'||exchangeItem=='м'||exchangeItem=='М') {
        if (localStorage.an>=1){
            localStorage.an--;
            localStorage.msk= +localStorage.msk + 2;
        }else {
            alert(`Недостаточно антисептиков :(`)
        }
    }
    
}