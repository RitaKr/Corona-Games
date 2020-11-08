//const rocket = document.getElementById('rocket');
const rocketSpace = document.getElementById("rocket-space");
//localStorage.clear();
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const endgameEl = document.getElementById("end-game");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setGameLocalItems() {
  if (localStorage.SDtimesPlayed == null) {
    localStorage.setItem("SDtimesPlayed", 0);
  }
  if (localStorage.SDbestScore == null) {
    localStorage.setItem("SDbestScore", 0);
  }
}

function updateGameLocalInners() {
  bestEl.innerHTML = localStorage.SDbestScore;
  timesPlayedSpan.innerHTML = localStorage.SDtimesPlayed;
  if (localStorage.CWtimesPlayed > 1 && localStorage.SDtimesPlayed < 5) {
    TimesWordEnding.innerHTML = "а";
  } else {
    TimesWordEnding.innerHTML = "";
  }
}
const playerObj = {
  x: 10,
  y: 20,
  h: 50,
  w: 60,
  speed: 8,
  dy: 0,
  dx: 0,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  if (e.key == "ArrowDown" || e.key == "Down") {
    playerObj.dy = playerObj.speed;
  } else if (e.key == "ArrowUp" || e.key == "Up") {
    playerObj.dy = -playerObj.speed;
  }
  if (e.key == "ArrowLeft" || e.key == "Left") {
    playerObj.dx = -playerObj.speed;
  } else if (e.key == "ArrowRight" || e.key == "Right") {
    playerObj.dx = playerObj.speed;
  }
}

function keyUp(e) {
  if (
    e.key == "ArrowUp" ||
    e.key == "Up" ||
    e.key == "ArrowDown" ||
    e.key == "Down"
  ) {
    playerObj.dy = 0;
  } else if (
    e.key == "ArrowLeft" ||
    e.key == "Left" ||
    e.key == "ArrowRight" ||
    e.key == "Right"
  ) {
    playerObj.dx = 0;
  }
}

let k = true;
let random = 0;
let time = 30;
const player = new Image();
player.addEventListener(
  "load",
  function () {
    // здесь выполняет drawImage функцию
    draw();
  },
  false
);
player.src = "../images/covid.png";

function drawPlayer() {
  ctx.drawImage(player, playerObj.x, playerObj.y, playerObj.w, playerObj.h);
}

function drawMazeWalls() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(200, 100);
  ctx.moveTo(100, 200);
  ctx.lineTo(200, 200);
  ctx.lineTo(200, 300);
  ctx.moveTo(300, 100);
  ctx.lineTo(300, 200);
  ctx.lineTo(400, 200);
  ctx.lineTo(400, 100);
  ctx.lineTo(500, 100);
  ctx.lineTo(500, 300);
  ctx.moveTo(600, 0);
  ctx.lineTo(600, 100);
  ctx.lineTo(700, 100);
  ctx.moveTo(600, 200);
  ctx.lineTo(800, 200);
  ctx.stroke();
}

