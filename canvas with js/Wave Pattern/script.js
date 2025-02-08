const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

// all the ball
let balls = [];
let ballsColor = "#ffffff";
let gap = 28;
let size = gap / 2.8;


// inisalize balls
function initializeBalls() {
    balls = []
    for (let i = 0; i < canvas.width / gap; i++) {
        for (let j = 0; j < canvas.height / gap; j++) {
            // new ball instance and Create each ball and position it in a grid
            let ball = new Ball((i * gap) + gap / 2, (j * gap) + gap / 2, 0)
            // add balls into array 
            balls.push(ball);
        }
    }
}
initializeBalls();

// Get the center point of the canvas
let centerX = Math.floor(canvas.width / 2 / gap) * gap + gap / 2;
let centerY = Math.floor(canvas.height / 2 / gap) * gap + gap / 2;

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// for colors
// let w = 20;
// let p = 0;
// for (let i = 0; i < canvas.width / w; i++) {
//     let c = getRandomColor()
//     balls.forEach((ball, index) => {
//         let distance = Math.sqrt(Math.pow(centerX - ball.x, 2) + Math.pow(centerY - ball.y, 2));
//         if (distance > w && distance < w + p) {
//             ball.color = c;
//         }
//         balls[index] = ball;
//     });
//     w += 20;
//     p = w;
// }

function drawBalls() {
    balls.forEach((ball, index) => {
        // Check if ball is within the effect radius
        let distance = Math.sqrt(Math.pow(centerX - ball.x, 2) + Math.pow(centerY - ball.y, 2));
        if (distance < waveRadius) {
            ball.adjustSize();
        }

        ball.draw();

        // update ball changes 
        balls[index] = ball;
    });
}

let waveRadius = 0;
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    centerX = Math.floor(canvas.width / 2 / gap) * gap + gap / 2;
    centerY = Math.floor(canvas.height / 2 / gap) * gap + gap / 2;
    initializeBalls();
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing

    drawBalls();

    // Expand the effect radius over time
    if (waveRadius < canvas.width) {
        waveRadius += 1
    }
    requestAnimationFrame(animate);
}

animate();