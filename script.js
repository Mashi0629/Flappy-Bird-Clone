const canvas = document.getElementById("gamesCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 500;

let bird = {x:50, y:250, width:30, height:30, velocityY:0};
let gravity = 0.5;
let isGameOver = false;

document.addEventListener("keydown",()=>{
    bird.velocityY = -7;
});

function update(){
    if (isGameOver) return;

    bird.velocityY += gravity;
    bird.y += bird.velocityY;

    if(bird.y > canvas.height - bird.height){
        isGameOver = true;
    }
    draw();
    requestAnimationFrame(update);
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillStyle(bird.x, bird.y, bird.width, bird.height);

}

update();
