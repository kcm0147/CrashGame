var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballSize = 15;
var ballColor = "black";
var dx = 0;
var dy = -5;

var lives = 1;

//paddle
var paddleHeight = 10;
var paddleWidth = 95;
var paddleX = (canvas.width - paddleWidth) / 2;

//paddle Control
var rightPressed = false;
var leftPressed = false;

//wall
var bricks = [];
var brickRow = 7;
var brickColumn = 7;

var brickWidth = 75;
var brickHeight = 20;

var brickPadding = 2;

var brickOffsetTop = canvas.height / 2 - 300;
var brickOffsetLeft = canvas.width / 2 - 300;

//score
var score = 0;

//time
var start = 0;
var change = 0;

//fireBall
var fireBall = { status: false, x: 0, y: 0, dx: 0, dy: 0 };
var fireBallCnt = 0;



function Init() {

    var rand;

    for (var c = 0; c < brickColumn; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRow; r++) {
            rand = Math.floor((Math.random() * 3) + 1);
            item = Math.floor((Math.random() * 8) + 1);

            bricks[c][r] = { x: 0, y: 0, status: rand, item: 1 };
        }
    }

    document.addEventListener("mousemove", mouseMoveHandler, false);
}

function drawScore() {
    ctx.font = 'bold 24px Courier New'
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 30, 80);
}

function drawTime() {
    ctx.font = 'bold 24px Courier New'
    ctx.fillStyle = "black";

    if (start - change > 8) {
        change = start;
        dx += (dx * 0.04)
        dy += (dy * 0.04)

    }
    start += 0.01;
    ctx.fillText("Time: " + start.toFixed(1) + " sec", 30, 120);
}

function drawFireBall() {

    if (fireBall.status) {
        ctx.beginPath();
        ctx.arc(fireBall.x, fireBall.y, ballSize, 0, Math.PI * 2, false);
        ctx.fillStyle = 'red'
        ctx.fill();
        ctx.closePath();
        fireBall.x+=fireBall.dx;
        fireBall.y+=fireBall.dy;

        if ((fireBall.y + fireBall.dy > canvas.height - ballSize) && (fireBall.x >= paddleX - 10 && fireBall.x <= paddleX + paddleWidth + 10)) {
            fireBall.status=false;
            fireBallCnt++;
            console.log("ok");
        }
        else if (fireBall.y + fireBall.dy > canvas.height - ballSize) {
            fireBall.status=false;
        }
    }
}

function drawWall() {


    for (var c = 0; c < brickColumn; c++) {
        for (var r = 0; r < brickRow; r++) {
            if (bricks[c][r].status == 1 || bricks[c][r].status == 2 || bricks[c][r].status == 3) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);

                if (bricks[c][r].status == 1)
                    ctx.fillStyle = "#6F4F28";
                else if (bricks[c][r].status == 2)
                    ctx.fillStyle = "black";
                else if (bricks[c][r].status == 3)
                    ctx.fillStyle = "grey";

                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

function collisionWall() {

    for (var c = 0; c < brickColumn; c++) {
        for (var r = 0; r < brickRow; r++) {
            var b = bricks[c][r];
            if (b.status > 0 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;

                --b.status;
                if (b.status == 0) {
                    score++;
                    if (b.item == 1 && !fireBall.status) {
                        fireBall.status = true;
                        fireBall.x = b.x;
                        fireBall.y = b.y;
                        fireBall.dx = 0;
                        fireBall.dy = 2;
                        fireBallCnt++;
                    }
                }

                if (score == brickColumn * brickHeight) {
                    alert("FINISH!!!");
                    document.location.reload();
                }
            }
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0034DA";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2, false);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function collision() {

    if (x + dx > canvas.width - ballSize || x + dx < ballSize) {
        dx = -dx;
    }

    if (y + dy < ballSize) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballSize) {
        if (x >= paddleX - 10 && x <= paddleX + paddleWidth + 10) {
            dx = -((paddleX + (paddleWidth / 2) - x) / (paddleWidth)) * 10;
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER!! RETRY IT !");
                document.location.reload()
            }
        }
    }



}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawTime();
    drawBall();
    drawFireBall();
    drawPaddle();
    drawWall();
    collisionWall();
    collision();
    x += dx;
    y += dy;
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}



Init();
setInterval(draw, 10)
