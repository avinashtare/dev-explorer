let box = document.querySelectorAll("#box");

box.forEach((box) => {

    let w = box.offsetWidth;
    let h = box.offsetHeight;

    let angle = 20;
    function engineer(e) {

        let x = -angle + ((e.offsetX) / w * angle * 2);
        let y = -angle + ((e.offsetY) / h * angle * 2);

        box.style.transform = ` rotateX(${y}deg) rotateY(${x}deg)`;
        console.log(`x: ${x}, y: ${y}`);
    }
    // rotateX(10deg) rotateY(-10deg);
    box.addEventListener("mousemove", engineer);
})