const express = require('express');
const path = require("path")
const router = express.Router();
const imagesDB = require("../models/imagesDB");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

// image uplaod paths
const ImageDirecory = "/private/images";

// uplaod files and render image
router.get('/', async (req, res) => {
        return res.render('uplaodimages', { pagename: "upload", title: "Hello World!" });
});

// upload images path 
router.post('/upload', async (req, res) => {
    // get file 
    let sampleFile = req.files.file;
    // uniq id 
    let uniqId = uuidv4();
    let newFileName = uniqId + sampleFile.name;
    // upload path
    let uploadPath = path.join(process.cwd(), ImageDirecory, newFileName);

    // check your directory exist 
    let fullUplaodPath = path.join(process.cwd(), ImageDirecory);
    if (!fs.existsSync(fullUplaodPath)) {
        // If not, create the directory
        fs.mkdirSync(fullUplaodPath);
    }

    // add image in folder 
    sampleFile.mv(uploadPath, function (err) {
        if (err)
            // if image not uploadsend error
            return res.status(500).send(err);

        // when image uplaod send response 
        imagesDB.create({ path: '/images/' + uniqId + sampleFile.name })
        return res.json({ uplaod: true, msg: 'File uploaded!', url: '/images/' + uniqId + sampleFile.name });
    });
});

// get all images from db 
router.get('/show-all-images', async (req, res) => {
    let data = {}
    data = await imagesDB.find({}, "path -_id");
    res.render('showallimages', { pagename: "Show all images", data: JSON.parse(JSON.stringify(data)) });
});

// show images with desgin
router.get('/images/:img', (req, res) => {
    try {
        const imgPath = req.params.img;
        const referrer = req.get('Referer');
        const secFetchUser = req.get("sec-fetch-user");
        if (!referrer || secFetchUser) {
            return res.render('imageview', { pagename: "image views", filename: imgPath, alt: imgPath });
        }
        else {
            return res.sendFile(path.join(process.cwd(), "/private/images/" + imgPath))
        }
    } catch (error) {
        return res.sendStatus("404").send("Page Not Found")
    }
});


// Export the router
module.exports = router;