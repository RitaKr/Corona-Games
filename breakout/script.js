
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const bestLevEl = document.getElementById('best-level');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const endgameEl = document.getElementById('end-game');
let gameoverTitle;
let mistakeRoot = 0;
let color1 = 'rgb(255, 113, 78)';
let color2 = 'rgb(185, 33, 99)';
let isGameOver;
let colorsArr = [];
let themeObj = {}
function setTheme(theme) {
  if (theme=='light') {
    themeObj.bg = 'rgba(255, 255, 255, .5)';
    themeObj.min = 15;
    themeObj.max = 120;
  } 
  if (theme=='dark') {
    themeObj.bg = 'rgba(0, 0, 0, .6)';
    themeObj.min = 90;
    themeObj.max = 150;
  }
}
setTheme('light');
//generateColors();
function generateColors() {
  for (var i=0; i<2; i++){
    let r = Math.floor(Math.random()*(themeObj.max+1))+themeObj.min;
    let g = Math.floor(Math.random()*(themeObj.max+1))+themeObj.min;
    let b = Math.floor(Math.random()*(themeObj.max+1))+themeObj.min;
    let color = 'rgb('+r+','+g+','+b+')';
    colorsArr[i] = color;
    
  }
  canvas.style.background = themeObj.bg;
  console.log(themeObj, colorsArr);
}


function setGameLocalItems() {
  if (localStorage.BOtimesPlayed == null) {
      localStorage.setItem('BOtimesPlayed', 0);
  } 
  if (localStorage.BObestScore== null) {
      localStorage.setItem('BObestScore', 0);
  } 
  if (localStorage.BObestLevel== null) {
    localStorage.setItem('BObestLevel', 1);
} 
}

function updateGameLocalInners() {
  bestEl.innerHTML = localStorage.BObestScore;
  bestLevEl.innerHTML = localStorage.BObestLevel;
  timesPlayedSpan.innerHTML = localStorage.BOtimesPlayed;
  if (localStorage.BOtimesPlayed>1 && localStorage.BOtimesPlayed<5) {
      TimesWordEnding.innerHTML="а"
  } else  {
      TimesWordEnding.innerHTML=""
  }
}


