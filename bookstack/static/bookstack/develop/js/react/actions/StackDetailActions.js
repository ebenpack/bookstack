var Reflux = require('reflux');

var StackDetailActions = Reflux.createActions({
    'loadStack': {asyncResult: true},
    'viewStackDetail': {},
    'updateRead': {},
    'setReadState': {},
    'setToken': {},
});

module.exports = StackDetailActions;