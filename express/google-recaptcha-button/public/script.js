const form = document.getElementById('myForm');

// store token global
let recaptchaToekn = null;

// when user click on button get toke (it's only accept fuction as keyworkd dose't allow arrow fuction)
function RecaptchaToken(token) {
    console.log("token change")
    // if user click on check and user valid recived token 
    recaptchaToekn = token;
}

// when use clikc on button but after sometime the captcha expired
function RecaptchaExpired(e) {
    // set value null after expire
    recaptchaToekn = null
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // add validation here
    if (!recaptchaToekn) return alert("slove recaptcha");
    let data = { name, email, message, token: recaptchaToekn };

    // reqeust
    let response = await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    response = await response.json();

    if (response.submit) {
        // add you logic
        alert("form submited");

        // reset captcha and null toekn
        grecaptcha.reset()
        recaptchaToekn = null
    }
});