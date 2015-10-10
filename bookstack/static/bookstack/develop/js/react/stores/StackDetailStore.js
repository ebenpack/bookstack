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
    onLoadStack: function(id) {
        var context = this;
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
    }
});

module.exports = StackDetailStore;