var React = require('react');

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var StackDetail = require('../components/StackDetail.jsx');
var StackStoreConstants = require('../constants/StackStoreConstants.js');

// Internal object of shoes
var _stack = {
    data: []
};

// Method to load shoes from action data
function loadStack(data) {
    _stack = {
        data: data
    };
}

// Merge our store with Node's Event Emitter
var StackDetailStore = assign({}, EventEmitter.prototype, {

    // Returns all shoes
    getStack: function() {
        return _stack;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
    var action = payload.action;
    var text;
    // Define what to do for certain actions
    switch (action.actionType) {
        case StackStoreConstants.LOAD_STACK_DETAIL:
            // Call internal method based upon dispatched action
            loadStack(action.data);
            React.render(<StackDetail staticPath={MyApp.staticPath} />, MyApp.mountPoint);
            StackDetailActions.loadStack();
            break;

        default:
            return true;
    }

    // If action was acted upon, emit change event
    StackDetailStore.emitChange();

    return true;

});

module.exports = StackDetailStore;