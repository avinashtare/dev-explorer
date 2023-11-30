let emailSec = document.getElementById("emailSec");
let floatText = document.getElementById("floatText");

emailSec.addEventListener("focus", () => {
  floatText.classList.add("active");
});
emailSec.addEventListener("blur", () => {
  if (emailSec.value == 0) {
    floatText.classList.remove("active");
  }
});