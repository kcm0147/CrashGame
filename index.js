var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballSize=15;
var dx= 3;
var dy= -3;

//paddle
var paddleHeight = 10;
var paddleWidth= 75;
var paddleX = (canvas.width-paddleWidth)/2;

//paddle Control
var rightPressed = false;
var leftPressed = false;

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight, paddleWidth,paddleHeight);
    ctx.fillStyle="#0034DA";
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y,ballSize, 0, Math.PI * 2, false);
    ctx.fillStyle = "#001234";
    ctx.fill();
    ctx.stroke(); // 원 외곽선
    ctx.closePath();
}

function collision(){

    if(x + dx > canvas.width-ballSize || x + dx < ballSize) {
        dx = -dx;
    }

    if(y + dy < ballSize) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballSize) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER!! RETRY IT !");
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth){
        paddleX+=4;
    }
    else if(leftPressed && paddleX > 0){
        paddleX-=4;
    }
}

function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBall();
    drawPaddle();
    collision();
    x+=dx;
    y+=dy;
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);
