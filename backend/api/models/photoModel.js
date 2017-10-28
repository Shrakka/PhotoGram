'use strict';
var moongoose = require('mongoose');
var Schema = moongoose.Schema;

var PhotoSchema = new Schema({
    title: {
        type: String,
        required: 'Please enter a title for this picture',
    },
    date: {
        type: Date,
        defaults: Date.now(),
    },
    place: Object,
    url: String
});

module.exports = moongoose.model('Photo', PhotoSchema);