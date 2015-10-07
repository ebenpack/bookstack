var Reflux = require('reflux');
var AppActions = require('../actions/AppActions.js');

var AppStore = Reflux.createStore({
    listenables: [AppActions],
    stackList: [],
    stackDetail: {},

    init: function() {
        this.viewStackList();
    },

    viewStackList: function() {},
    viewStackDetail: function() {}
});

module.exports = AppStore;