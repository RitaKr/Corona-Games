
const mistakesEl = document.getElementById('mistakes');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const endgameEl = document.getElementById('end-game');
const bustUpSpanHints = document.getElementById('bust-up-span-hints');
const bustUpSpanMistakes = document.getElementById('bust-up-span-mistakes');
//localStorage.clear();


let mistakes = 0;
let time = 0;
let gameoverTitle;
let timeInterval;
let mistakeRoot = 0;
let hints = 3;


function setGameLocalItems() {
    if (localStorage.StimesPlayed == null) {
        localStorage.setItem('StimesPlayed', 0);
    } 
    if (localStorage.SbestTime== null) {
        localStorage.setItem('SbestTime', 0);
    } 
}

function startGame(reason) {
    timeInterval = setInterval(updateTime, 1000);
    newRound();
    switch (reason) {
        case 'restart': 
        mistakes = 3;
        time = 0;
        endgameEl.remove();
        updateScore()
        break;
        case 'start': 
        startBtn.remove();
        break;
    }
    
}
function updateTime (){
    time++;
    timeEl.innerHTML = time + " с";
    /*if (time===0) {
        gameOver('timeout');
    }*/
}

function gameOver(reason){
    clearInterval(timeInterval);
    switch (reason) {
        case 'complete': gameoverTitle = 'Поздравляю,Ви прошли судоку!'
        break;
        case 'wrong': gameoverTitle = 'Допустимое количесто ошибок исчерпано! Попробуйте ещё раз.'
        break;
    }
    endgameEl.innerHTML = `
    <h1>${gameoverTitle}</h1>
    
    `;
    if (localStorage.SbestTime>time && reason=='complete') {
        localStorage.SbestTime=time;
        endgameEl.innerHTML += `<h3 class="record">Новий рекорд!</h3><img src="../images/confetti2.gif" class="confetti">`
        setTimeout(()=>{
            document.querySelector('.confetti').style.opacity = '0';
            console.log('fade')
        }, 2300)
    } 
    endgameEl.innerHTML += `<p>Время гри: ${time}</p>
    <button onclick="location.reload()" class="restart">Почати спочатку</button>
    <div id="endgame-achivments"></div>
    `;
    const endgameAchivments = document.getElementById('endgame-achivments');
    endgameEl.style.display = 'flex';
        /*
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
        } */
        
    //location.reload();
    console.log('time',time);

    
    console.log('best time',localStorage.SbestTime);
    localStorage.StimesPlayed++;
    updateGameLocalInners()
}




function updateGameLocalInners() {
    bestEl.innerHTML = localStorage.SbestTime;
    timesPlayedSpan.innerHTML = localStorage.StimesPlayed;
    if (localStorage.StimesPlayed>1 && localStorage.StimesPlayed<5) {
        TimesWordEnding.innerHTML="а"
    } else  {
        TimesWordEnding.innerHTML=""
    }
}


