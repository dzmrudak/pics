const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const app = express();
const picturesFolder = path.join(__dirname, 'img');

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/random-picture', (req, res) => {
    fs.readdir(picturesFolder, (err, files) => {
        if (err) {
            res.status(500).send('Error reading pictures folder');
            return;
        }

        const randomIndex = Math.floor(Math.random() * files.length);
        const randomPicture = files[randomIndex];
        const picturePath = path.join(picturesFolder, randomPicture);

        res.sendFile(picturePath);
    });
});

app.post('/picture', upload.none(), (req, res) => {
    const pictureName = req.body.pictureName;
    if (!pictureName) {
        res.status(400).send('Picture name is required');
        return;
    }
    res.sendFile(__dirname + '/img/' + pictureName);
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
