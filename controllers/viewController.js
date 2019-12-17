const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    serveHome: (req, res) => {
        const articleBank = [];
    
        axios.get('http://www.nintendolife.com/news')
        .then(response => {
            if (response.status === 200) {
                console.log('Success');
                const $ = cheerio.load(response.data);
                $('#listing- > div > ul > li').each(function(i, elem) {
                    if ($(this).attr('data-type') === 'article') {
                        let item = $(this).find('.item-wrap')
                        let newArticle = {
                            image: item.find('img').attr('src'),
                            title: item.find('a .title').text(),
                            link: item.find('.title, .accent-hover, a').attr('href'),
                            description: item.find('.description').text(),
                            content: item.find('.text').text(),
                            categories: item.find('.list').html()
                        };
                        articleBank.push(newArticle);
                    };
                });
                console.log(articleBank[0]);
                res.render('home', {article: articleBank.filter((elem, i) => (i < 10))});
            } else console.log('Error');
        })
        .catch(err => console.log(err));
    },

    serveSaved: (req, res) => {
        const articleBank = [];
    
        axios.get('http://www.nintendolife.com/news')
        .then(response => {
            if (response.status === 200) {
                console.log('Success');
                const $ = cheerio.load(response.data);
                $('#listing- > div > ul > li').each(function(i, elem) {
                    if ($(this).attr('data-type') === 'article') {
                        let item = $(this).find('.item-wrap')
                        let newArticle = {
                            image: item.find('img').attr('src'),
                            title: item.find('a .title').text(),
                            link: item.find('.title, .accent-hover, a').attr('href'),
                            description: item.find('.description').text(),
                            content: item.find('.text').text(),
                            categories: item.find('.list').html()
                        };
                        articleBank.push(newArticle);
                    };
                });
                console.log(articleBank[0]);
                res.render('saved', {article: articleBank.filter((elem, i) => (i < 10))});
            } else console.log('Error');
        })
        .catch(err => console.log(err));
    }
}