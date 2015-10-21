var Reflux = require('reflux');

var AddBookActions = Reflux.createActions([
    'searchBooks',
    'selectBook',
]);

module.exports = AddBookActions;