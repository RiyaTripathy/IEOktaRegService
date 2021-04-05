/*const express = require("express");
const logger = require("./middleware/logger");
const app = express();
const cors = require('cors')

//middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

//notification API
app.use('/createUser', require('./notification/routes'));


//Okta API
app.use('/okta', require('./okta/oktaroutes'));
app.use(cors(corsOptions));


var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

const express = require('express')
const upload = require('./upload')
const cors = require('cors')

const app = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}*/

const express = require('express')
//const upload = require('./upload')
const cors = require('cors')

const app = express()
//var config_data = require('./config/config.json')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

//app.post('/upload', upload)
app.use('/okta',require('./okta/oktaroutes'))
app.listen(3000, () => {
    console.log('Server started!')
})



