const app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

app.use(require('./routes'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
const db = mongoose.connection;

db.once('open', function() {
    console.log('Connected to MongoDB');
});

db.on('error', function(err){
    console.log(err);
});

app.listen(PORT, function() {
    console.log('fired');
});