const router = require('express').Router();
const Article = require('../../models/article')


router.get('/articles', (req, res) => {
    Article.find().then(items => res.json(items));
});

module.exports = router;