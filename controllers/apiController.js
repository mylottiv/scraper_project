const Article = require('../models/article')

module.exports = {

    getAllArticles: (req, res) => {
        Article.find({})
        .then(items => res.json(items))
        .catch(err => console.log(err));
    },

    scrapeNewArticles: (req, res) => {
        console.log('dummy');
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