const express = require('express');
const multer  = require('multer');
const uuidv4 = require('uuid/v4');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const pdfStorage = multer.diskStorage({
    destination: './uploads/pdf/',
    filename: function (req, file, cb) {
        cb(null, uuidv4() + ".pdf");
    }
});

const upload = multer({ storage: storage });

const pdfUpload = multer({
    storage: pdfStorage,
    fileFilter: function fileFilter(req, file, cb) {
        file.originalname.toUpperCase().endsWith(".PDF") ? cb(null, true) : cb(null, false);
    }
});

const app = express();

app.post('/upload', upload.single('file'), (req, res, next) => {
  res.json({ succeed: true });
});

app.post('/pdf', pdfUpload.array('files', 3), (req, res, next) => {
    let files = req.files;
    res.json({files: files.map((file) => file = file.filename)});
});

app.use(express.static('public'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));