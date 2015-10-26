var Reflux = require('reflux');
var reqwest = require('reqwest');
var StackDetailActions = require('../actions/StackDetailActions');

var StackDetailStore = Reflux.createStore({
    listenables: [StackDetailActions],
    state: {
        error: false,
        loading: false,
        stackDetail: {},
        token: '',
    },
    stackUrl: '/api/stack/',
    booksetUrl: '/api/bookset/',
    updatePositionUrl: '/api/bookset/{id}/renumber/',
    onSetToken: function(token) {
        this.state.token = token;
        this.trigger({
            token: this.state.token
        });
    },
    setLoadingState: function(state) {
        this.state.loading = state;
        this.trigger({
            loading: state
        });
    },
    updateReadStatus: function(book) {
        for (var i = 0, len = this.state.stackDetail.books.length; i < len; i++) {
            var currentBook = this.state.stackDetail.books[i];
            if (currentBook.id === book.id) {
                currentBook.read = book.read;
                this.trigger({
                    stackDetail: this.state.stackDetail,
                });
                break;
            }
        }
    },
    sortBooks: function() {
        // Sort books based on their position property
        this.state.stackDetail.books.sort(function(book1, book2) {
            return book1.position - book2.position;
        });
    },
    reorder: function(fromPosition, toPosition) {
        var start = Math.min(fromPosition, toPosition);
        var end = Math.max(fromPosition, toPosition);
        var direction = fromPosition < toPosition ? -1 : 1;
        this.sortBooks();
        for (var i = start; i <= end; i++) {
            var book = this.state.stackDetail.books[i - 1];
            if (i === fromPosition) {
                book.position = toPosition;
            } else {
                book.position += direction;
            }
        }
        this.sortBooks();
        this.trigger({
            stackDetail: this.state.stackDetail,
        });
    },
    removeBook: function(id){
        var books = this.state.stackDetail.books;
        this.state.stackDetail.books = books.filter(function(book){
            return book.id !== id;
        });
        this.trigger({
            stackDetail: this.state.stackDetail
        });
        var foo = 'foobarbaz';
    },
    onSetPosition: function(id, fromPosition, toPosition) {
        var context = this;
        if (toPosition > 0 &&
            this.state.stackDetail.books &&
            toPosition <= this.state.stackDetail.books.length) {
            reqwest({
                url: this.updatePositionUrl.replace('{id}', id),
                data: JSON.stringify({
                    position: toPosition,
                }),
                headers: {
                    'Authorization': 'Token ' + this.state.token,
                },
                method: 'PATCH',
                type: 'json',
                contentType: 'application/json'
            }).then(function(resp) {
                context.reorder(fromPosition, toPosition);
            }).fail(function(err, msg) {
                console.error(context.sourceUrl, err.toString(), msg);
            });
        }
    },
    onSetReadState: function(bookId, readState) {
        var context = this;
        reqwest({
            url: this.booksetUrl + bookId + '/',
            data: JSON.stringify({
                read: readState,
            }),
            headers: {
                'Authorization': 'Token ' + this.state.token,
            },
            method: 'PATCH',
            type: 'json',
            contentType: 'application/json'
        }).then(function(resp) {
            context.updateReadStatus(resp);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
    onRemoveBook: function(id){
        var context = this;
        reqwest({
            url: this.booksetUrl + id + '/',
            contentType: 'application/json',
            type: 'json',
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + this.state.token,
            },
        }).then(function(resp) {
            console.log('fetch complete');
            context.removeBook(id);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
    onLoadStack: function(id) {
        var context = this;
        if (this.state.stackDetail.id !== parseInt(id, 10)) {
            context.trigger({
                loading: true,
            });
            reqwest({
                url: this.stackUrl + id + '/',
                contentType: 'application/json',
                type: 'json',
            }).then(function(resp) {
                console.log('fetch complete');
                context.state.loading = false;
                context.state.stackDetail = resp;
                context.trigger({
                    loading: false,
                    stackDetail: resp,
                });
            }).fail(function(err, msg) {
                context.state.loading = false;
                context.state.error = true;
                context.trigger({
                    loading: false,
                    error: true,
                });
                console.error(context.sourceUrl, err.toString(), msg);
            });
        } else {
            this.trigger({
                loading: false,
                stackDetail: this.state.stackDetail,
            });
        }
    }
});

module.exports = StackDetailStore;