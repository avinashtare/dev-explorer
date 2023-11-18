const express = require('express');
const app = express();
const { getNewCaptcha, verifyCaptcha } = require('fast-captcha');
const jwt = require("jsonwebtoken");

// Secret key for JWT
const secretKey = "shuuuu....";

// Function to generate HTML response for the form
const ResponseHTML = (Captcha) => `
  <img src="${Captcha.imageData}">
  <br>
  <form action="/verify" method="GET">
    <input type="text" name="captcha-text"></input>
    <button>Verify</button>
  </form>
`;

// Route to handle the form generation
app.get('/form', function (req, res) {
  // Generate a new captcha
  let Captcha = getNewCaptcha();

  // Generate a unique JWT for the captcha id
  let uniqId = Captcha.id;
  uniqId = jwt.sign({ id: uniqId }, secretKey);

  // Set the JWT as a cookie
  res.cookie('captchaId', uniqId);

  // Send the HTML response with the captcha image
  res.send(ResponseHTML(Captcha));
});

// Route to handle captcha verification
app.get('/verify', function (req, res) {
  // Get user's answer from the query parameters
  let userAnswer = req.query["captcha-text"];

  // Get JWT token from the cookie
  let jwtToken = req.headers.cookie.split("=")[1];

  try {
    // Verify the JWT to get the captcha id
    let data = jwt.verify(jwtToken, secretKey);

    // Verify the captcha using fast-captcha library
    const isVerified = verifyCaptcha(data.id, userAnswer);

    // Respond based on captcha verification result
    if (isVerified) {
      res.send("GO TO Login page");
    } else {
      res.redirect("/form");
    }
  } catch (error) {
    // Redirect to the form if there is an error (invalid JWT, etc.)
    res.redirect("/form");
  }
});

// Start the Express app on port 3000
app.listen(3000, () => console.log("App running on port http://localhost:3000"));