function updateBustUpInners(bust){
    if (bust=='tp') {
        return ` +${hints - 3} подсказка`
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
    hints++;
    
    bustUpSpanTime.innerHTML = bustVal + updateBustUpInners('tp');
}
function mskUseActions(){
    localStorage.msk--;
    mistakeRoot++;
    
    bustUpSpanMistakes.innerHTML = bustVal + updateBustUpInners('msk');
}/*
function anUseActions(){
    localStorage.an--;
    mistakeRoot++;
    time+=10;
    bustUpSpanTime.innerHTML = bustVal +updateBustUpInners('tp');
    bustUpSpanMistakes.innerHTML = bustVal +updateBustUpInners('msk');
}
*/
//localStorage.clear();




//GAME LOGIC CODE----------------------------------------------------
let mainObjArr = [];
function createObjArr(){
    for (let i=0; i<9; i++){
        let bigSq = {};
        bigSq.isFull = false;
        bigSq.row = Math.floor(i/3)+1;
        bigSq.col = (i % 3)+1;
        bigSq.id = `sqR${bigSq.row}C${bigSq.col}`;
        bigSq.squares = [];
        mainObjArr[i]=bigSq;

        for (let j=0; j<9; j++) {
            let smallSq = {};
            smallSq.isGuessed=false;
            smallSq.row = Math.floor(j/3)+1+(bigSq.row-1)*3;
            smallSq.col = (j % 3)+1+(bigSq.col-1)*3;
            smallSq.id = `r${smallSq.row}c${smallSq.col}`
            smallSq.val = 0;
            mainObjArr[i].squares[j] = smallSq;

        }
    }
    console.log(mainObjArr);
}

createObjArr()

function randomN() {
    let n = Math.floor(Math.random()*9)+1;
    return n
}

function compareSq(n, thisSq, parentSq) {
    let isOk = true;
    parentSq.forEach(item=> {
        if (n == item.val) isOk=false;

    })
    if (isOk) {
        return n
    } 
    else {
         return compareSq(randomN(), thisSq, parentSq)
    }
    
}
function compareRows(n, r) {
    let isOk = true;
    for (let i=0; i<3; i++) {
        let bigSqI = i + Math.floor((r-1)/3)*3;
        for (let j=0; j<3; j++) {
            let smallSqI = j + ((r-1)%3)*3 ; 
            let sq = mainObjArr[bigSqI].squares[smallSqI];
            //console.log(bigSqI, smallSqI, sq.id)
            if (n == sq.val) {
                isOk=false;
            }
        } 
    }
    if (isOk) {
        return n
    } 
    else {
         return compareRows(randomN(), r)
    }
}
function compareCols(n, c) {
    let isOk = true;
    for (let i=0; i<3; i++) {
        let bigSqI = i*3 + Math.floor((c-1)/3);
        for (let j=0; j<3; j++) {
            let smallSqI = j*3 + ((c-1)%3); 
            let sq = mainObjArr[bigSqI].squares[smallSqI];
            //console.log(bigSqI, smallSqI, sq.id)

            if (n == sq.val) {
                isOk=false;
            }
        } 
    }
    
    if (isOk) {
        return n
    } 
    else {
         return compareCols(randomN(), c)
    }
}
//compareRows(3, 1)
//compareCols(3, 1)

function compare(n, parentSq, r, c) {
    //squares comparation
    let isOk = true;
    parentSq.forEach(item=> {
        if (n == item.val) {
            //isOk=false;
            return compare(randomN(), parentSq, r, c)
        }
    })
//rows comparation
    for (let ri=0; ri<3; ri++) {
        let bigSqIr = ri + Math.floor((r-1)/3)*3;
        for (let rj=0; rj<3; rj++) {
            let smallSqIr = rj + ((r-1)%3)*3 ; 
            let sqr = mainObjArr[bigSqIr].squares[smallSqIr];
            //console.log(bigSqI, smallSqI, sq.id)
            if (n == sqr.val) {
                //isOk=false;
                return compare(randomN(), parentSq, r, c)
            }
        } 
    }
//columns comparation
    for (let ci=0; ci<3; ci++) {
        let bigSqIc = ci*3 + Math.floor((c-1)/3);
        for (let cj=0; cj<3; cj++) {
            let smallSqIc = cj*3 + ((c-1)%3); 
            let sqc = mainObjArr[bigSqIc].squares[smallSqIc];
            //console.log(bigSqI, smallSqI, sq.id)

            if (n == sqc.val) {
                //isOk=false;
                return compare(randomN(), parentSq, r, c)
            }
        } 
    }
    //return isOk;
    if (isOk) return n;
    /*
    if (isOk) {
        return n
    } 
    else {
         return compare(randomN(), parentSq, r, c)
    }*/
}

function generateNumbers() {
    
    mainObjArr.forEach((big, i)=> {
        big.squares.forEach((small, j)=> {
            let n = randomN();
            let fits = false;
            console.log(n)
            //while (compareNumbers(n, small, big.squares)==false) {
                
                /*n = compareSq(n, small, big.squares)
                n = compareRows(n, small.row)
                n = compareCols(n, small.col)*/
                n = compare(n, big.squares, small.row, small.col)
            //}
            /*while (fits==false) {
               // n = randomN();
                
                fits = compare(randomN(), big.squares, small.row, small.col);

            }*/
            small.val = n;
            console.log(small.id, '; new n ', n)
        })
    })
}

function appendNumbers() {
    generateNumbers();
    mainObjArr.forEach((big, i)=> {
        big.squares.forEach((small, j)=> {
            let td = document.querySelector(`#${small.id}`);
            td.innerHTML = small.val;
            
        })
    })
}
window.onload = appendNumbers;

//------------------------------------------------------------------