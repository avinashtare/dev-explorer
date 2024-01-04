let video = document.getElementById("video-player");
let backImg = document.getElementById("back-img");


let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

video.addEventListener("loadedmetadata", () => {
    canvas.width = 1200;
    canvas.height = 480;
})


// add frames 
let frame = 0;
let fps = 5;
let frameReqId = null;
function playFrames() {
    if (frame % fps == 0) {
        // draw video current frame on canvas 
        ctx.drawImage(video, 0, 0);

        // get base64 url and put to src 
        backImg.src = canvas.toDataURL();
    }
    frame++;
    frameReqId = requestAnimationFrame(playFrames);
}

function stopFrames() {
    cancelAnimationFrame(frameReqId);
}

// start frames or stop evnets
video.addEventListener("playing",playFrames)
video.addEventListener("pause",playFrames)