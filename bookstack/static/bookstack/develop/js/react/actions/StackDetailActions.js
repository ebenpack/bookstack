var Reflux = require('reflux');

var StackDetailActions = Reflux.createActions([
    'loadStack',
    'viewStackDetail',
    'updateRead',
    'setReadState',
    'setToken',
]);

module.exports = StackDetailActions;