let inputText = document.getElementById("input-area")
let outputText = document.getElementById("output-area")
let minifyBtn = document.getElementById("minify-btn")
let copyBtn = document.getElementById("copy-btn")



function minifyCSS(cssText) {
    // Remove comments
    cssText = cssText.replace(/\/\*[\s\S]*?\*\//g, "");

    // Remove newlines and extra whitespace
    cssText = cssText.replace(/\s+/g, " ").trim();

    return cssText;
}

function handleMinifyCSS(e) {
    e.preventDefault()
    let cssInput = inputText.value;
    let cssOutput = minifyCSS(cssInput)

    outputText.value = cssOutput;

}

// copy button handle 
function handleCopy(){
    navigator.clipboard.writeText(outputText.value)
}


minifyBtn.addEventListener("click", handleMinifyCSS)
copyBtn.addEventListener("click", handleCopy)