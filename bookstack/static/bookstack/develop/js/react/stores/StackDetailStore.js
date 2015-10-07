var Reflux = require('reflux');
var reqwest = require('reqwest');
var StackDetailActions = require('../actions/StackDetailActions.js');

var StackDetailStore = Reflux.createStore({
    listenables: [StackDetailActions],
    state: {
        error: false,
        loading: false,
        stackDetail: {},
    },
    sourceUrl: '/api/stack/',
    setLoadingState: function(state){
        this.trigger({loading: state});
    },
    viewStack: function(id){
        return this.state.stackDetail;
    },
    unloadStack: function(){
        this.trigger({stackDetail: {}});
    },
    fetchStack: function(id) {
        var context = this;
        context.trigger({
            loading: true,
        });
        reqwest({
            url: this.sourceUrl + id,
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp){
            console.log('fetch complete');
            context.trigger({
                loading: false,
                stackDetail: resp,
            });
        }).fail(function(err, msg){
            context.trigger({
                loading: false,
                error: true,
            });
            console.error(context.sourceUrl, err.toString(), msg);
        });
    }
});

module.exports = StackDetailStore;