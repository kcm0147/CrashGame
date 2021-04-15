var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx= 2;
var dy= -2;

// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "##FF0000";
// ctx.fill();
// ctx.closePath(); 


function draw() {

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke(); // 원 외곽선
    ctx.closePath();

    x+=dx;
    y+=dy;

}

setInterval(draw, 10);