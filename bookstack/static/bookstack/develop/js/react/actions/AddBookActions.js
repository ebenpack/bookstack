var Reflux = require('reflux');

var AddBookActions = Reflux.createActions([
    'searchBooks',
    'selectBook',
    'addBook',
    'setToken',
]);

module.exports = AddBookActions;