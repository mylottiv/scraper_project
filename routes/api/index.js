const router = require('express').Router();
const apiController = require('../../controllers/apiController')

router.get('/articles', apiController.getAllArticles);

router.put('/scrape', apiController.scrapeNewArticles);

router.get('/articles/:id', apiController.getOneArticle);

router.get('/articles/saved', apiController.getSavedArticles);

router.patch('/articles/:id', apiController.saveArticle);

router.patch('/articles/:id/comments/add', apiController.addComment)

router.patch('/articles/:id/comments/delete', apiController.deleteComment)

module.exports = router;