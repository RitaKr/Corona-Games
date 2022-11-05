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
const playerLevel = document.getElementById('level');
const playerName = document.getElementById('name');


let countries = [
    "Австралія",
    'Австрія',
    'Азербайджан',
    'Албанія',
    'Алжир',
    'Ангола',
    'Андорра',
    'Антигуа і Барбуда',
    'Аргентина',
    'Вірменія' ,
    'Аруба',
    'Афганістан',
    'Багами' ,
    'Бангладеш',
    'Барбадос',
    'Бахрейн',
    'Білорусь',
    'Беліз',
    'Бельгія',
    'Бенін',
    'Бермудські острови' ,
    'Болгарія',
    'Болівія',
    'Боснія і Герцеговина' ,
    'Ботсвана',
    'Бразилія',
    'Бруней-Даруссалам',
    'Буркіна Фасо',
    'Бурунді',
    'Бутан',
    'Вануату',
    'Ватикан',
    'Великобританія',
    'Угорщина' ,
    'Венесуела',
    "В'єтнам",
    'Габон',
    'Гавайські острови' ,
    'Гайана',
    'Гаїті',
    'Гамбія',
    'Гана',
    'Гваделупа',
    'Гватемала',
    'Гвінея',
    'Гвінея-Біссау',
    'Німеччина' ,
    'Гондурас',
    'Гонконг',
    'Гренада',
    'Греція',
    'Грузія',
    'Данія' ,
    'Джибуті',
    'Домініка',
    'Домінікана',
    'Єгипет',
    'Замбія',
    'Зімбабве',
    'Ізраїль',
    'Індія',
    'Індонезія',
    'Йорданія',
    'Ірак',
    'Іран',
    'Ірландія',
    'Ісландія',
    'Іспанія',
    'Італія',
    'Ємен',
    'Кабо-Верде' ,
    'Казахстан',
    'Кайманові острови',
    'Камбоджа',
    'Камерун',
    'Канада',
    'Канарські острови'    ,
    'Катар',
    'Кенія',
    'Кіпр',
    'Киргизія',
    'Кірибаті',
    'Китай' ,
    'Колумбія',
    'Комори' ,
    'Конго',
    'Конго-Кіншаса',
    'Коста-Ріка',
    "Кот-д'Івуар",
    'Куба',
    'Кувейт',
    'Лаос',
    'Латвія',
    'Лесото',
    'Ліберія',
    'Ліван',
    'Лівія',
    'Литва' ,
    'Ліхтенштейн',
    'Люксембург',
    'Маврикій',
    'Мавританія',
    'Мадагаскар',
    'Малаві',
    'Малайзія',
    'Малі',
    'Мальдіви',
    'Мальта',
    'Марокко',
    'Мартініка',
    'Маршаллові острови',
    'Мексика',
    'Мозамбік',
    'Молдова',
    'Монако',
    'Монголія',
    "М'янма",
    'Намібія',
    'Науру',
    'Непал',
    'Нігер',
    'Нігерія',
    'Нідерланди',
    'Нікарагуа',
    'Нова Зеландія' ,
    'Норвегія',
    'ОАЕ',
    'Оман',
    'Острів Св. Олени',
    'Пакистан' ,
    'Палау',
    'Панама',
    'Папуа Нова Гвінея' ,
    'Парагвай' ,
    'Перу',
    'Польща',
    'Португалія',
    'Пуерто-Ріко' ,
    'Реюньйон',
    'Росія' ,
    'Руанда',
    'Румунія',
    'Сальвадор',
    'Самоа',
    'Сан-Марино',
    'Сан-Томе і Прінсіпі',
    'Саудівська Аравія' ,
    'Свазіленд',
    'КНДР',
    'Північна Македонія',
    'Сейшелі',
    'Сенегал',
    'Сен-Мартен',
    'Сент-Вінсент і Гренадини' ,
    'Сент-Кітс і Невіс',
    'Сент-Люсія',
    'Сербія',
    'Сінгапур',
    'Сирія',
    'Словаччина',
    'Словіння',
    'Соломонові острови',
    'Сомалі',
    'Судан',
    'Суринам',
    'США' ,
    'Сьєрра-Леоне' ,
    'Таджикистан',
    'Тайвань',
    'Тайланд',
    'Танзанія',
    'Того',
    'Тонга',
    'Трінідад і Тобаго' ,
    'Тувалу',
    'Туніс',
    'Туркменістан',
    'Туреччина'  ,
    'Уганда',
    'Узбекистан',
    'Україна' ,
    'Уолліс і Футуна',
    'Уругвай',
    'Фіджі',
    'Філіппіни' ,
    'Фінляндія',
    'Франція',
    'Хорватія',
    'Центральноафриканська Республіка' ,
    'Чад',
    'Чорногорія',
    'Чехія',
    'Чилі',
    'Швейцарія',
    'Швеція',
    'Шрі Ланка' ,
    'Еквадор',
    'Екваторіальна Гвінея' ,
    'Ерітрея',
    'Естонія',
    'Ефіопія',
    'ПАР',
    'Південна Корея',
    "Ямайка",
    "Японія"
]
let completeCountries = []; 

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
//NullProgress()
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
if (localStorage.playerLevel == null) {
    localStorage.setItem('playerLevel',1);
}
if (localStorage.playerName == null || localStorage.playerName == undefined) {
    setName('first');
}
if (localStorage.countries == null) {
    localStorage.setItem('countries', '[]');    
}
if (localStorage.curCountry == null) {
    localStorage.setItem('curCountry', decideRandomCounty(countries));  
}
if (localStorage.allCountries == null) {
    localStorage.setItem('allCountries', JSON.stringify(countries));    
}

