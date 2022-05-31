//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FIRSTNAME: firstName,
                    LASTNAME: lastName
                }
            }
        ]
    };
    var jsonDATA = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/e20f8d155c/";
    const options = {
        method: "POST",
        auth: "mehak:e7861d47efab2de7acb9b043b9af9e56-us17"
    }
//Replace <Any_String> with any string of your choice (your name/username example: auth: "pranshukas:us1-XXXXXXXXXXXXX"

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/sucess.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        // response.on("data", function (data) {
        //     console.log(JSON.parse(data));
        // })
    });

    request.write(jsonDATA);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log("Server is Running on port 3000");
});


//api key
//e7861d47efab2de7acb9b043b9af9e56-us17
//e20f8d155c.
//audience id

