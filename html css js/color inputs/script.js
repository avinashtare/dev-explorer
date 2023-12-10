let inputs = document.querySelectorAll("input")
let r = inputs[0]
let g = inputs[1]
let b = inputs[2]

function handleColorChange() {
    rVal = r.value;
    gVal = g.value;
    bVal = b.value;
    document.body.style.background = `rgb(${r.value},${g.value},${b.value})`;
}
inputs.forEach((e) => {
    e.addEventListener("keyup", handleColorChange)
    e.addEventListener("change", handleColorChange)
})
