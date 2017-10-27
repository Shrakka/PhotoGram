'use strict';
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');

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

exports.postPhoto = function(req, res) {
    var photo = new Photo(req.body);
    photo.save((err, photo) => {
        if(err) {
            res.send(err);
        } else {
            res.send(photo);
        }
    });
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