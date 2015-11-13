var Reflux = require('reflux');
var AppActions = require('../actions/AppActions.js');
var StackDetailActions = require('../actions/StackDetailActions');
var StackListActions = require('../actions/StackListActions');
var AddBookActions = require('../actions/AddBookActions');
var AddCategoryActions = require('../actions/AddCategoryActions');
var AddNewBookActions = require('../actions/AddNewBookActions');

var reqwest = require('reqwest');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    state: {
        token: ''
    },
    loginUrl: '/api-token-auth/',
    init: function() {
        this.getCookieToken();
        this.broadcastToken();
    },
    getCookieToken: function() {
        var cookies = document.cookie.split(';');
        for (var i = 0, len = cookies.length; i < len; i++) {
            var currentCookie = cookies[i].split('=');
            if (currentCookie[0].trim() === 'token') {
                this.state.token = currentCookie[1].trim();
                this.broadcastToken();
                break;
            }
        }
    },
    setCookieToken: function(token) {
        var thirtyDays = 30 * 24 * 60 * 60 * 1000;
        document.cookie = 'token=' + token + '; path=/; expires=' + new Date(Date.now() + thirtyDays).toUTCString();
    },
    clearCookieToken: function() {
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        this.state.token = '';
        this.broadcastToken();
    },
    broadcastToken: function() {
        var token = this.state.token;
        StackDetailActions.setToken(token);
        StackListActions.setToken(token);
        AddBookActions.setToken(token);
        AddNewBookActions.setToken(token);
        AddCategoryActions.setToken(token);
        this.trigger(this.state);
    },
    onGetToken: function() {
        this.broadcastToken();
    },
    onLogoff: function() {
        this.clearCookieToken();
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
        }).then(function(resp) {
            var token = resp.token;
            context.state.token = token;
            context.broadcastToken();
            if (save) {
                context.setCookieToken(token);
            }
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
});

module.exports = AppStore;