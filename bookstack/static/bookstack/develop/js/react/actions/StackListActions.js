var Reflux = require('reflux');

var StackListActions = Reflux.createActions([
    'loadStackList',
    'unloadStackList',
    'setToken',
]);

module.exports = StackListActions;