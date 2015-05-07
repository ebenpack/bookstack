var AppDispatcher = require('../dispatcher/AppDispatcher');
var StackStoreConstants = require('../constants/StackStoreConstants.js');

var StackDetailActions = {
    loadStack: function(id){
        var url = '/api/stack/' + id + '/';
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                AppDispatcher.handleLoadAction({
                    actionType: StackStoreConstants.LOAD_STACK_DETAIL,
                    data: data
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(url, status, err.toString());
            }.bind(this)
        });
    },
    unloadStackDetail: function() {
        AppDispatcher.handleUnloadAction({
            actionType: StackStoreConstants.UNLOAD_STACK_DETAIL,
            data: []
        });
    }
};

module.exports = StackDetailActions;