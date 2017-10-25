module.exports = {
    readExif: function(url) {
        var Path = require('path')
        var ExifImage = require('exif').ExifImage;
        var url = Path.join(__dirname, "../../public/photos", url);
        try {
            new ExifImage({image: url}, (error, exifData) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(exifData)
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}


