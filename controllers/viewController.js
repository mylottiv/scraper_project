const axios = require('axios');
const Article = require('../models/article');

module.exports = {
    serveHome: (req, res) => {
        axios.put('/api/scrape', {}, { baseURL: 'http://localhost:8080' })
        .then(result => {
            let articles = result.data;
            res.render('home',{articles})
        }).catch(err => console.log(err));
    },

    serveSaved: (req, res) => {
        Article.find({ saved: true })
        .then(articles => res.render('saved', {articles}))
        .catch(err => console.log(err));
    }

}