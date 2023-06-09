//Set up Canvas
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

//Global Variables???
let ballreset = "false";
let score1 = 0;
let score2 = 0;

let player = {
    x: 10,
    y: 250, 
    w: 10,
    h: 100,
    xSpeed: 0,
    ySpeed: 0,
    speed: 5
}

let player2 = {
    x: 780,
    y: 250,
    w: 10,
    h: 100,
    xSpeed: 0,
    ySpeed: 0,
    speed: 5
}

let ball = {
    x: 400,
    y: 300,
    w: 20,
    h: 20,
    xSpeed: 5,
    ySpeed: 5,
}

//Program Loop
requestAnimationFrame(draw);

function draw() {
    //Logic

    //Move player by xSpeed and ySpeed
    player.x += player.xSpeed;
    player.y += player.ySpeed;

    //Move player by xSpeed and ySpeed
    player2.x += player2.xSpeed;
    player2.y += player2.ySpeed;

    //Move ball by xSpeed and ySpeed
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    drawMainComponents();
    movePlayer();
    movePlayer2();
    moveBall();
    checkCollision();
    requestAnimationFrame(draw);
      
}

function movePlayer() {

    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("keyup", keyupHandler);
  
    function keydownHandler(event) {
      if (event.code == "KeyW") {
          player.ySpeed = -player.speed;
      } else if (event.code == "KeyS") {
          player.ySpeed = player.speed;
    }
    }
  
    function keyupHandler(event) {
      if (event.code == "KeyW") {
          player.ySpeed = 0;
      } else if (event.code == "KeyS") {
          player.ySpeed = 0;
      }
    } 
  }

function movePlayer2() {

  document.addEventListener("keydown", keydownHandler);
  document.addEventListener("keyup", keyupHandler);

  function keydownHandler(event) {
    if (event.code == "ArrowUp") {
        player2.ySpeed = -player2.speed;
    } else if (event.code == "ArrowDown") {
        player2.ySpeed = player2.speed;
  }
  }

  function keyupHandler(event) {
    if (event.code == "ArrowUp") {
        player2.ySpeed = 0;
    } else if (event.code == "ArrowDown") {
        player2.ySpeed = 0;
    }
  } 
}

function moveBall() {
    
}

function checkCollision() {
    if (player.y < 20) {
        player.y = 20;
    } else if (player.y > cnv.height-120) {
        player.y = cnv.height-120;
    }

    if (player2.y < 20) {
        player2.y = 20;
    } else if (player2.y > cnv.height-120) {
        player2.y = cnv.height-120;
    }

    if (
        ball.x < player.x + player.w && 
        ball.x + ball.w > player.x &&
        ball.y < player.y + player.h &&
        ball.y + ball.h > player.y
        ) {
        ball.xSpeed *= -1;
        ball.x = player.x + player.w;
        }

    if (
        ball.x + ball.w > player2.x &&
        ball.x < player2.x + player2.w &&
        ball.y < player2.y + player2.h &&
        ball.y + ball.h > player2.y
        ) {
        ball.xSpeed *= -1;
        ball.x = player2.x - ball.w;
        }

     if (ball.y < 20) {
        ball.y = 20;
        ball.ySpeed *= -1;
    } else if (ball.y > cnv.height-20) {
        ball.y = cnv.height-20;
        ball.ySpeed *= -1;
    }

    if (ball.x <= 0) {
        score2++;
        ball.x = 400;
        ball.y = 20 + Math.random() * 560;
        ball.xSpeed = -5;
    } else if (ball.x >= cnv.width) {
        score1++;
        ball.x = 400;
        ball.y = 20 + Math.random() * 560;
        ball.xSpeed = 5;
    }
}

function drawMainComponents() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    //Draw Player
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.w, player.h);

    //Draw Player2
    ctx.fillStyle = "white";
    ctx.fillRect(player2.x, player2.y, player2.w, player2.h);

    //Draw Ball
    ctx.fillStyle = "white";
    ctx.fillRect(ball.x-10, ball.y-10, ball.w, ball.h);

    //dottet line
    for (let i = 10; i < cnv.height - 20; i += 20) {
    ctx.fillStyle = "white";
    ctx.fillRect(cnv.width/2 - 5, i, 10, 10)
    }

    //Draw Walls
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, cnv.width, 20);
    ctx.fillRect(0, cnv.height - 20, cnv.width, 20);

    //Scoreboard
    ctx.font = "40px Consolas";
    ctx.fillStyle = "white";
    ctx.fillText(score1, 200, 100);

    ctx.font = "40px Consolas";
    ctx.fillStyle = "white";
    ctx.fillText(score2, 600, 100);
    
}

