var Reflux = require('reflux');

var AddBookActions = Reflux.createActions([
    'searchBooks',
    'selectBook',
    'addBook',
    'addNewBook',
    'setToken',
]);

module.exports = AddBookActions;