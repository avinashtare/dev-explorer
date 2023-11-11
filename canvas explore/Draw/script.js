// defind canvas
let canvas = document.getElementById("canvas");

// screen width 
let sWidth = window.innerWidth;
let sHeight = window.innerHeight;
canvas.width = sWidth;
canvas.height = sHeight;

// 2d canvas context 
const ctx = canvas.getContext("2d");
let selectedFeature = { pen: true };
let stylingData = { storke: "#1e1e1e", fill: "#f1f1f1", width: 10 }

// data of elements 
let drawingData = [];
// redo data 
let redoElementData = [];


let pre = [null, null];
// draw line 
function drawLine(width, stroke, startX, startY, endX, endY) {
    // Set line properties
    ctx.lineWidth = width;
    ctx.strokeStyle = stroke;
    ctx.lineCap = "round";


    // Define a new Path:
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(startX, startY);
    ctx.stroke();
};

// draw pen movement 
function drawPen() {
    let x = event.offsetX;
    let y = event.offsetY;

    if (pre[0] != null && pre[1] != null) {
        drawLine(stylingData.width, stylingData.storke, pre[0], pre[1], x, y);
    }

    // add drawing data 
    drawingData[drawingData.length - 1][0].data.push([x, y]);
    drawingData[drawingData.length - 1][0].stroke = stylingData.storke;
    drawingData[drawingData.length - 1][0].width = stylingData.width;

    pre = [x, y]
};

// Draw Data using data array
function drawData() {
    for (let i = 0; i < drawingData.length; i++) {
        // if data is pen pen 
        if (drawingData[i][0].type = "pen") {
            for (let j = 0; j < drawingData[i][0].data.length; j++) {
                if (j > 0) {
                    drawLine(drawingData[i][0].width,
                        drawingData[i][0].stroke,
                        drawingData[i][0].data[j - 1][0], drawingData[i][0].data[j - 1][1],
                        drawingData[i][0].data[j][0], drawingData[i][0].data[j][1]
                    );
                };
            };
        };
    };
};

// mouse movement handle 
function handleMoveMouse() {
    // default cursor 
    canvas.style.cursor = "default";

    // if the selectedFeature is pen 
    if (selectedFeature.pen) {
        canvas.style.cursor = "crosshair";
    }
}

// get image url when user past image 
function getImageUrlClipboard() {
    const items = event.clipboardData.items;

    for (const item of items) {
        if (item.type.indexOf('image') === 0) {
            const blob = item.getAsFile();
            const blobUrl = URL.createObjectURL(blob)
            return blobUrl;
        }
    }
}
function clearScreen() {
    ctx.clearRect(0, 0, sWidth, sHeight);
}

// handle mosue down 
function handleMouseDown(e) {
    // drawing with pen
    if (selectedFeature.pen) {
        canvas.addEventListener("mousemove", drawPen);
        drawingData.push([{ type: "pen", stroke: "", width: 0, data: [] }]);
    }
}

// handle mosue up 
function handleMouseUp() {
    // drawing with pen
    if (selectedFeature.pen) {
        canvas.removeEventListener("mousemove", drawPen)
        pre = [null, null]
    }
}

// handle key down
function handleKeyDown() {
    // when use click on CTRL + Z to undo 
    if (event.ctrlKey && event.key === "z" && drawingData.length > 0) {
        event.preventDefault();
        redoElementData.push(drawingData[drawingData.length - 1]); // add last element
        drawingData.pop();//remove last element
        clearScreen()
        drawData();
    }

    // when use click on CTRL + Y to redo 
    if (event.ctrlKey && event.key === "y" && redoElementData.length > 0) {
        event.preventDefault();
        drawingData.push(redoElementData[redoElementData.length - 1]); // add last element
        redoElementData.pop(); // remove last element
        clearScreen();
        drawData();
    }
}

// handle paste event 
function handlePaste() {
    let url = getImageUrlClipboard()
    let img = new Image();
    img.src = url;
    img.onload = () => {
        ctx.drawImage(img, 10, 10);
    }
}

// listen mouse down 
canvas.addEventListener("mousedown", handleMouseDown)

// listen mouse up 
canvas.addEventListener("mouseup", handleMouseUp);

// linsten mouse movement 
canvas.addEventListener("mousemove", handleMoveMouse);

// key down on screen
document.addEventListener("keydown", handleKeyDown)


// paste anything in canvas
document.addEventListener('paste', handlePaste);

