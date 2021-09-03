var express = require('express');
var app = express();
var userController = require('../controllers/user-controller');
var csvController = require('../controllers/csv-controller');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//POST API to add new User
app.post('/newUser', async function (request, response) {
    console.log("request", request.body);
    let newUser = await userController.addUser(request.body);
    response.send(JSON.stringify({
        message: "user added successfully",
        newUser: newUser
    }))
})


const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "csv") {
        cb(null, true);
    } else {
        cb(new Error("Not a csv File!!"), false);
    }
};


const upload = multer({
    dest: '/public/files',
    fileFilter: multerFilter,
})

//POST api to accept csv file
app.post("/upload", upload.single("file"), async function (request, response) {

    let result = await csvController.sendEmail(request.file.path);
    console.log("req", request.file);

    response.send(JSON.stringify({
        message: "file uploaded successfully"
    }))
});

module.exports = app;