var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;


// canvas link
var linkX=canvas.width /2;
var linkY=canvas.height /2;
var linkHeight=20;
var linkWidth;
var linkText="Game Start"
var inLink = false;

var ballCnt;
var balls=[];

function Init() {
    ballCnt=Math.floor((Math.random()*10)+11);
    
    for (var c = 0; c < ballCnt; c++) {
        var x=Math.floor((Math.random()*canvas.width));
        var y=Math.floor((Math.random()*canvas.height));
        var dx=Math.floor((Math.random()*5))+1;
        var dy=Math.floor((Math.random()*5))+1;
        var size=Math.floor((Math.random())*10)+10;
        var color='#'+Math.round(Math.random()*0xffffff).toString(16);
        balls[c]={x:x,y:y,color:color,dx:dx,dy:dy,size:size};
    }

    canvas.addEventListener("mousemove", on_mousemove, false);
    canvas.addEventListener("click", on_click, false);
}


function drawBall() {
    
    for(var i=0;i<ballCnt;i++){
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,balls[i].size,0,Math.PI*2,false);
        ctx.fillStyle=balls[i].color;
        ctx.fill();
        ctx.closePath();
        balls[i].x+=balls[i].dx;
        balls[i].y+=balls[i].dy;
        collision(balls[i]);
    }
}

function collision(ball) {

    if (ball.x + ball.dx > canvas.width - ball.size || ball.x + ball.dx < ball.size) {
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.size) {
        ball.dy = -ball.dy;
    }
    else if (ball.y + ball.dy > canvas.height - ball.size) {
            ball.dy=-ball.dy;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawTitle();
}

function drawTitle(){

    ctx.font='32px sans-serif';
    ctx.fillStyle = "black";
    ctx.fillText(linkText,linkX,linkY);
    linkWidth=ctx.measureText(linkText).width;

    ctx.fillText("Crash Game",linkX-10,linkY-50);

    ctx.globalCompositeOperation='destination-over';
    ctx.rect(linkX-15, linkY-30, linkWidth+30, linkHeight+20);
    ctx.fillStyle="green";
    ctx.fill();

}

function on_mousemove (ev) {
    var x, y;
  
    // Get the mouse position relative to the canvas element.
    if (ev.layerX || ev.layerX == 0) { //for firefox
      x = ev.layerX;
      y = ev.layerY;
    }
    x-=canvas.offsetLeft;
    y-=canvas.offsetTop;
  
    //is the mouse over the link?
    if(x>=linkX && x <= (linkX + linkWidth) && y<=linkY && y>= (linkY-linkHeight)){
        document.body.style.cursor = "pointer";
        inLink=true;
    }
    else{
        document.body.style.cursor = "";
        inLink=false;
    }
  }
  
 
  function on_click(e) {
    if (inLink)  {
      window.location = './game.html';
    }
  }


Init();
setInterval(draw, 10)
