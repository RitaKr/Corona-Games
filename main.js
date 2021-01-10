const startBtn = document.getElementById('start');
const tp = document.getElementById('tp');
const msk = document.getElementById('msk');
const an = document.getElementById('an');
const tpSpan = document.getElementById('tp-value');
const mskSpan = document.getElementById('msk-value');
const anSpan = document.getElementById('an-value');
const exchangeSpace = document.getElementById('excange-item');
const exchangeBtn = document.getElementById('excange');
const exchangeBtn2 = document.getElementById('excange2');
const excangeSpaceSpan = document.getElementById('excange-item-val');
const vaccineValSpan = document.getElementById('vaccine-value');
const vaccineLine = document.getElementById('vaccine-line');
const timesPlayedSpan = document.getElementById('times-played');
const TimesWordEnding = document.getElementById('times-ending');
const menuEl = document.getElementById('menu');
const rulesBtn = document.querySelector('.rules-span');
const rulesDiv = document.querySelector('.rules');
const arrow = document.querySelector('.arrow');


let isOpen = false;
rulesBtn.addEventListener('click',()=>{

    if (isOpen){
        rulesDiv.style = `transform: scaleY(0);
        height: calc(100vh - ${menuEl.clientHeight}px)`;
        arrow.style = `transform: rotateX(0deg)`
        isOpen=false;
    } else {
        rulesDiv.style = `transform: scaleY(1);
        height: calc(100vh - ${menuEl.clientHeight}px)`;
        arrow.style = `transform: rotateX(180deg)`
        isOpen=true;
    }
})

if (localStorage.tp == null) {
    localStorage.setItem('tp', 0);
} 
if (localStorage.msk == null) {
    localStorage.setItem('msk', 0);
} 
if (localStorage.an == null) {
    localStorage.setItem('an', 0);
} 
if (localStorage.vaccine == null) {
    localStorage.setItem('vaccine', 0);
} 
if (sessionStorage.RPSwinsStraight == null) {
    sessionStorage.setItem('RPSwinsStraight',0);
}

setGameLocalItems()
let achivment ='';
let chosen;
let chosenImg;
updateAllLocalInners();

function updateAllLocalInners() {
    updateGameLocalInners();
    tpSpan.innerHTML= localStorage.tp;
    mskSpan.innerHTML= localStorage.msk;
    anSpan.innerHTML= localStorage.an;
    vaccineValSpan.innerHTML= localStorage.vaccine;
    vaccineLine.style.width = `${localStorage.vaccine}%`;
    
}

