var Reflux = require('reflux');

var AppActions = Reflux.createActions([
    'login',
    'logoff',
    'getToken',
]);

module.exports = AppActions;