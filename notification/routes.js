const nodemailer = require('nodemailer');
const express = require("express");

const router = express();

router.post("/checkDomain", function(req,res){
  if(req.body.data.user.profile.email.includes("@halliburton.com")){
    res.status(200).json({
      "commands":[
           {
              "type":"com.okta.action.update",
              "value":{
                 "registration":"DENY"
              }
           }
        ]
     });
  }
  else{
    res.status(200).json({
      "commands":[
           {
              "type":"com.okta.action.update",
              "value":{
                 "registration":"ALLOW"
              }
           }
        ]
     });
  }
});

router.post("/notify", function (req, res) {
    console.log(req.body.data.user);
	  data= req.body.data.user.profile;
//Send deny command to Okta registration hook
    res.status(200).json({
    	   "commands":[
    		      {
    		         "type":"com.okta.action.update",
    		         "value":{
    		            "registration":"DENY"
    		         }
    		      }
    		   ]
    		});

    const formdata = `<!DOCTYPE html>
    <html>
      <head>
        <title>Account registration form</title>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600' rel='stylesheet' type='text/css'>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
        <style>
          html, body {
          min-height: 100%;
          }
          body, div, form, input, select, p { 
          padding: 0;
          margin: 0;
          outline: none;
          font-family: Roboto, Arial, sans-serif;
          font-size: 14px;
          color: #666;
          }
          h1 {
          margin: 0;
          font-weight: 400;
          }
          h3 {
          margin: 12px 0;
          color: #FF0000;
          }
          .main-block {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #fff;
          }
          form {
          width: 100%;
          padding: 20px;
          }
          fieldset {
          border: none;
          border-top: 1px solid #8ebf42;
          }
          .account-details, .personal-details {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          }
          .account-details >div, .personal-details >div >div {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          }
          .account-details >div, .personal-details >div, input, label {
          width: 100%;
          }
          label {
          padding: 0 5px;
          text-align: right;
          vertical-align: middle;
          }
          input {
          padding: 5px;
          vertical-align: middle;
          }
          .checkbox {
          margin-bottom: 10px;
          }
          select, .children, .gender, .bdate-block {
          width: calc(100% + 26px);
          padding: 5px 0;
          }
          select {
          background: transparent;
          }
          .gender input {
          width: auto;
          } 
          .gender label {
          padding: 0 5px 0 0;
          } 
          .bdate-block {
          display: flex;
          justify-content: space-between;
          }
          .birthdate select.day {
          width: 35px;
          }
          .birthdate select.mounth {
          width: calc(100% - 94px);
          }
          .birthdate input {
          width: 38px;
          vertical-align: unset;
          }
          .checkbox input, .children input {
          width: auto;
          margin: -2px 10px 0 0;
          }
          .checkbox a {
          color: #8ebf42;
          }
          .checkbox a:hover {
          color: #82b534;
          }
          button {
          width: 100%;
          padding: 10px 0;
          margin: 10px auto;
          border-radius: 5px; 
          border: none;
          background: #FF0000; 
          font-size: 14px;
          font-weight: 600;
          color: #FFFFFF;
          }
          button:hover {
          background: #82b534;
          }
          @media (min-width: 568px) {
          .account-details >div, .personal-details >div {
          width: 50%;
          }
          label {
          width: 40%;
          }
          input {
          width: 60%;
          }
          select, .children, .gender, .bdate-block {
          width: calc(60% + 16px);
          }
          }
        </style>
      </head>
      <body>
        <div class="main-block">
        <form action="http://localhost:3000/okta/createUser" method="post">
          <h1>New User account creation</h1>
          <fieldset>
            <legend>
              <h3>Account Details</h3>
            </legend>
            <div  class="account-details">
              <div><label>Email*</label><input type="text" name="email" value="${req.body.data.user.profile.email}" required></div>
              <div><label>Login*</label><input type="text" name="login" value="${req.body.data.user.profile.login}" required></div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h3>Personal Details</h3>
            </legend>
            <div  class="personal-details">
              <div>
                <div><label>First Name*</label><input type="text" name="firstName" value="${req.body.data.user.profile.firstName}" required></div>
                <div><label>Last Name*</label><input type="text" name="lastName" value="${req.body.data.user.profile.lastName}" required></div>
                <div><label>Mobile Phone*</label><input type="text" name="mobilePhone" value="${req.body.data.user.profile.mobilePhone}" required></div>
              </div>
          </fieldset>
          <button type="submit">Approve</button>
        </form>
        </div> 
      </body>
    </html>`;
    
    

    

    let transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'oktatestingactivity@gmail.com',
            pass: 'Password@123'
        }
    });


    let mailOptions = {
        from: 'noreply.halliburton.com',
        to: 's.ghosh3671@gmail.com',
        subject: `New User Request - ${req.body.data.user.profile.firstName} ${req.body.data.user.profile.lastName}`,
        text: 'None',
        html: formdata
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error);
        }
        console.log("Message Sent");
    });
  });

module.exports = router;


