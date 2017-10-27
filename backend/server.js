var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    app = express(),
    port = process.env.PORT || 8200;

var photoDB = require('./api/config/database.js');
mongoose.connect(photoDB.url, photoDB.option);

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CROSS ORIGIN CALLS
var cors = require('cors')
app.use(cors({ origin: true , credentials :  true}))

// STATIC SERVE
var dir = path.join(__dirname, '/public');
app.use('/public', express.static(dir));

// ROUTES AND MODELS 
require('./api/models/photoModel');
require('./api/routes/photoRoutes.js')(app); 


app.listen(port);

console.log('API on port: ' + port);