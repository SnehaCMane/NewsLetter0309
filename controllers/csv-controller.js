const fs = require("fs");
const csv = require('csv-parser');
var nodemailer = require('nodemailer');
const { User } = require("../models/user-model");
const { Log } = require("../models/logs-model");
let parking_lot_queue = [];

async function sendEmail(filePath) {

    //read data from csv file 
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async function (data) {
            try {
                console.log("Name is: " + data.Email);
                await email(data.Email, data.content, data.letterName);//send email
            }
            catch (err) {
                //error handler
            }
        })
        .on('end', function () {
            //some final operation
        });
}

async function email(userEmail, emailText, letterName) {
    try {
        //find username by emailId

        User.find({ "email": userEmail }, function (err, result) {
            if (result != null) {
                //user found
                emailText + ' ' + result.firstName + ' ' + result.lastName
            }
        })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });

        var mailOptions = {
            from: '',
            to: userEmail,
            subject: 'Sending Email using Node.js',
            text: emailText
        };

        transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);//add to parking_queue
                parking_lot_queue.push({
                    email: userEmail,
                    name: letterName,
                    text: emailText
                })

            } else {
                console.log('Email sent: ' + info.response);//email sent update log collection
                let logObj = new Log({
                    created_date: Date.now(),
                    email: userEmail,
                    letterName: letterName

                });
                let newObj = await logObj.save();
            }
        });
    } catch (error) {

    }
}

module.exports.sendEmail = sendEmail;