var Reflux = require('reflux');
var reqwest = require('reqwest');
var StackListActions = require('../actions/StackListActions');

var StackListStore = Reflux.createStore({
    listenables: [StackListActions],
    state: {
        stackList: [],
        token: '',
    },
    sourceUrl: '/api/stack/',
    onSetToken: function(token){
        this.trigger({token: token});
    },
    onLoadStackList: function() {
        var context = this;
        reqwest({
            url: this.sourceUrl,
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp){
            console.log('fetch complete');
            context.trigger({stackList: resp});
        }).fail(function(err, msg){
            console.error(context.sourceUrl, status, err.toString());
        });
    }
});

module.exports = StackListStore;