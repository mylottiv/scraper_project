const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('../models/article');

async function scrapeNews(cb) {
    try {
        let raw = await axios.get('http://www.nintendolife.com/news')
        if (raw.status === 200) {
            const $ = cheerio.load(raw.data);
            const tempArticles = []
            $('#listing- > div > ul > li[data-type="article"]').each(function(i) {
                if (i <= 10) {
                    let item = $(this).find('.item-wrap')
                    let newArticle = {
                        image: item.find('img').attr('src'),
                        title: item.find('a .title').text(),
                        link: item.find('.title, .accent-hover, a').attr('href'),
                        description: item.find('.description').text(),
                        content: item.find('.text').text()
                    };
                    tempArticles.push(Article.create(newArticle));
                }
                else return false;
            });
            let confirm = await Promise.all(tempArticles);
            let results = await Article.find();
            cb(results);
        } else console.log('Status not 200');
    } catch(err) {
        console.log('Error', err);
    }
}

module.exports = {
    serveHome: (req, res) => {
        scrapeNews(article => res.render('home',{article}));
        
    },

    serveSaved: (req, res) => {
        Article.find({ saved: true })
        .then(article => res.render('saved', {article}))
        .catch(err => console.log(err));
    }

}