function setName(reason) {
    let name = "Гравець";
    if (reason=="first") {
        name = prompt(`Вітаємо в CORONA GAMES! Бачу, Ви тут вперше? Оберіть Ваш нікнейм перед тим як почати грати. За замовчуванням встановлено нікнейм "Гравець", але Ви можете змінити його у будь-який час на головній сторінці.`);
        if (name===null || name==" "|| name=="") {
            name="Гравець"
        }
        localStorage.setItem('playerName', name)
    } else {
        let prevName = localStorage.playerName;
        name = prompt(`Введіть нікнейм, який хочете встановити`);
        if (name===null || name==" "|| name=="") {
            name=prevName;
        }
        localStorage.playerName = name;
    }
    updateStatTableInners()
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
    playerLevel.innerHTML = localStorage.playerLevel+' рів.';
    playerName.innerHTML = localStorage.playerName;
    vaccineValSpan.innerHTML= localStorage.vaccine;
    vaccineLine.style.width = `${localStorage.vaccine}%`;
    countrySpan.innerHTML = localStorage.curCountry;
    checkLevel()
    
}

function random(arr){
    let n = Math.floor(Math.random()*(arr.length));
    return arr[n]
}
function normalise(n) {
    if (n<10) return '0'+n;
    else return n
}
function calcDate(){
    let date = new Date();
    let dateString = `${normalise(date.getDate())}.${normalise(date.getMonth()+1)}.${normalise(date.getFullYear())} ${normalise(date.getHours())}:${date.getMinutes()}`
    console.log(dateString)
    return dateString
}
//let date = new Date();

function decideRandomCounty(arr) {
    let randomCountry = random(arr); 
    arr.splice(arr.indexOf(randomCountry), 1);
    return randomCountry
}    
function updateCountry(){
    completeCountries = JSON.parse(localStorage.countries);
    let aviableCountries = JSON.parse(localStorage.allCountries);
    //completeCountries = JSON.parse(localStorage.countries);
    //console.log(completeCountries, localStorage.countries);
    let obj = {};
    obj.country = localStorage.curCountry;
    obj.date = calcDate();
    completeCountries.push(obj);
    //localStorage.countries = completeCountries
    localStorage.countries = JSON.stringify(completeCountries)
    localStorage.curCountry = decideRandomCounty(aviableCountries);
    localStorage.allCountries =  JSON.stringify(aviableCountries)
    
    
}
function NullProgress() {
    let answer = confirm('Ви впевнені, що хочете анулювати Ваш прогрес? Буде анульовано ваші рекорди у всіх грах, всі ваші запаси та вакцина.')
    if (answer) {
        localStorage.setItem('countries', '[]');
        localStorage.setItem('curCountry', decideRandomCounty(countries));
        localStorage.setItem('allCountries', JSON.stringify(countries));
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
        localStorage.setItem('playerLevel', 1)
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
            exchangeSpace.innerHTML = 'Оберіть предмет';
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
               alert('Нема туалетного паперу :(');
               exchangeBtn.style.opacity = 0.3;
            }
            //console.log(localStorage.tp);
            break;
            case 'msk': 
            if (localStorage.msk>0) {
            /*    bustVal = mskUseActions()
                bustUpSpan.innerHTML = bustVal+updateBustUpInners('mistakeRoot');
                */
                mskUseActions();
            } else {
               alert('Нема масок :(');
               exchangeBtn.style.opacity = 0.3;
            }
            //console.log(localStorage.msk);
            break;
            case 'an': 
            if (localStorage.an>0) {
            /*    bustVal = anUseActions();
                bustUpSpan.innerHTML = bustVal+updateBustUpInners('mistakeRoot'); */
                anUseActions()
            } else {
               alert('Нема антисептиків :(');
               exchangeBtn.style.opacity = 0.3;
            }
            //console.log(localStorage.an);
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
                riseVaccine(localStorage.playerLevel)
            } else {
               alert(`Недостатньо туалетного паперу :(
Ціна однієї інвестиції - 5 рулонів туалетного паперу`);
               exchangeBtn2.style.opacity = 0.3;
            }
            //console.log(localStorage.tp);
            break;
            case 'msk': 
            if (localStorage.msk>=3) {
                localStorage.msk-=3;
                riseVaccine(localStorage.playerLevel)
            } else {
               alert(`Недостатньо масок :(
Ціна однієї інвестиції - 3 маски`);
               exchangeBtn2.style.opacity = 0.3;
            }
            //console.log(localStorage.msk);
            break;
            case 'an': 
            if (localStorage.an>0) {
                localStorage.an--;
                riseVaccine(localStorage.playerLevel)
            } else {
               alert(`Недостатньо антисептиків :(
Ціна однієї інвестиції - 1 антисептик`);
               exchangeBtn2.style.opacity = 0.3;
            }
            //console.log(localStorage.an);
            break;
        }
        updateAllLocalInners();
        
    })

    function riseVaccine(level){
        let vaccineSpeed = 1/(+level);
        console.log('vaccineSpeed', vaccineSpeed, 'localStorage.vaccine', localStorage.vaccine);
        let vaccine = +localStorage.vaccine;
        vaccine+=vaccineSpeed;
        localStorage.vaccine= Math.round((vaccine)*100)/100;
        checkLevel()
        
    }
    function checkLevel(){
        if (localStorage.vaccine>=100) {
                localStorage.vaccine = 0;
                +localStorage.playerLevel++;
                updateCountry()
        }
    }
