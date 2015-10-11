var Reflux = require('reflux');

var StackDetailActions = Reflux.createActions([
    'loadStack',
    'viewStackDetail',
    'updateRead',
    'setReadState',
    'setToken',
    'setPosition',
]);

module.exports = StackDetailActions;