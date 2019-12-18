const Article = require('../models/article');
const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNews(cb) {
    try {
        let raw = await axios.get('http://www.nintendolife.com/news')
        if (raw.status === 200) {
            const $ = cheerio.load(raw.data);
            let tempArticles = []
            $('#listing- > div > ul > li[data-type="article"]').each(function(i) {
                if (i <= 50) {
                    let item = $(this).find('.item-wrap')
                    let newArticle = {
                        image: item.find('img').attr('src'),
                        title: item.find('a .title').text(),
                        link: item.find('.title, .accent-hover, a').attr('href'),
                        description: item.find('.description').text(),
                        content: item.find('.text').text()
                    };
                    tempArticles.push(newArticle);
                }
                else return false;
            });
            tempArticles = await Promise.all(tempArticles.map( async article => {
                let test = await Article.findOne(article);
                if (test !== null) {
                    return Article.create(article);
                }
                else {
                    return console.log('Article already in DB');
                }
            }));
            let confirm = await Promise.all(tempArticles);
            let results = await Article.find();
            cb(results);
        } else console.log('Status not 200');
    } catch(err) {
        console.log('Error', err);
    }
}

module.exports = {

    getAllArticles: (req, res) => {
        Article.find({})
        .then(items => res.json(items))
        .catch(err => console.log(err));
    },

    scrapeNewArticles: (req, res) => {
        console.log('here')
        scrapeNews(articles => res.json(articles))
    },

    getOneArticle: (req, res) => {
        Article.findById(req.params.id)
        .then(article => res.json(article))
        .catch(err => console.log(err));
    },

    getSavedArticles: (req, res) => {
        Article.find({ saved: true })
        .then(results => res.json(results))
        .catch(err => console.log(err));
    },

    saveArticle: (req, res) => {
        let id = req.params.id;
        Article.findByIdAndUpdate(id, {saved: true})
        .then(result => res.json(result))
        .catch(err => console.log(err));
    },

    addComment: (req, res) => {
        let id = req.params.id;
        let newComment = req.body.comment;
        console.log(newComment)
        Article.findById(id)
        .then(article => {
            console.log(article);
            article.comments.push(newComment);
            article.save().then((result) => res.json(result))
        })
        .catch(err => console.log(err));
    },

    deleteComment: (req, res) => {
        let id = req.params.id;
        let {comment} = req.body;
        Article.findById(id)
        .then(article => {
            console.log(article);
            article.comments = article.comments.filter(elem => elem !== comment);
            article.save().then((result) => res.json(result));
        }).catch(err => console.log(err));
    }
}