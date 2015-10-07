var Reflux = require('reflux');
var reqwest = require('reqwest');
var StackListActions = require('../actions/StackListActions.js');

var StackListStore = Reflux.createStore({
    listenables: [StackListActions],
    stackList: [],
    sourceUrl: '/api/stack/',

    init: function() {
        this.fetchStacks();
    },
    viewStacks: function(){
        return this.stackList;
    },
    fetchStacks: function() {
        var context = this;
        reqwest({
            url: this.sourceUrl,
            contentType: 'application/json',
            type: 'json',
        }).then(function(resp){
            console.log('fetch complete');
            context.stackList = resp;
            context.trigger(context.stackList);
        }).fail(function(err, msg){
            console.error(context.sourceUrl, status, err.toString());
        });
    }
});

module.exports = StackListStore;