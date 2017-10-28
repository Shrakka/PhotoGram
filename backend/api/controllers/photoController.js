'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var Photo = mongoose.model('Photo');

var upload = multer({ dest: '../../public/photos/' });

exports.getPhotos = function(req, res) {
    Photo.find({}, (err, photos) => {
        if(err) {
            res.send(err);
        } else {
            if(photos) {
                res.send(photos)
            } else {
                res.status(404).send('404. No photo found.');
            }
        }
    })
}

exports.getPhoto = function(req, res) {
    Photo.findOne({_id: req.params.id}, (err, photo) => {
        if(err) {
            res.status(404).send(err);
        } else {
            if(photo) {
                var exif = require('../exif/exif');
                exif.readExif(photo.url);
                res.send(photo)
            } else {
                res.status(404).send('404. Photo not found')
            }
        }
    });
}

exports.postPhoto = function(req, res) {
    var title, date, place, url;
    
    if(req.body) {
        title = req.body.title;
    } else {
        title = 'Default title';
    }

    if(req.file) {
        var exif = require('../exif/exif');
        url = req.file.filename;

        exif.readExif(req.file.filename)
            .then((data) => {
                console.log('Exif parse successfully\n', data);
                if(data) {
                    // FETCH CREATION DATE
                    if (data.exif) {
                        if(data.exif.CreateDate) {
                            var ConvertDateForMongoose = function(date) {
                                return Date.now();
                            }
                            date = ConvertDateForMongoose(data.exif.CreateDate);
                            console.log("DATE FOUND!");
                        } else {
                            date = Date.now();
                        }
                    } else {
                        date = Date.now();
                    }

                    // FETCH GPS COORDINATE
                    if (data.gps && Object.keys(data.gps).length > 0) {
                        var ConvertDMSToDD = function(ref, coor) {
                            return 42;
                        }

                        place = {
                            'lat': ConvertDMSToDD(data.gps.GPSLatitudeRef, data.gps.GPSLatitude),
                            'lng': ConvertDMSToDD(data.gps.GPSLongitudeRef, data.gps.GPSLongitudeRef),
                        }
                        console.log('GPS POSITION FOUND!');

                    } else {
                        place = {
                            'lat': 0,
                            'lng': 0
                        }
                    }
                } else {
                    date = Date.now()
                    place = {
                        'lat': 0,
                        'lng': 0
                    }
                }

                // SAVE PHOTO
                var photo = new Photo(
                    {
                        'title': title,
                        'date': date,
                        'place': place,
                        'url': url
                    }
                );
                photo.save((err, photo) => {
                    if(err) {
                        res.status('500').send(err);
                    } else {
                        console.log('Photo saved in DB and sent back', photo);
                        res.send(photo);
                    }
                });
            })

            // NO EXIF FOUND FOR THE IMAGE, OR ERROR HAPPEND
            .catch((error) => {
                console.log(error);
                var noExifPhoto = new Photo({
                    'title': title,
                    'date': Date.now(),
                    'place': {'lat': 0, 'lng': 0},
                    'url': url
                }).save((err, photo) => {
                    if(err) {
                        console.log(err);
                        res.status('500').send(err);
                    } else {
                        console.log('Photo sent');
                        res.send(photo);
                    }
                });
            })

    } else {
        res.status('500').send('No file uploaded');
    }
}
