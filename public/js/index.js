$(document).ready(() => {
    $('.save-button').on('click', function(e) {
        e.preventDefault()
        $.patch(('/api/articles/' + this.attr(dbid))
        .then((response) => {
            console.log('Article saved', response);
        })
        .catch((err) => console.log(err));
    })
    $('#scrape-button').on('click', function(e) {
        e.preventDefault()
        $.put('/api/scrape')
        .then((response) => {
            console.log('newScrapes', response)
        })
        .catch((err) => console.log(err));
    })
    $('#clear-button').on('click', function(e) {
        e.preventDefault()
        $('#article-dump').empty();
    })
})