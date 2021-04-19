var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballSize = 15;
var dx = 3;
var dy = -3;

//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//paddle Control
var rightPressed = false;
var leftPressed = false;

//wall

var bricks = [];
var brickRow = 3;
var brickColumn = 5;

var brickWidth = 75;
var brickHeight = 20;

var brickPadding = 10;

var brickOffsetTop = canvas.height / 2 - 300;
var brickOffsetLeft = canvas.width / 2 - 200;



function Init(){

    //draw wall
    for (var c = 0; c < brickColumn; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRow; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function drawWall() {


    for (var c = 0; c < brickColumn; c++) {
        for (var r = 0; r < brickRow; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#6F4F28";
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
            if (b.status==1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                dy = -dy;
                b.status=0;
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
    ctx.fillStyle = "#001234";
    ctx.fill();
    ctx.stroke(); // 원 외곽선
    ctx.closePath();
}

function collision() {

    if (x + dx > canvas.width - ballSize || x + dx < ballSize) {
        dx = -dx;
    }

    if (y + dy < ballSize) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballSize) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        // else {
        //     alert("GAME OVER!! RETRY IT !");
        //     document.location.reload();
        // }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 4;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 4;
    }
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawWall();
    collision();
    collisionWall();
    x += dx;
    y += dy;
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

Init();
setInterval(draw, 10);
