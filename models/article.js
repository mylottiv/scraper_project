const mongoose = require('mongoose');

// Article Schema
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Article', articleSchema);