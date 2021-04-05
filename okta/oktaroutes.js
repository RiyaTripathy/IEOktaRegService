var express = require("express");
var request = require("request");
var https = require('https');
const oktapost = express();
var config = require('../config/config.json');
const fs = require('fs')
const IncomingForm = require('formidable').IncomingForm;
var bodyParser = require('body-parser')
var filename = ""


// parse application/x-www-form-urlencoded
oktapost.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
oktapost.use(bodyParser.json());


oktapost.post("/createUser",function (req, res) {
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });

    firstName = req.body.profile['firstName'],
    lastName = req.body.profile['lastName'],
    email = req.body.profile['email'],
    login = req.body.profile['email']
    const newUser = {
    profile: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: login
    }
    }
    console.log(newUser);
    client.createUser(newUser)
    .then(user => res.send(true))
        .catch(err =>{
		console.log(err);
        res.send(false)}
    );
});

oktapost.post("/updateUser",function (req, res) {
    userName= req.query['q'];
    console.log(userName)
    var userid = ""
    console.log(req.body);
    var url=config.url;
    var apikey=config.token;
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
        firstName = req.body.profile['firstName'],
    lastName = req.body.profile['lastName']
    email = req.body.profile['email'],
    login = req.body.profile['email']
    const newUser = {
    profile: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        login: login
    }
    }
    console.log(newUser);

        client.listUsers({
            q: userName
        }).each(user => {
            userid = user['id']
           console.log("user id is" +userid)

    
    client.updateUser(userid,newUser)
    .then(user => res.send(true))
        .catch(err =>{
		console.log(err);
        res.send(false)}
    );
});
})

oktapost.post("/deleteUser",function (req, res) {
    
    userName= req.query['q'];
    console.log(userName)
	var url=config.url;
    var apikey=config.token;
    var userid = ""
    const okta = require('@okta/okta-sdk-nodejs');
        const client = new okta.Client({
            orgUrl: url,
            token: apikey
        });
        client.listUsers({
            q: userName
        }).each(user => {
            userid = user['id']
           console.log("user id is" +userid)
           user.deactivate()
           .then(() => console.log('User has been deactivated'))
           .then(() => user.delete())
           .then(() => console.log('User has been deleted'))
           .then(() =>res.send(true))
           .catch(err =>{
		    console.log(err);
            res.send(false)
    });
        });
    })

    oktapost.get("/listSecurityQnA",function (req, res) {
        var userid = '00uy8f984uJ3Fpw800h7'
        var url=config.url;
        var apikey=config.token;
        const okta = require('@okta/okta-sdk-nodejs');
            const client = new okta.Client({
                orgUrl: url,
                token: apikey
            });
            const QnAurl = 'https://dev-121295.oktapreview.com/api/v1/users/'+userid+'/factors/questions'
      console.log(QnAurl)
      const request = {
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
};

//function to retrieve okta security questions
client.http.http(QnAurl, request)
.then(res => res.text())
  .then(text => {
    //console.log(text);
    res.send(text)
  })
  .catch(err => {
    console.error(err);
  });  
});
    

module.exports = oktapost;