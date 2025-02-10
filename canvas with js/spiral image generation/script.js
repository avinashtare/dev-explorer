const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.background = inputColor1.value;

const ctx = canvas.getContext('2d');

let angle = 0;
let angleInc = 0.01;
let maxRadius = canvas.height / 2 - 5;
let size = inputSize.value;
let radiusInc = size * 0.010;

// util funciton converts rgb into brightenss
function getBrightness(r, g, b) {
    return (r * 0.299 + g * 0.587 + b * 0.114); // Standard luminance formula
}

// draw spiral
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < maxRadius; i += radiusInc) {
        let x = canvas.width / 2 + Math.cos(angle) * i;
        let y = canvas.height / 2 + Math.sin(angle) * i;

        const { r, g, b } = img.get(x, y);

        // get radius of circle by rgb to brightness
        const radius = getBrightness(r, g, b) / 255 * size;
        // check rgb sprial wan't or not
        inputRGB.checked ? ctx.fillStyle = `rgb(${r},${g},${b})` : ctx.fillStyle = inputColor2.value;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        angle += angleInc;
    }
}

// laod image
let url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt77-iBH5BA58BfbuMREI-sJ1ZbEqTRc4Hg&s'
let img = new ImageLoader(url, canvas.width, canvas.height);
img.crossOrigin = "anonymous"

// laod initial image
img.load = function () {
    draw()
}

// cahnge spiral size
inputSize.addEventListener("change", () => {
    size = inputSize.value
    radiusInc = size * 0.010;
    draw()
})

// for rgb colours
inputRGB.addEventListener('change', draw)

// handle input images 
inputFile.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        // if (!file.type.startsWith("image/")) {
        //     alert("Please select an image file!");
        // }

        const reader = new FileReader();
        reader.onload = function (event) {
            img = new ImageLoader(event.target.result, canvas.width, canvas.height);
            img.crossOrigin = "anonymous"
            img.load = function () {
                draw()
            }
        };
        reader.readAsDataURL(file);
    }
});

// color handler
inputColor1.addEventListener('change', e => {
    canvas.style.background = inputColor1.value;
    draw()
})

inputColor2.addEventListener('change', e => {
    draw()
})

inputDownload.addEventListener('click', () => {
    let link = document.createElement('a')
    link.download = "spiral_art.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
})