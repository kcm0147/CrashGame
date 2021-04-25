var subCanvas = document.getElementById("subCanvas");
var subCtx = subCanvas.getContext("2d");


var firstX=20;
var firstY=200;
var width=75;
var height=25;

function drawExplain() {
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);
    
    subCtx.beginPath();
    subCtx.rect(firstX, firstY, width, height);
    subCtx.fillStyle = "#E6C17B";
    subCtx.fill();
    
    subCtx.font = 'bold 24px Courier New'
    subCtx.fillStyle = "black";
    subCtx.fillText("1 HIT", firstX+120, firstY+20);
    subCtx.closePath();
    
    subCtx.beginPath();
    subCtx.rect(firstX, firstY+70, width, height);
    subCtx.fillStyle = "#C2722E";
    subCtx.fill();

    subCtx.font = 'bold 24px Courier New'
    subCtx.fillStyle = "black";
    subCtx.fillText("2 HIT", firstX+120, firstY+90);

    subCtx.closePath();

    subCtx.beginPath();
    subCtx.rect(firstX, firstY+140, width, height);
    subCtx.fillStyle = "#8B4513";
    subCtx.fill();

    subCtx.font = 'bold 24px Courier New'
    subCtx.fillStyle = "black";
    subCtx.fillText("3 HIT", firstX+120, firstY+160);

    subCtx.closePath();


    subCtx.beginPath();
    subCtx.arc(firstX+35, firstY+230, 15, 0, Math.PI * 2, false);
    subCtx.fillStyle = 'red'
    subCtx.fill();

    subCtx.font = 'bold 24px Courier New'
    subCtx.fillStyle = "black";
    subCtx.fillText("Fire", firstX+130, firstY+240);

    subCtx.closePath();

}

drawExplain();