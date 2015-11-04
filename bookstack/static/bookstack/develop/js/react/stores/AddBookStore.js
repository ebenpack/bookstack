var Reflux = require('reflux');
var reqwest = require('reqwest');

var debounce = require('../util').debounce;

var AddBookActions = require('../actions/AddBookActions');
var StackDetailActions = require('../actions/StackDetailActions');

var AddBookStore = Reflux.createStore({
    listenables: [AddBookActions],
    state: {
        token: '',
    },
    selectBookUrl: '/api/book/{id}/',
    addBookUrl: '/api/bookset/',
    bookSearchUrl: '/api/book/?search={search}',
    onSetToken: function(token) {
        this.state.token = token;
        this.trigger({
            token: this.state.token
        });
    },
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
            url: this.selectBookUrl.replace('{id}', id),
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
    onAddBook: function(bookId, stackId){
        var context = this;
        reqwest({
            url: this.addBookUrl,
            contentType: 'application/json',
            type: 'json',
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + this.state.token,
            },
            data: JSON.stringify({
                bookId: bookId,
                categories: [],
                stack: stackId
            })
        }).then(function(resp) {
            console.log('fetch complete');
            StackDetailActions.addBook(resp);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, status, err.toString());
        });
    },
});

module.exports = AddBookStore;