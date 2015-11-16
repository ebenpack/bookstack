var Reflux = require('reflux');

var BookSearchActions = Reflux.createActions([
    'searchBooks',
    'addBook',
    'setToken',
]);

module.exports = BookSearchActions;