function keyDown(e) {
  if (e.key == "ArrowRight" || e.key == "Right") {
    brick.dx = brick.speed;
  } else if (e.key == "ArrowLeft" || e.key == "Left") {
    brick.dx = -brick.speed;
  }
}
function keyUp(e) {
  if (
    e.key == "ArrowRight" ||
    e.key == "Right" ||
    e.key == "ArrowLeft" ||
    e.key == "Left"
  ) {
    brick.dx = 0;
  }
}
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
/*
ctx.fillRect(100, 100, 200, 100); //x, y, width, height (px)
ctx.fillStyle = "blue";
*/
let score = 0;
let level = 1;
let brickRowCount = 9;
let brickColumnCount = 5;

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true,
};
const brick = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 30,
  w: 80,
  h: 15,
  speed: 8,
  dx: 0,
};
const brickInfo = {
  w: 60,
  h: 14,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

console.log(bricks);
draw();



function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      //console.log(brick);
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? colorsArr[0] : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = colorsArr[0];
  ctx.fill();
  ctx.closePath();
}
function drawBrick() {
  ctx.beginPath();
  ctx.rect(brick.x, brick.y, brick.w, brick.h);
  ctx.fillStyle = colorsArr[1];
  ctx.fill();
  ctx.closePath();
}
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score ${score}`, canvas.width - 100, 30);
}
function drawLevel() {
  ctx.font = "20px Arial";
  ctx.fillText(`Level ${level}`, 30, 30);
}
function moveBrick() {
  brick.x += brick.dx;
  if (brick.x + brick.w > canvas.width) {
    //console.log(brick, canvas.width);
    brick.x = canvas.width - brick.w;
    //console.log(brick);
  }
  if (brick.x < 0) {
    brick.x = 0;
  }
}
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (
    ball.y + ball.size > canvas.height ||
    ball.y - ball.size < 0 /*|| ball.y + ball.size > brick.y */
  ) {
    ball.dy *= -1;
  }
  if (
    ball.x - ball.size > brick.x /*- ball.size*/ &&
    ball.x + ball.size < brick.x + brick.w /*+ ball.size*/ &&
    ball.y + ball.size > brick.y
  ) {
    ball.dy = -ball.speed;
  }

  bricks.forEach((column) => {
    column.forEach((brick) => {
      //console.log(brick);
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x &&
          ball.x + ball.size < brick.x + brick.w &&
          ball.y + ball.size > brick.y &&
          ball.y - ball.size < brick.y + brick.h
        ) {
          brick.visible = false;
          ball.dy *= -1;
          increaseScore();
        }
      }
    });
  });
  if (ball.y + ball.size > canvas.height) {
    if (mistakeRoot>0) {
      mistakeRoot--;
      bustUpSpanMistakes.innerHTML =bustVal+ ` право на ошибку (${mistakeRoot})`;
    } else{
      gameOver();
      
    }
  }
}

function increaseScore() {
  score++;
  scoreEl.innerHTML = score;
  if (score % (brickRowCount * brickColumnCount) === 0) {
    levelUp()
  }
/*
  console.log('score',score);
  console.log('best score',localStorage.BObestScore);
  */
    
}
function levelUp() {
  generateColors();
  showAllBricks();
  ball.speed += 2;
    level++;
    console.log(ball)
}
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBrick();
  drawScore();
  drawLevel();
  drawBricks();
}
function update() {
  moveBrick();
  draw();
  requestAnimationFrame(update);
}
function updateBall() {
  moveBrick();
  if (isGameOver==false) moveBall();
  draw();
  requestAnimationFrame(updateBall);
}
function gameStart() {
  isGameOver = false;
  generateColors();
  update()
  setTimeout(()=>{
    updateBall()
  }, 1000)
  
}
function shutGame(){
  isGameOver = true;
  draw();
  requestAnimationFrame(draw);

 // ball.dx = 0; ball.dy = 0;

  requestAnimationFrame(shutGame);
}

function gameOver(){
  shutGame();
  endgameEl.innerHTML = `
  <h1>Промах! Игра окончена!</h1>
  
  `;
  if (localStorage.BObestScore<score) {
      localStorage.BObestScore=score;
      endgameEl.innerHTML += `<h3 class="record">Новый рекорд!</h3><img src="../images/confetti2.gif" class="confetti">`
      setTimeout(()=>{
          document.querySelector('.confetti').style.opacity = '0';
          console.log('fade')
      }, 2300)
  } 
  if (localStorage.BObestLevel<level) {
    localStorage.BObestLevel=level;
}
  endgameEl.innerHTML += `<p>Твой счёт ${score}</p>
  <button onclick="location.reload()" class="restart">Заново</button>
  <div id="endgame-achivments"></div>
  `;
  const endgameAchivments = document.getElementById('endgame-achivments');
  endgameEl.style.display = 'flex';
      if (score>=15) {
          localStorage.tp= +localStorage.tp + Math.floor(score/15);
          endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Вы добыли туалетную бумагу в количестве ${Math.floor(score/15)} шт!</p><img src="../images/tp.png" height="80px"></div>`;
          
      }
      if (score>=30) {
          localStorage.msk= +localStorage.msk + Math.floor(score/30);
          endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Вы добыли маски в количестве ${Math.floor(score/30)} шт!</p><img src="../images/msk.png" height="80px"></div>`;
      }
      if (score>=45) {
          localStorage.an= +localStorage.an + Math.floor(score/(brickRowCount * brickColumnCount));
          endgameAchivments.innerHTML = endgameAchivments.innerHTML+`<div><p>Вы добыли антисептики в количестве ${Math.floor(score/(brickRowCount * brickColumnCount))} шт!</p><img src="../images/an.png" height="80px"></div>`;
      } 
      
  //location.reload();
  console.log('score',score);
  console.log('best score',localStorage.BObestScore);
  localStorage.BOtimesPlayed++;
  updateGameLocalInners();


}

let bustVal = '<img src="../images/bust-up.png" class="bust-up-icon">';
const bustUpSpanSpeed = document.getElementById('bust-up-span-speed');
const bustUpSpanMistakes = document.getElementById('bust-up-span-mistakes');
const bustUpSpanWidth = document.getElementById('bust-up-span-width');

 
function updateBustUpInners(bust){
    if (bust=='tp') {
        return ` удлинение доски (${brick.w}px)`
    } 
    if (bust=='msk') {
        return` право на ошибку (${mistakeRoot})`
    } 
   if (bust=='an') {
        return ` замедление шарика`
    }
    
}

function tpUseActions(){
    localStorage.tp--;
    brick.w=100;
    //draw();
    bustUpSpanWidth.innerHTML = bustVal + updateBustUpInners('tp');
}
function mskUseActions(){
    localStorage.msk--;
    mistakeRoot++;
    
    bustUpSpanMistakes.innerHTML = bustVal + updateBustUpInners('msk');
}
function anUseActions(){
    localStorage.an--;
    brick.w+=10;
    if (ball.speed>2) ball.speed -= 2;
    //update();
    bustUpSpanWidth.innerHTML = bustVal + updateBustUpInners('tp');
    bustUpSpanSpeed.innerHTML = bustVal + updateBustUpInners('an');
}
