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
        this.getCookieToken();
    },
    getCookieToken: function() {
        var cookies = document.cookie.split(';');
        for (var i = 0, len = cookies.length; i < len; i++) {
            var currentCookie = cookies[i].split('=');
            if (currentCookie[0] === 'token') {
                this.broadcastToken(currentCookie[1]);
                break;
            }
        }
    },
    setCookieToken: function(token) {
        var thirtyDays = 30 * 24 * 60 * 60 * 1000;
        document.cookie = 'token=' + token + ';path=/;expires=' + new Date(Date.now() + thirtyDays).toUTCString();
    },
    broadcastToken: function(token) {
        this.trigger({token: token});
        StackDetailActions.setToken(token);
        StackListActions.setToken(token);
    },
    onLogin: function(user, pass, save) {
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
            context.broadcastToken(resp.token);
            if (save) {
                context.setCookieToken(resp.token);
            }
        }).fail(function(err, msg){
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
});

module.exports = AppStore;