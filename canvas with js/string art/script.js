const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.background = inputBackground.value;

const ctx = canvas.getContext('2d');

// Show loading modal
function showLoadingModal() {
    document.getElementById('loadingModal').style.visibility = 'visible';
}

// Hide loading modal
function hideLoadingModal() {
    document.getElementById('loadingModal').style.visibility = 'hidden';

}


// util funciton converts rgb into brightenss
function getBrightness(r, g, b) {
    return (r * 0.299 + g * 0.587 + b * 0.114); // Standard luminance formula
}

// laod image
let url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvt77-iBH5BA58BfbuMREI-sJ1ZbEqTRc4Hg&s'

let img = new ImageLoader(url, canvas.width, canvas.height);
img.crossOrigin = "anonymous"

// laod ini0tial image
img.load = function () {
    draw()
}


let circlePoints = [];

// draw strath light with arc
function drawLine(x1, y1, x2, y2, maxRadius) {
    const radius = maxRadius; // Set the radius for each arc to 1px

    // Calculate the difference in x and y
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Loop through the distance between the two points and draw an arc for each pixel
    for (let t = 0; t <= distance; t++) {
        // Calculate the intermediate point along the line
        const arcX = x1 + (dx * t) / distance;
        const arcY = y1 + (dy * t) / distance;


        // Draw arc at the intermediate point (1px for each segment)
        ctx.beginPath();
        ctx.arc(arcX, arcY, radius, 0, 2 * Math.PI, false);

        // rgb value 
        let { r, g, b } = img.get(Math.floor(arcX), Math.floor(arcY));
        if (showRGB.checked) {
            ctx.fillStyle = `rgb(${r},${g},${b})`;
        }
        else {
            // brighness 
            let c = getBrightness(r, g, b);
            ctx.fillStyle = `rgb(${c},${c},${c})`;
        }

        ctx.fill();
    }
}


function draw() {
    showLoadingModal();

    setTimeout(() => {
        // clear cavnas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        circlePoints = []

        // draw only circle
        let maxPoints = inputMaxPoint.value;
        let radius = canvas.width / 2;
        for (let i = 0; i <= maxPoints; i++) {
            let angle = Math.PI * i * (360 / maxPoints) / 180;
            let x = canvas.width / 2 + Math.cos(angle) * radius;
            let y = canvas.height / 2 + Math.sin(angle) * radius;

            circlePoints.push({ x, y });

            ctx.beginPath()
            ctx.fillStyle = `black`;
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
        }


        // draw lines
        let totalNumber = circlePoints.length * 0.1;
        for (let i = 0; i < circlePoints.length; i++) {
            for (let j = 0; j < totalNumber; j++) {
                let g = Math.floor(Math.random() * circlePoints.length - 1) + 1;

                if (i + 1 <= g && i - 1 != g && i + 2 <= g && i - 2 != g) {
                    drawLine(circlePoints[i].x, circlePoints[i].y, circlePoints[g].x, circlePoints[g].y, 1)
                }

            }
        }
        hideLoadingModal()
    }, 1)

}


inputMaxPoint.addEventListener('change', () => {
    maxPoints = inputMaxPoint.value;
    draw()
})

showRGB.addEventListener('change', draw)

inputBackground.addEventListener('blur', () => {
    canvas.style.background = inputBackground.value;
    draw()
});

// handle input images 
inputFile.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        if (!file.type.startsWith("image/")) {
            alert("Please select an image file!");
        }

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

downloadImage.addEventListener('click', () => {
    let link = document.createElement('a')
    link.download = "StringArt.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
})