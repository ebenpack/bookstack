var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'viewStackList',
    'viewStackDetail',
    'login',
]);

module.exports = AppActions;