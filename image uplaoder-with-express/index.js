const express = require("express")
const app = express()

// config env 
require("dotenv").config()
const db = require("./db/connect")
const mainRoute = require("./routes/mainRoute")
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload');

// port
const PORT = process.env.PORT || 3000;

// file upload 
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
}));


// use json 
app.use(express.json());
// Router
app.use("/", mainRoute);

// public folder
// app.use(express.static('public'));

// express handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// start node init 
async function init() {
    // don't start website till database not connected 
    const isConnect = await db();
    if (isConnect) {
        app.listen(PORT, () => {
            console.log(`Server Running on PORT ${PORT}"`)
        })
    }
}

// start 
init()