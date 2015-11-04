var Reflux = require('reflux');
var reqwest = require('reqwest');

var debounce = require('../util').debounce;

var AddCategoryActions = require('../actions/AddCategoryActions');
var StackDetailActions = require('../actions/StackDetailActions');

var AddCategoryStore = Reflux.createStore({
    listenables: [AddCategoryActions],
    state: {
        token: '',
    },
    addCategoryUrl: '/api/booksetcategory/',
    categorySearchUrl: '/api/category/?search={search}',
    onSetToken: function(token) {
        this.state.token = token;
        this.trigger({
            token: this.state.token
        });
    },
    setAutoSuggestCategories: function(categories) {
        this.trigger({
            autoSuggestCategories: categories,
        });
    },
    onAddCategory: function(bookstackId, categoryId){
         var context = this;
        reqwest({
            url: this.addCategoryUrl,
            type: 'json',
            contentType: 'application/json',
            method: "POST",
            headers: {
                'Authorization': 'Token ' + this.state.token,
            },
            data: JSON.stringify({
                bookstack: bookstackId,
                category: categoryId,
            })
        }).then(function(resp) {
            StackDetailActions.addCategory(resp);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    },
    onAutoSuggestCategories: debounce(function(search) {
        var context = this;
        reqwest({
            url: this.categorySearchUrl.replace('{search}', search),
            type: 'json',
            contentType: 'application/json'
        }).then(function(resp) {
            context.setAutoSuggestCategories(resp);
        }).fail(function(err, msg) {
            console.error(context.sourceUrl, err.toString(), msg);
        });
    }, 250),
});

module.exports = AddCategoryStore;