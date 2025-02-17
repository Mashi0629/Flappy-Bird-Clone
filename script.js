const canvas = document.getElementById("gamesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let bird = {x:50, y:250, width:30, height:30, velocityY:0};
let gravity = 0.5;
let isGameOver = false;

let pipes = [];  
let pipeWidth = 50;
let pipeGap = 150;
let pipeVelocity = -3;

let score = 0;

document.addEventListener("keydown",()=>{
    bird.velocityY = -7;
});

function update(){
    if (isGameOver){
        showGameOver();
        return;
    } 

    bird.velocityY += gravity;
    bird.y += bird.velocityY;

    checkCollision();
    updatePipes();
    updateScore();

    if(bird.y > canvas.height - bird.height){
        isGameOver = true;
    }
    draw();
    requestAnimationFrame(update);
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    drawPipes();
    drawScore();


}

update();

// func to create pipe
function createPipe(){
    let randomHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;
    pipes.push({ x: canvas.width, y: randomHeight});

}

//function to update pipes
function updatePipes(){
    for (let i = 0; i < pipes.length; i++){
        pipes[i].x += pipeVelocity;

        if (pipes[i].x + pipeWidth <0){
            pipes.splice(i, 1);
            i--;
            createPipe();
        }
    }
}

//draw pipes
function drawPipes(){
    ctx.fillStyle =  "green";
    for (let pipe of pipes){
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        ctx.fillRect(pipe.x, pipe.y + pipeGap, pipeWidth, canvas.height - pipe.y - pipeGap);

    }
    
}

createPipe();
setInterval(createPipe, 2000);

// implement collision detection
function checkCollision(){
    if(bird.y + bird.height >= canvas.height){
        isGameOver = true;
    }
    for (let pipe of pipes){
        if(
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)

        ){
            isGameOver = true;
        }
    }
}



function updateScore(){
for (let pipe of pipes){
    if (!pipe.passed && pipe.x + pipeWidth < bird.x){
        score++;
        pipe.passed = true;
    }
}
}


function drawScore(){
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score:" + score, 20, 30);
}

//Game Over & Restart Feature
function showGameOver(){
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 70, canvas.height / 2);

}

document.addEventListener("keydown", (event) => {
    if (isGameOver && event.code === "Enter") {
        location.reload();
    }
});




