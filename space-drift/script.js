//const rocket = document.getElementById('rocket');
const rocketSpace = document.getElementById('rocket-space');
//localStorage.clear();
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const bestEl = document.getElementById('best');
const endgameEl = document.getElementById('end-game');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setGameLocalItems() {
    if (localStorage.SDtimesPlayed == null) {
        localStorage.setItem('SDtimesPlayed', 0);
    }
    if (localStorage.SDbestScore == null) {
        localStorage.setItem('SDbestScore', 0);
    }
}

function updateGameLocalInners() {
    bestEl.innerHTML = localStorage.SDbestScore;
    timesPlayedSpan.innerHTML = localStorage.SDtimesPlayed;
    if (localStorage.CWtimesPlayed > 1 && localStorage.SDtimesPlayed < 5) {
        TimesWordEnding.innerHTML = "а"
    } else {
        TimesWordEnding.innerHTML = ""
    }
}
const playerObj = {
    x: 80,
    y: canvas.height / 2 - 20,
    h: 40,
    w: 50,
    speed: 8,
    dy: 0,
    dx: 0,
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    if (e.key == "ArrowDown" || e.key == "Down") {
        playerObj.dy = playerObj.speed;
    } else if (e.key == "ArrowUp" || e.key == "Up") {
        playerObj.dy = -playerObj.speed;
    }

}

function keyUp(e) {
    if (e.key == "ArrowUp" || e.key == "Up" || e.key == "ArrowDown" || e.key == "Down") {
        playerObj.dy = 0;
    }
}

let k = true;
let random = 0;
let time = 30;
const player = new Image();
player.addEventListener("load", function () {
    // здесь выполняет drawImage функцию
    draw()
}, false);
player.src = "../images/covid.png";


function drawPlayer() {
    ctx.drawImage(player, playerObj.x, playerObj.y, playerObj.w, playerObj.h);
}

function movePlayer() {
    playerObj.y += playerObj.dy;
    playerObj.x += playerObj.dx;
    if (playerObj.y + playerObj.h > canvas.height) {
        console.log(playerObj, canvas.height);
        playerObj.y = canvas.height - playerObj.h;
        console.log(playerObj);
    }

    if (playerObj.y < 0) {
        playerObj.y = 0;
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer()
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