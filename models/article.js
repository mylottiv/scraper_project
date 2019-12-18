const mongoose = require('mongoose');

// Article Schema
const articleSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    saved: {
        type: Boolean,
        default: false,
        require: true
    },
    comments: {
        type: [String],
        require: true,
    }
});

module.exports = mongoose.model('Article', articleSchema);