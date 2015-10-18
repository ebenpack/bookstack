var Reflux = require('reflux');
var reqwest = require('reqwest');

var PublisherDetailActions = require('../actions/PublisherDetailActions');

var PublisherDetailStore = Reflux.createStore({
    listenables: [PublisherDetailActions],
    state: {
        publisher: {}
    },
    publisherUrl: '/api/publisher/{id}/',
    onLoadPublisher: function(id) {
        var context = this;
        reqwest({
            url: this.publisherUrl.replace('{id}', id),
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp) {
            console.log('fetch complete');
            context.state.publisher = resp;
            context.trigger(context.state);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, status, err.toString());
        });
    }
});

module.exports = PublisherDetailStore;