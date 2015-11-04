var Reflux = require('reflux');

var AddCategoryActions = Reflux.createActions([
    'autoSuggestCategories',
    'searchCategories',
    'addCategory',
    'autoSuggestCategories',
    'setToken',
]);

module.exports = AddCategoryActions;