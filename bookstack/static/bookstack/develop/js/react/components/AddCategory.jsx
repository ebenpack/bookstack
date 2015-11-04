var React = require('react');
var Reflux = require('reflux');

var Category = require('./Category.jsx');
var Autocomplete = require('./Autocomplete.jsx');

var AddCategoryActions = require('../actions/AddCategoryActions');
var AddCategoryStore = require('../stores/AddCategoryStore');

var AddCategory = React.createClass({
    mixins: [Reflux.connect(AddCategoryStore)],
    getInitialState: function() {
        return {
            addingCategory: false,
            autoSuggestCategories: [],
            category: '',
        };
    },
    onAutoSuggestCategories: function(update) {
        if (update.autoSuggestCategories) {
            this.setState({
                autoSuggestCategories: update.autoSuggestCategories
            });
        }
    },
    handleChange: function(e) {
        var category = e.target.value;
        if (category) {
            AddCategoryActions.autoSuggestCategories(category);
        } else {
            this.setState({
                autoSuggestCategories: []
            });
        }
        this.setState({
            category: category,
        });
    },
    clearAutocomplete: function() {
        this.setState({
            autoSuggestCategories: [],
            addingCategory: false,
            category: "",
        });
    },
    addCategory: function(categoryId) {
        var bookstackId = this.props.id;
        AddCategoryActions.addCategory(bookstackId, categoryId);
    },
    render: function() {
        var autoSuggestCategories = '';
        if (this.state.autoSuggestCategories.length > 0) {
            autoSuggestCategories = (
                <Autocomplete
                    suggestions={this.state.autoSuggestCategories}
                    displayProperty={'category'}
                    onClick={this.addCategory}
                />
            );
        }
        return (
            <div>
                <input
                    type="text"
                    value={this.state.category}
                    onChange={this.handleChange}
                    onKeyUp={this.handleCategoryKeyUp}
                />
                {autoSuggestCategories}
            </div>
        );
    }
});

module.exports = AddCategory;