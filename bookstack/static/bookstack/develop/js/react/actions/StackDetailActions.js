var Reflux = require('reflux');

var StackDetailActions = Reflux.createActions({
    'loadStack': {asyncResult: true},
    'viewStackDetail': {},
});

module.exports = StackDetailActions;