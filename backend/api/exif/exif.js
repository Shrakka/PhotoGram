module.exports = {
    readExif: function(url) {
        var Path = require('path')
        var ExifImage = require('exif').ExifImage;
        var url = Path.join(__dirname, "../../public/photos", url);
        return new Promise(
            (resolve, reject) => {
                try {
                    new ExifImage({image: url}, (error, exifData) => {
                        if(error) {
                            reject(error);
                        } else {
                            resolve(exifData);
                        }
                    });
                } catch (error) {
                    reject(error);
                }
            }
        );
        
    }
}