function NullProgress() {
    let answer = confirm('Вы уверенны что хотите аннулировать ваш прогресс? Будет аннулирован ваши рекорды во всех играх, все ваши запасы и вакцина.')
    if (answer) {
    localStorage.setItem('vaccine', 0);
    localStorage.setItem('tp', 0);
    localStorage.setItem('msk', 0);
    localStorage.setItem('an', 0);
    localStorage.setItem('CWbestScore', 0);
    localStorage.setItem('CWtimesPlayed', 0);
    localStorage.setItem('RPSwins', 0);
    localStorage.setItem('RPSdraws', 0);
    localStorage.setItem('RPSloses', 0);
    localStorage.setItem('RPStimesPlayed', 0);
    sessionStorage.setItem('RPSwinsStraight', 0);
    localStorage.setItem('BObestScore', 0);
    localStorage.setItem('BOtimesPlayed', 0);
    localStorage.setItem('BObestLevel', 1);
    updateAllLocalInners()
    
    }
}
document.querySelectorAll('.achivment-img').forEach(img =>{
    img.addEventListener('click',(e) =>{
        exchangeSpace.innerHTML =`<img src="../images/${e.target.id}.png" height="80px" class="chosen-img">`;
        exchangeSpace.style= 'padding: 0';
        chosen=`${e.target.id}`;
        console.log(document.querySelector('.chosen-img'));
        document.querySelector('.chosen-img').addEventListener('click',(event)=>{
            event.target.style.opacity = 0;
            exchangeSpace.style= 'padding: 22px 0';
            exchangeSpace.innerHTML = 'Выберите предмет';
            exchangeBtn.style.opacity = 0.3;
            exchangeBtn2.style.opacity = 0.3;
            chosen='';
        });
    })
})
tp.addEventListener('click',() =>{

    console.log('tp before exchange',localStorage.tp);
        if (localStorage.tp>0) {
            exchangeBtn.style.opacity = 1;
            
        }else {
            exchangeBtn.style.opacity = 0.3;
        }
        if (localStorage.tp>=5) {
            exchangeBtn2.style.opacity = 1;
            
        }else {
            exchangeBtn2.style.opacity = 0.3;
        }

})
msk.addEventListener('click',() =>{

    console.log('msk before exchange',localStorage.msk);
        if (localStorage.msk>0) {
            exchangeBtn.style.opacity = 1;
            
        }else {
            exchangeBtn.style.opacity = 0.3;
        }
        if (localStorage.msk>=3) {
            exchangeBtn2.style.opacity = 1;
            
        }else {
            exchangeBtn2.style.opacity = 0.3;
        }

})
an.addEventListener('click',() =>{
    console.log('an before exchange',localStorage.an);
        if (localStorage.an>0) {
            exchangeBtn.style.opacity = 1;
            
        }else {
            exchangeBtn.style.opacity = 0.3;
        }
        if (localStorage.an>0) {
            exchangeBtn2.style.opacity = 1;
            
        }else {
            exchangeBtn2.style.opacity = 0.3;
        }
   
})


    
    exchangeBtn.addEventListener('click', () =>{
        console.log('chosen',chosen);
        switch (chosen) {
            case 'tp': 
            if (localStorage.tp>0) {
            /*    bustVal = tpUseActions()
                bustUpSpan.innerHTML = bustVal; */
                tpUseActions()
            } else {
               alert('Нет туалетной бумаги :(');
               exchangeBtn.style.opacity = 0.3;
            }
            console.log(localStorage.tp);
            break;
            case 'msk': 
            if (localStorage.msk>0) {
            /*    bustVal = mskUseActions()
                bustUpSpan.innerHTML = bustVal+updateBustUpInners('mistakeRoot');
                */
                mskUseActions();
            } else {
               alert('Нет масок :(');
               exchangeBtn.style.opacity = 0.3;
            }
            console.log(localStorage.msk);
            break;
            case 'an': 
            if (localStorage.an>0) {
            /*    bustVal = anUseActions();
                bustUpSpan.innerHTML = bustVal+updateBustUpInners('mistakeRoot'); */
                anUseActions()
            } else {
               alert('Нет антисептиков :(');
               exchangeBtn.style.opacity = 0.3;
            }
            console.log(localStorage.an);
            break;
        }
        updateAllLocalInners();
        
        
    })

    exchangeBtn2.addEventListener('click', () =>{
        console.log('chosen',chosen);
        switch (chosen) {
            case 'tp': 
            if (localStorage.tp>=5) {
                localStorage.tp-=5;
                localStorage.vaccine++;
            } else {
               alert(`Недостаточно туалетной бумаги :(
Цена одного вложения - 5 рулонов туалетной бумаги`);
               exchangeBtn2.style.opacity = 0.3;
            }
            console.log(localStorage.tp);
            break;
            case 'msk': 
            if (localStorage.msk>=3) {
                localStorage.msk-=3;
                localStorage.vaccine++;
            } else {
               alert(`Недостаточно масок :(
Цена одного вложения - 3 маски`);
               exchangeBtn2.style.opacity = 0.3;
            }
            console.log(localStorage.msk);
            break;
            case 'an': 
            if (localStorage.an>0) {
                localStorage.an--;
                localStorage.vaccine++;
            } else {
               alert(`Недостаточно антисептиков :(
Цена одного вложения - 1 антисептик`);
               exchangeBtn2.style.opacity = 0.3;
            }
            console.log(localStorage.an);
            break;
        }
        updateAllLocalInners();
        
    })
