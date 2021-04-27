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
    "Абхазия",
"Австралия",
'Австрия' ,
'Азербайджан' ,
'Албания' ,
'Алжир' ,
'Ангола' ,
'Андорра' ,
'Антигуа и Барбуда' ,
'Аргентина' ,
'Армения' ,
'Аруба' ,
'Афганистан' ,
'Багамы' ,
'Бангладеш' ,
'Барбадос' ,
'Бахрейн' ,
'Беларусь' ,
'Белиз' ,
'Бельгия' ,
'Бенин' ,
'Бермудские острова' ,
'Болгария' ,
'Боливия' ,
'Босния и Герцеговина' ,
'Ботсвана' ,
'Бразилия' ,
'Бруней-Даруссалам' ,
'Буркина Фасо' ,
'Бурунди' ,
'Бутан' ,
'Вануату' ,
'Ватикан' ,
'Великобритания',
'Венгрия' ,
'Венесуэла' ,
'Вьетнам' ,
'Габон' ,
'Гавайские острова' ,
'Гайана' ,
'Гаити' ,
'Гамбия' ,
'Гана' ,
'Гваделупа' ,
'Гватемала' ,
'Гвинея' ,
'Гвинея-Биссау' ,
'Германия' ,
'Гондурас' ,
'Гонконг',
'Гренада' ,
'Греция' ,
'Грузия' ,
'Дания' ,
'Джибути' ,
'Доминика'  ,
'Доминикана' ,
'Египет' ,
'Замбия' ,
'Зимбабве' ,
'Израиль' ,
'Индия' ,
'Индонезия' ,
'Иордания' ,
'Ирак'  ,
'Иран' ,
'Ирландия' ,
'Исландия' ,
'Испания' ,
'Италия' ,
'Йемен' ,
'Кабо-Верде' ,
'Казахстан' ,
'Каймановы острова' ,
'Камбоджа ',
'Камерун' ,
'Канада' ,
'Канарские острова'    ,
'Катар' , 
'Кения' ,
'Кипр' ,
'Киргизия' ,
'Кирибати' ,
'Китай' ,
'Колумбия' ,
'Коморы' ,
'Конго' ,
'Конго-Киншаса' ,
'Коста-Рика' ,
"Кот-д'Ивуар" ,
'Куба' ,
'Кувейт'  ,
'Лаос' ,
'Латвия' ,
'Лесото',
'Либерия' ,
'Ливан' ,
'Ливия' ,
'Литва' ,
'Лихтенштейн' ,
'Люксембург' ,
'Маврикий' ,
'Мавритания' ,
'Мадагаскар' ,
'Малави' ,
'Малайзия' ,
'Мали' ,
'Мальдивы ',
'Мальта' ,
'Марокко' ,
'Мартиника' ,
'Маршалловы острова' ,
'Мексика' ,
'Мозамбик' ,
'Молдова' ,
'Монако' ,
'Монголия' ,
'Мьянма' ,
'Намибия' ,
'Науру' ,
'Непал' ,
'Нигер' ,
'Нигерия' ,
'Нидерланды' ,
'Никарагуа' ,
'Новая Зеландия' ,
'Норвегия' ,
'ОАЭ' ,
'Оман' ,
'Остров Св. Елены' ,
'Пакистан' ,
'Палау' ,
'Панама' ,
'Папуа - Новая Гвинея' ,
'Парагвай' ,
'Перу' ,
'Польша' ,
'Португалия' ,
'Пуэрто-Рико' ,
'Реюньон' ,
'Россия' ,
'Руанда' ,
'Румыния' ,
'Сальвадор'  ,
'Самоа' ,
'Сан-Марино' ,
'Сан-Томе и Принсипи' ,
'Саудовская аравия' ,
'Свазиленд ',
'КНДР',
'Северная Македония' ,
'Сейшелы' ,
'Сенегал' ,
'Сен-Мартен ',
'Сент-Винсент и Гренадины' ,
'Сент-Китс и Невис' ,
'Сент-Люсия' ,
'Сербия' ,
'Сингапур' ,
'Сирия' ,
'Словакия' ,
'Словения' ,
'Соломоновы острова' ,
'Сомали' ,
'Судан' ,
'Суринам' ,
'США' ,
'Сьерра-Леоне' ,
'Таджикистан' ,
'Тайвань' ,
'Тайланд' ,
'Танзания' ,
'Того' ,
'Тонга' ,
'Тринидад и Тобаго' ,
'Тувалу' ,
'Тунис' ,
'Туркменистан' ,
'Турция'  ,
'Уганда' ,
'Узбекистан' ,
'Украина' ,
'Уоллис и Футуна' ,
'Уругвай' ,
'Фиджи' ,
'Филиппины' ,
'Финляндия' ,
'Франция' ,
'Хорватия' ,
'Центральноафриканская Республика' ,
'Чад' ,
'Черногория' ,
'Чехия' ,
'Чили' ,
'Швейцария' ,
'Швеция' ,
'Шри-Ланка' ,
'Эквадор' ,
'Экваториальная Гвинея' ,
'Эритрея' ,
'Эстония' ,
'Эфиопия' ,
'ЮАР' ,
'Южная Корея' ,
"Ямайка" ,
"Япония"
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
    let name = "Игрок";
    if (reason=="first") {
        name = prompt(`Добро пожаловать в CORONA GAMES! Вижу, Вы тут впервые? Введите Ваш никнейм, перед тем как начать играть. По умолчанию установлено имя "Игрок", но Вы можете поменять его в любое время на главной странице.`);
        if (name==null || name==" "|| name=="") {
            name="Игрок"
        }
        localStorage.setItem('playerName', name)
    } else {
        let prevName = localStorage.playerName;
        name = prompt(`Введите никнейм который хотите установить`);
        if (name===null || name==" "|| name=="") {
            name=prevName;
        }
        localStorage.playerName = name;
    }
    updateAllLocalInners();
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
    playerLevel.innerHTML = localStorage.playerLevel+' ур.';
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
    let answer = confirm('Вы уверенны что хотите аннулировать Ваш прогресс? Будет аннулирован ваши рекорды во всех играх, все ваши запасы и вакцина.')
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
            //console.log(localStorage.tp);
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
            //console.log(localStorage.msk);
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
               alert(`Недостаточно туалетной бумаги :(
Цена одного вложения - 5 рулонов туалетной бумаги`);
               exchangeBtn2.style.opacity = 0.3;
            }
            //console.log(localStorage.tp);
            break;
            case 'msk': 
            if (localStorage.msk>=3) {
                localStorage.msk-=3;
                riseVaccine(localStorage.playerLevel)
            } else {
               alert(`Недостаточно масок :(
Цена одного вложения - 3 маски`);
               exchangeBtn2.style.opacity = 0.3;
            }
            //console.log(localStorage.msk);
            break;
            case 'an': 
            if (localStorage.an>0) {
                localStorage.an--;
                riseVaccine(localStorage.playerLevel)
            } else {
               alert(`Недостаточно антисептиков :(
Цена одного вложения - 1 антисептик`);
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
