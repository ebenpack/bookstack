//var Reflux = require('reflux');
var reqwest = require('reqwest');

var debounce = require('../util').debounce;

var AddCategoryActions = require('../actions/AddCategoryActions');
var StackDetailActions = require('../actions/StackDetailActions');

// var AddCategoryStore = Reflux.createStore({
//     listenables: [AddCategoryActions],
//     state: {
//         token: '',
//     },
//     categoryUrl: '/api/category/',
//     booksetCategoryUrl: '/api/booksetcategory/',
//     onSetToken: function(token) {
//         this.state.token = token;
//         this.trigger({
//             token: this.state.token
//         });
//     },
//     setAutoSuggestCategories: function(categories) {
//         this.trigger({
//             autoSuggestCategories: categories,
//         });
//     },
//     onAddNewCategory: function(bookstackId, category){
//         var context = this;
//         reqwest({
//             url: this.categoryUrl,
//             type: 'json',
//             contentType: 'application/json',
//             method: "POST",
//             headers: {
//                 'Authorization': 'Token ' + this.state.token,
//             },
//             data: JSON.stringify({
//                 category: category
//             })
//         }).then(function(category) {
//             AddCategoryActions.addCategory(bookstackId, category.id);
//         }).fail(function(err, msg) {
//             console.error(context.sourceUrl, err.toString(), msg);
//         });
//     },
//     onAddCategory: function(bookstackId, categoryId){
//         var context = this;
//         reqwest({
//             url: this.booksetCategoryUrl,
//             type: 'json',
//             contentType: 'application/json',
//             method: "POST",
//             headers: {
//                 'Authorization': 'Token ' + this.state.token,
//             },
//             data: JSON.stringify({
//                 bookstack: bookstackId,
//                 category: categoryId,
//             })
//         }).then(function(resp) {
//             StackDetailActions.addCategory(resp);
//         }).fail(function(err, msg) {
//             console.error(context.sourceUrl, err.toString(), msg);
//         });
//     },
//     onAutoSuggestCategories: debounce(function(search) {
//         var context = this;
//         reqwest({
//             url: this.categoryUrl + '?search=' + search,
//             type: 'json',
//             contentType: 'application/json'
//         }).then(function(resp) {
//             context.setAutoSuggestCategories(resp);
//         }).fail(function(err, msg) {
//             console.error(context.sourceUrl, err.toString(), msg);
//         });
//     }, 250),
// });

module.exports = '';