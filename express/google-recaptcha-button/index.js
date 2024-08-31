import dotenv from 'dotenv';
import express, { json } from 'express';
import path from 'path';
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({}))
app.use(express.static(path.join(process.cwd(), "public")))

const CaptchaSecret = process.env.RECAPTCHA_SECRATE;

app.get("/", (req, res) => {
    res.send("server is healthy.....")
})

app.post("/submit", async (req, res) => {
    let { name, email, message, token } = (req.body)
    if (!token) return res.json({ submit: false });

    // check token valid or not 
    let valid = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            secret: CaptchaSecret,
            response: token
        })
    });

    valid = await valid.json()

    // if token valid
    if (valid.success) {
        // If the token is valid, proceed with your logic (e.g., store values in the database)
        return res.json({ submit: true })
    }

    // if token not valid
    return res.json({ submit: false })

})


app.listen(PORT, (err) => {
    err && console.log(err);
    console.log("server running on port http://localhost:" + PORT);
});