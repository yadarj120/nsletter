const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
require("dotenv").config();


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", (req, res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.secondName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/632fbff343"
    const options = {
        method: "POST",
        auth: `${process.env.API_ID}:${process.env.API_KEY}`
    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    });

    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started on port 3000");
})
