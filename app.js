var canvas;
var canvasContext
var ballX = 40;
var ballY = 40;
var ballSpeedX = 15;
var ballSpeedY = 5;

var player1Score = 0
var player2Score = 0
const WINNING_SCORE = 3;

var showingWinScreen = false;


var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;


//mouse movement 
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
            x:mouseX,
            y:mouseY
    };
}


function handleMouseClick(evt){
    if(showingWinScreen){
            player1Score = 0;
            player2Score = 0;
            showingWinScreen = false;
    }
}

window.onload = function(){

    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

canvas.addEventListener('mousedown', handleMouseClick);


//SWITCHES CONTROL TO RIGHT PLAYER==================================
canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
            });

//SWITCHES CONTROL TO RIGHT PLAYER
            // canvas.addEventListener('mousemove',
            // function(evt){
            //     var mousePos = calculateMousePos(evt);
            //     paddle2Y = mousePos.y-(PADDLE_HEIGHT/2);
            // });
}

function ballReset(){
    if(player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE){
            showingWinScreen = true;
        }


    ballSpeedX = -ballSpeedX;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
};

//COMPUTER MOVEMENT ==== = = = = 
function computerMovement(){
        if(paddle2Y < ballY){
                paddle2Y += 6;
        } else {
                paddle2Y -= 6;
        }
};

function moveEverything(){
    if(showingWinScreen){
        return;
    }
    computerMovement();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

//EDGE DETECTION FOR BALL ON LEFT SIDE
    if(ballX < 0){
        if(ballY > paddle1Y &&
           ballY < paddle1Y+PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;
                
                
            var deltaY = ballY
                -(paddle1Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.10;

        } else{
                player2Score++; // must be before ball reset()
                ballReset();
                
        } 
    }

//EDGE DETECTION FOR BALL ON RIGHT SIDE
    if(ballX > canvas.width){
        if(ballY > paddle2Y &&
            ballY < paddle2Y+PADDLE_HEIGHT){
                 ballSpeedX = -ballSpeedX;
                 var deltaY = ballY
                -(paddle2Y+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.20;
         } else{
                player1Score++;  // must be before ball reset()
                ballReset();
                 
         }
}   
    
    if(ballY < 0){
        ballSpeedY = -ballSpeedY;
    }
    if(ballY > canvas.height){
        ballSpeedY = -ballSpeedY;
    } 
  
}

function drawNet() {
    for(var i=0; i<canvas.height; i+=40){
        colorRect(canvas.width/2-1,i,2,20, 'white')
    }
}

function drawEverything(){
  
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    if(showingWinScreen){
            canvasContext.fillStyle = 'white';

        if (player1Score >= WINNING_SCORE){
            canvasContext.fillText("YOU WIN!!!", 380, 200);
        } else if (player2Score >= WINNING_SCORE){
            canvasContext.fillText ("COMPUTER WINS!!!", 380, 200);
        }
        canvasContext.fillText ("CLICK TO CONTINUE", 380, 300);
        return;
    }

drawNet();

//PADDLE FOR LEFT PLAYER
    colorRect(PADDLE_THICKNESS, paddle1Y,
            PADDLE_THICKNESS, PADDLE_HEIGHT, 'green');

//PADDLE FOR LEFT COMPUTER
    colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y,
            PADDLE_THICKNESS, PADDLE_HEIGHT, 'green');

//BALL
 //   SQUAREBALL -- colorRect(ballX, 200, 10, 10, 'yellow');
        colorCircle(ballX, ballY, 10, 'grey');


//SCORE BOARD--------        
        canvasContext.fillText (player1Score, 350, 50);
        canvasContext.fillText (player2Score, 450, 50);
}

function colorCircle(centerX, centreY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centreY, 10, 0,Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height, drawColor);
}



