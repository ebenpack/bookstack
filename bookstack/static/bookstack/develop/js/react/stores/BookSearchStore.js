var Reflux = require('reflux');
var reqwest = require('reqwest');

var debounce = require('../util').debounce;

var BookSearchActions = require('../actions/BookSearchActions');

var BookSearchStore = Reflux.createStore({
    listenables: [BookSearchActions],
    state: {
        token: '',
    },
    googleBooksUrl: 'https://www.googleapis.com/books/v1/volumes?q={search}',
    onSetToken: function(token) {
        this.state.token = token;
        this.trigger({
            token: this.state.token
        });
    },
    onSearchBooks: debounce(function(search) {
        var context = this;
        reqwest({
            url: this.googleBooksUrl.replace('{search}', search),
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp) {
            var books = [];
            if (resp.totalItems) {
                books = resp.items.map(function(book){
                    return {
                        title: book.volumeInfo.title,
                        pages: book.volumeInfo.pageCount,
                        isbn: (book.volumeInfo.industryIdentifiers) ?
                            book.volumeInfo.industryIdentifiers.reduce(function(prev, ident){
                                if (ident.type === "ISBN_10"){
                                    return ident.identifier;
                                } else if (!prev && ident.type === "ISBN_13") {
                                    return ident.identifier;
                                } else {
                                    return prev;
                                }
                            }, '') :
                            undefined,
                        authors: book.volumeInfo.authors.map(function(author){
                            return {
                                name: author,
                            };
                        }),
                        img: (
                            book.volumeInfo.imageLinks &&
                            book.volumeInfo.imageLinks.smallThumbnail
                        ) ?
                            book.volumeInfo.imageLinks.smallThumbnail :
                            undefined,
                        publishers: (
                            Array.isArray(book.volumeInfo.publisher) ?
                                book.volumeInfo.publisher :
                                [book.volumeInfo.publisher]
                        ),
                    };
                });
            }
            context.trigger({
                books: books,
            });
        }).fail(function(err, msg) {
            console.log(err, msg);
        });
    }, 250),
});

module.exports = BookSearchStore;