var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    multer     = require('multer');

var app  = express(),
    port = process.env.PORT || 8200;

// DATABASE
var dbconf = require('./api/config/database.js');
mongoose.connect(dbconf.url, dbconf.option);

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MULTER
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/photos')
    },
    // filename: function (req, file, cb) {
        
    //     cb(null, Date.now() + file.originalname)
    //   }
  });
app.use(multer({storage: storage}).single('photo'));

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