var Reflux = require('reflux');

var AddNewBookActions = Reflux.createActions([
    'searchBooks',
    'addBook',
    'setToken',
]);

module.exports = AddNewBookActions;