function movePlayer() {
  playerObj.y += playerObj.dy;
  playerObj.x += playerObj.dx;
  if (playerObj.y + playerObj.h > canvas.height) {
    console.log(playerObj, canvas.height);
    playerObj.y = canvas.height - playerObj.h;
    console.log(playerObj);
  }
  //horizontal 1st level
  if (
    playerObj.y <= 100 &&
    playerObj.y >= 90 &&
    (playerObj.x <= 200 ||
      (playerObj.x + playerObj.w >= 400 && playerObj.x <= 500) ||
      (playerObj.x + playerObj.w >= 600 && playerObj.x <= 700))
  ) {
    playerObj.y = 102;
  } else if (
    playerObj.y + playerObj.h >= 100 &&
    playerObj.y + playerObj.h <= 110 &&
    (playerObj.x <= 200 ||
      (playerObj.x + playerObj.w >= 400 && playerObj.x <= 500) ||
      (playerObj.x + playerObj.w >= 600 && playerObj.x <= 700))
  ) {
    playerObj.y = 98 - playerObj.h;
  }
  //horizontal 2st level
  if (
    playerObj.y <= 200 &&
    playerObj.y >= 190 &&
    ((playerObj.x + playerObj.w >= 100 && playerObj.x <= 200) ||
      (playerObj.x + playerObj.w >= 300 && playerObj.x <= 400) ||
      playerObj.x + playerObj.w >= 600)
  ) {
    playerObj.y = 202;
  } else if (
    playerObj.y + playerObj.h >= 200 &&
    playerObj.y + playerObj.h <= 210 &&
    ((playerObj.x + playerObj.w >= 100 && playerObj.x <= 200) ||
      (playerObj.x + playerObj.w >= 300 && playerObj.x <= 400) ||
      playerObj.x + playerObj.w >= 600)
  ) {
    playerObj.y = 198 - playerObj.h;
  }

  //vertical 2st level
  if (
    playerObj.x <= 200 &&
    playerObj.x >= 190 &&
    playerObj.y + playerObj.h >= 200
  ) {
    playerObj.x = 202;
  } else if (
    playerObj.x + playerObj.w >= 200 &&
    playerObj.x + playerObj.w <= 210 &&
    playerObj.y + playerObj.h >= 200
  ) {
    playerObj.x = 198 - playerObj.w;
  }
  //vertical 3st level
  if (
    playerObj.x <= 300 &&
    playerObj.x >= 290 &&
    playerObj.y + playerObj.h >= 100 &&
    playerObj.y <= 200
  ) {
    playerObj.x = 302;
  } else if (
    playerObj.x + playerObj.w >= 300 &&
    playerObj.x + playerObj.w <= 310 &&
    playerObj.y + playerObj.h >= 100 &&
    playerObj.y <= 200
  ) {
    playerObj.x = 298 - playerObj.w;
  }
  //vertical 4st level
  if (
    playerObj.x <= 400 &&
    playerObj.x >= 390 &&
    playerObj.y + playerObj.h >= 100 &&
    playerObj.y <= 200
  ) {
    playerObj.x = 402;
  } else if (
    playerObj.x + playerObj.w >= 400 &&
    playerObj.x + playerObj.w <= 410 &&
    playerObj.y + playerObj.h >= 100 &&
    playerObj.y <= 200
  ) {
    playerObj.x = 398 - playerObj.w;
  }
  //vertical 5st level
  if (
    playerObj.x <= 500 &&
    playerObj.x >= 490 &&
    playerObj.y + playerObj.h >= 100
  ) {
    playerObj.x = 502;
  } else if (
    playerObj.x + playerObj.w >= 500 &&
    playerObj.x + playerObj.w <= 510 &&
    playerObj.y + playerObj.h >= 100
  ) {
    playerObj.x = 498 - playerObj.w;
  }
  //vertical 6st level
  if (playerObj.x <= 600 && playerObj.x >= 590 && playerObj.y <= 100) {
    playerObj.x = 602;
  } else if (
    playerObj.x + playerObj.w >= 600 &&
    playerObj.x + playerObj.w <= 610 &&
    playerObj.y <= 100
  ) {
    playerObj.x = 598 - playerObj.w;
  }
  if (playerObj.x + playerObj.w > canvas.width) {
    console.log(playerObj, canvas.width);
    playerObj.x = canvas.width - playerObj.w;
    console.log(playerObj);
  }
  if (playerObj.y < 0) {
    playerObj.y = 0;
  }
  if (playerObj.x < 0) {
    playerObj.x = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawMazeWalls();
}

function update() {
  movePlayer();
  draw();
  requestAnimationFrame(update);
}

update();

function updateTime() {
  time--;
  timeEl.innerHTML = time + " с";
  if (time === 0) {
    k = false;
  }
}

function tpUseActions() {
  localStorage.tp--;
}

function mskUseActions() {
  localStorage.msk--;
}

function anUseActions() {
  localStorage.an--;
}
//localStorage.clear()
