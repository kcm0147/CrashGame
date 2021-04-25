var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");

// ball Init
var ball;
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
var brickRow = 6;
var brickColumn = 6;

var brickWidth = 75;
var brickHeight = 20;

var brickPadding = 2;

var brickOffsetTop = canvas.height / 2 - 300;
var brickOffsetLeft = canvas.width / 2 - 200;

//score
var score = 0;

//time
var start = 0;
var change = 0;

//fireBall
var fireBall = { status: false, x: 0, y: 0, dx: 0, dy: 0 };
var fireBallCnt = 0;
var wallCrash=false;



function Init() {

    ball = { x: x, y: y, dx: dx, dy: dy, ballSize: ballSize, ballColor: 'black', status: 'normal' };

    var rand;

    for (var c = 0; c < brickColumn; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRow; r++) {
            rand = Math.floor((Math.random() * 3) + 1);
            item = Math.floor((Math.random() * 3) + 1);

            bricks[c][r] = { x: 0, y: 0, status: rand, item: item };
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
        ball.dx += (ball.dx * 0.04)
        ball.dy += (ball.dy * 0.04)

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
        fireBall.x += fireBall.dx;
        fireBall.y += fireBall.dy;

        if ((fireBall.y + fireBall.dy > canvas.height - ballSize) && (fireBall.x >= paddleX - 10 && fireBall.x <= paddleX + paddleWidth + 10)) {
            fireBall.status = false;
            fireBallCnt++;

            ball.status = 'fire'
            ball.ballColor = 'red'
            wallCrash=false;
        }
        else if (fireBall.y + fireBall.dy > canvas.height - ballSize) {
            fireBall.status = false;
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
                    ctx.fillStyle = "#E6C17B";
                else if (bricks[c][r].status == 2)
                    ctx.fillStyle = "#C2722E";
                else if (bricks[c][r].status == 3)
                    ctx.fillStyle = "#8B4513";

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



            if (b.status > 0 && ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {

                if (ball.status == 'normal') {
                    ball.dy = -ball.dy;
                    --b.status;
                }
                else if (ball.status == 'fire') {
                    b.status -= 3;
                }

                if (b.status <= 0) {
                    score++;
                    if (b.item == 1 && !fireBall.status && ball.status == 'normal') {
                        fireBall.status = true;
                        fireBall.x = b.x;
                        fireBall.y = b.y;
                        fireBall.dx = 0;
                        fireBall.dy = 2;
                        fireBallCnt++;
                    }

                    if(ball.status=='fire'){
                        wallCrash=true;
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
    ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI * 2, false);
    ctx.fillStyle = ball.ballColor;
    ctx.fill();
    ctx.closePath();
}

function collision() {

    if (ball.x + ball.dx > canvas.width - ball.ballSize || ball.x + ball.dx < ball.ballSize) {
        ball.dx = -ball.dx;

        if (ball.status == 'fire' && wallCrash) {
            wallCrash = false;
            ball.ballColor = 'black'
            ball.status = 'normal'
        }
    }

    if (ball.y + ball.dy < ball.ballSize) {
        ball.dy = -ball.dy;

        if (ball.status == 'fire' && wallCrash) {
            wallCrash = false;
            ball.ballColor = 'black'
            ball.status = 'normal'
        }
    }

    else if (ball.y + ball.dy > canvas.height - ball.ballSize) {
        if (ball.x >= paddleX - 10 && ball.x <= paddleX + paddleWidth + 10) {
            ball.dx = -((paddleX + (paddleWidth / 2) - ball.x) / (paddleWidth)) * 10;
            ball.dy = -ball.dy;

            if (ball.status == 'fire' && wallCrash) {
                wallCrash = false;
                ball.ballColor = 'black'
                ball.status = 'normal'
            }

        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER!! Your Record is "+score);
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
    ball.x += ball.dx;
    ball.y += ball.dy;
}


function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}



Init();
setInterval(draw, 10)
