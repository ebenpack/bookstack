var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

AppDispatcher.handleLoadAction = function(action) {
    this.dispatch({
        source: 'LOAD_ACTION',
        action: action
    });
};
AppDispatcher.handleLoadDetailAction = function(action) {
    this.dispatch({
        source: 'LOAD_STACK_DETAIL',
        action: action
    });
};
AppDispatcher.handleUnloadAction = function(action) {
    this.dispatch({
        source: 'UNLOAD_ACTION',
        action: action
    });
};


module.exports = AppDispatcher;