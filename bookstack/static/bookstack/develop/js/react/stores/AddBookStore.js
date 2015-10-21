var Reflux = require('reflux');
var reqwest = require('reqwest');

var debounce = require('../util').debounce;

var AddBookActions = require('../actions/AddBookActions');

var AddBookStore = Reflux.createStore({
    listenables: [AddBookActions],
    bookUrl: '/api/book/{id}',
    bookSearchUrl: '/api/book/?search={search}',
    onSearchBooks: debounce(function(search) {
        var context = this;
        reqwest({
            url: this.bookSearchUrl.replace('{search}', search),
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp) {
            console.log('fetch complete');
            context.trigger({
                booksAutocomplete: resp
            });
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, status, err.toString());
        });
    }, 250),
    onSelectBook: function(id){
        var context = this;
        reqwest({
            url: this.bookUrl.replace('{id}', id),
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp) {
            console.log('fetch complete');
            context.trigger({
                selectedBook: resp
            });
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, status, err.toString());
        });
    },
});

module.exports = AddBookStore;