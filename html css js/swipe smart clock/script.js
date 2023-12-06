let columns = document.querySelectorAll(".col");

function animateColumns(num) {
    columns.forEach((column, index) => {
        let currentColumn = column;
        currentColumn.style.transform = `translate(0, calc(-56px * ${num[index]}))`;
    });
}

let currentTimeString = "000";

function startClock() {
    let nowTime = new Date();
    let currentHour = nowTime.getHours();
    let currentMinute = nowTime.getMinutes();
    let currentSecond = nowTime.getSeconds();

    currentTimeString = String(currentHour * 10000 + currentMinute * 100 + currentSecond);

    if (String(currentHour).length > 0) {
        currentTimeString = String(0).concat(currentTimeString)
    }

    animateColumns(currentTimeString);

    // request frames 
    requestAnimationFrame(startClock)
}

startClock()