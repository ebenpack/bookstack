var Reflux = require('reflux');
var reqwest = require('reqwest');

var AuthorDetailActions = require('../actions/AuthorDetailActions');

var AuthorDetailStore = Reflux.createStore({
    listenables: [AuthorDetailActions],
    state: {
        author: {}
    },
    authorUrl: '/api/author/{id}/',
    onLoadAuthor: function(id) {
        var context = this;
        reqwest({
            url: this.authorUrl.replace('{id}', id),
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp) {
            console.log('fetch complete');
            context.state.author = resp;
            context.trigger(context.state);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, status, err.toString());
        });
    }
});

module.exports = AuthorDetailStore;