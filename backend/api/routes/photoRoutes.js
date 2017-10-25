'use strict';
module.exports = function(app) {
    var photoController = require('../controllers/photoController');

    app.route('/photo')
        .get(photoController.getPhotos)
        .post(photoController.postPhoto)

    app.route('/photo/:id')
        .get(photoController.getPhoto)
}