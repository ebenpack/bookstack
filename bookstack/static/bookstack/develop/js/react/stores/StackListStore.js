var React = require('react');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var StackList = require('../components/StackList.jsx');
var StackStoreConstants = require('../constants/StackStoreConstants.js');

// Internal object of shoes
var _stacks = {
    data: []
};

// Method to load shoes from action data
function loadStacks(data) {
    _stacks = {
        data: data
    };
}

function unloadStacks() {
    _stacks = {
        data: []
    };
}

// Merge our store with Node's Event Emitter
var StackListStore = assign({}, EventEmitter.prototype, {

    // Returns all shoes
    getStacks: function() {
        return _stacks;
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
        case StackStoreConstants.LOAD_STACKS:
            // Call internal method based upon dispatched action
            loadStacks(action.data);
            break;

        case StackStoreConstants.UNLOAD_STACKS:
            // Call internal method based upon dispatched action
            unloadStacks(action.data);
            break;

        default:
            return true;
    }

    // If action was acted upon, emit change event
    StackListStore.emitChange();

    return true;

});

module.exports = StackListStore;