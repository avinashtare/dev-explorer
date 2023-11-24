let encryptionData = [["a", "r"], ["b", "p"], ["c", "x"], ["d", "q"], ["e", "z"], ["f", "a"], ["g", "y"], ["h", "m"], ["i", "n"], ["j", "o"], ["k", "s"], ["l", "t"], ["m", "b"], ["n", "c"], ["o", "e"], ["p", "h"], ["q", "g"], ["r", "i"], ["s", "k"], ["t", "l"], ["u", "u"], ["v", "f"], ["w", "j"], ["x", "d"], ["y", "v"], ["z", "w"], [" ", "-"],["@", "-"]]


let text = "Hello World";

function encryption(text) {
    text = text.toLowerCase();
    let encodeText = "";
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < encryptionData.length; j++) {
            if (String(text[i]) == String(encryptionData[j][0])) {
                encodeText += String(encryptionData[j][1])
            }
        }

    }
    return encodeText;
}
function decryption(text) {
    text = text.toLowerCase();
    let decodeText = "";
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < encryptionData.length; j++) {
            if (String(text[i]) == String(encryptionData[j][1])) {
                decodeText += String(encryptionData[j][0])
            }
        }

    }
    return decodeText;
}

let s = document.getElementById("s")
let d = document.getElementById("d")
let encodeout = document.getElementById("encodeout")
let decodeout = document.getElementById("decodeout")

s.addEventListener("input",()=>{
    let encodeText = encryption(s.value)
    encodeout.innerText = encodeText;
})

d.addEventListener("keyup",()=>{
    let decodeText = decryption(d.value)
    decodeout.innerText = decodeText;
})