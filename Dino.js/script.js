let score = 0;
let cross = true;
let gameEnded = false; // Add a flag to track the game state

document.onkeydown = function(e) {
    if (gameEnded) return; // Prevent key events if the game has ended

    console.log("Key code is:", e.keyCode);
    if (e.keyCode == 38) {
        // Jump
        if (!dino.classList.contains('animateDino')) {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);

            // Increase score after each jump
            score += 1;
            updateScore(score);
        }
    }
    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    if (gameEnded) return; // Stop the game loop if the game has ended

    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));

    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    console.log("OffsetX:", offsetX, "OffsetY:", offsetY);

    if (offsetX < 73 && offsetY < 52) {
        // Collision detected
        console.log("Collision detected!");
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        gameEnded = true; // Set the game state to ended
    } else if (offsetX < 145 && cross) {
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 2500);

        // Increase difficulty by reducing animation duration
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (aniDur > 1.5) {  // Prevent it from becoming too fast
                let newDur = aniDur - 0.05;
                obstacle.style.animationDuration = newDur + 's';
                console.log("New animation duration:", newDur);
            }
        }, 500);
    }
}, 100);

function updateScore(score) {
    scoreCount.innerHTML = "YOUR SCORE: " + score;
}
