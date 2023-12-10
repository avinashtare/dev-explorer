// Create an offscreen canvas
let offscreenCanvas = document.createElement('canvas');
let offscreenCtx = offscreenCanvas.getContext('2d');

// Set the size of the offscreen canvas
offscreenCanvas.width = imageData[0].length;
offscreenCanvas.height = imageData.length;

// Loop through the data and draw on the offscreen canvas
for (let i = 0; i < imageData.length; i++) {
    for (let j = 0; j < imageData[i].length; j++) {
        // get colors form array 
        let [red, green, blue, alpha] = imageData[i][j];

        // color for each rect 
        offscreenCtx.fillStyle = `rgba(${red},${green},${blue},${alpha})`;

        // add a rect of 1 * 1 px height width 
        offscreenCtx.fillRect(j, i, 1, 1);
    }
}

// Draw the entire offscreen canvas onto the main canvas
let canvas = document.getElementById('canvas');
// Set the size of the offscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

ctx.drawImage(offscreenCanvas, 0, 0);