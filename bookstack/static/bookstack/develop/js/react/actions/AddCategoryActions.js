var Reflux = require('reflux');

var AddCategoryActions = Reflux.createActions([
    'addCategory',
    'autoSuggestCategories',
    'setToken',
]);

module.exports = AddCategoryActions;