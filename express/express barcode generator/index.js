const bwipjs = require('bwip-js');
const fs = require('fs');
const express = require('express');

const app = express();

// Function to generate barcode and save as PNG
function generateAndSaveBarcode(text, filename, callback) {
    const options = {
        bcid: 'code128',
        text,
        scale: 4,
        height: 10,
        // includetext: true,
        textxalign: 'center',
    };

    bwipjs.toBuffer(options, (err, png) => {
        if (err) {
            return callback(err);
        }

        // Save the PNG buffer to a file
        fs.writeFile(filename, png, 'binary', (err) => {
            if (err) {
                return callback(err, null);
            }

            const imageData = fs.readFileSync(filename);

            // Convert the image data to base64
            const base64Data = imageData.toString('base64');

            // Generate a data URL
            const base64Url = `data:image/png;base64,${base64Data}`;

            callback(null, base64Url);
        });
    });
}

const outputFilename = 'barcode.png';

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});

app.get('/:text', (req, res) => {
    // Example usage
    const textToEncode = req.params.text;

    generateAndSaveBarcode(textToEncode, outputFilename, (err, base64) => {
        if (err) {
            console.error('Error:', err);
        } else {
            res.send(base64);
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
