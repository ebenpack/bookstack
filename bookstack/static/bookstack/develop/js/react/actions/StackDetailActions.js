var Reflux = require('reflux');

var StackDetailActions = Reflux.createActions([
    'loadStack',
    'viewStackDetail',
    'updateRead',
    'removeBook',
    'addBook',
    'updateCategories',
    'autoSuggestCategories',
    'setReadState',
    'setToken',
    'setPosition',
]);

module.exports = StackDetailActions;