var AppDispatcher = require('../dispatcher/AppDispatcher');
var StackStoreConstants = require('../constants/StackStoreConstants.js');

var StackListActions = {
    loadStackList: function() {
        var url = '/api/stack/';
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                AppDispatcher.handleLoadAction({
                    actionType: StackStoreConstants.LOAD_STACKS,
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    unloadStackList: function() {
        AppDispatcher.handleUnloadAction({
            actionType: StackStoreConstants.UNLOAD_STACKS,
            data: []
        });
    }
};

module.exports = StackListActions;