var Reflux = require('reflux');
var AppActions = require('../actions/AppActions.js');
var StackDetailActions = require('../actions/StackDetailActions');
var StackListActions = require('../actions/StackListActions');

var reqwest = require('reqwest');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    token: '',
    loginUrl: '/api-token-auth/',

    init: function() {
        this.viewStackList();
    },
    onLogin: function(user, pass) {
        var context = this;
        reqwest({
            url: this.loginUrl,
            data: JSON.stringify({
                username: user,
                password: pass,
            }),
            method: 'POST',
            type: 'json',
            contentType: 'application/json'
        }).then(function(resp){
            context.trigger(resp);
            StackDetailActions.setToken(resp.token)
            StackListActions.setToken(resp.token)
        }).fail(function(err, msg){
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },

    viewStackList: function() {},
    viewStackDetail: function() {}
});

module.exports = AppStore;