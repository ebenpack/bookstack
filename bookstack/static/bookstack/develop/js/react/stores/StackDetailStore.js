var Reflux = require('reflux');
var reqwest = require('reqwest');
var StackDetailActions = require('../actions/StackDetailActions');
var debounce = require('../util').debounce;

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
    booksetCategoryUrl: '/api/booksetcategory/',
    updatePositionUrl: '/api/bookset/{id}/renumber/',
    categorySearchUrl: '/api/category/?search={search}',
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
    getPosition: function(id) {
        var books = this.state.stackDetail.books;
        var len = books && books.length ?
            books.length :
            0;
        var position = -1;
        for (var i = 0; i < len; i++) {
            var current = books[i];
            if (current.id === id) {
                position = current.position;
                break;
            }
        }
        return position;
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
    removeBook: function(id) {
        var books = this.state.stackDetail.books;
        this.state.stackDetail.books = books.filter(function(book) {
            return book.id !== id;
        });
        this.trigger({
            stackDetail: this.state.stackDetail
        });
        var foo = 'foobarbaz';
    },
    removeCategory: function(bookstackId, categoryId) {
        this.state.stackDetail.books = this.state.stackDetail.books.map(function(book) {
            if (book.id === bookstackId) {
                book.categories = book.categories.filter(function(category) {
                    return category.id !== categoryId;
                });
            }
            return book;
        });
        this.trigger({
            stackDetail: this.state.stackDetail,
        });
    },
    addCategory: function(bookStackId, category) {
        this.state.stackDetail.books = this.state.stackDetail.books.map(function(book) {
            if (book.id === bookStackId) {
                book.categories.push(category);
            }
            return book;
        });
        this.trigger({
            stackDetail: this.state.stackDetail,
        });
    },
    onAddCategory: function(category) {
        var i, len;
        len = this.state.stackDetail.books.length;
        for (i = 0; i < len; i++) {
            var book = this.state.stackDetail.books[i];
            if (book.id === category.bookstack) {
                book.categories.push(category);
                break;
            }
        }
        this.trigger({
            stackDetail: this.state.stackDetail,
        });
    },
    onRemoveCategory: function(bookstackId, categoryId) {
        var context = this;
        reqwest({
            url: this.booksetCategoryUrl + categoryId + '/',
            headers: {
                'Authorization': 'Token ' + this.state.token,
            },
            method: 'DELETE',
            type: 'json',
            contentType: 'application/json'
        }).then(function() {
            context.removeCategory(bookstackId, categoryId);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
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
    onRemoveBook: function(id) {
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
            var fromPosition = context.getPosition(id);
            var toPosition = context.state.stackDetail.books.length;
            if (fromPosition >= 0) {
                context.reorder(fromPosition, toPosition);
                context.removeBook(id);
            }
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
    onAddBook: function(book) {
        this.state.stackDetail.books.push(book);
        this.trigger({
            stackDetail: this.state.stackDetail,
            editing: false,
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