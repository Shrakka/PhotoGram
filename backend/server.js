var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    photoDB = require('./api/config/database.js'),
    app = express(),
    port = process.env.PORT || 8200;


mongoose.connect(photoDB.url, photoDB.option);

//app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/models/photoModel');
require('./api/routes/photoRoutes.js')(app);


app.listen(port);

console.log('API on port: ' + port);