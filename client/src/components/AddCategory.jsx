import React from 'react';
import {connect} from 'react-redux';

import Autocomplete from './Autocomplete.jsx';

import {
    categorySearch
} from '../actions/AddCategory';
import {addCategory, addNewCategory} from '../actions/StackDetail';

function mapStateToProps(state) {
    return {
        autoSuggestCategories: state.addCategoryStore.get('autoSuggestCategories'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: (bookstackId, categoryId) =>
            dispatch(addCategory.request(bookstackId, categoryId)),
        addNewCategory: (bookstackId, category) =>
            dispatch(addNewCategory.request(bookstackId, category)),
        setAutoSuggestCategories: query =>
            dispatch(categorySearch.request(query)),
        clearAutoSuggestCategories: () =>
            dispatch(categorySearch.clear())
    }
}

// TODO: Make pure, stateless render function?
class AddCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            addingCategory: false,
            category: '',
        };
    }

    componentWillUnmount() {
        this.props.clearAutoSuggestCategories();
    }

    handleChange(e) {
        let category = e.target.value;
        if (category) {
            this.props.setAutoSuggestCategories(category);
        } else {
            this.props.clearAutoSuggestCategories();
        }
        this.setState({
            category: category,
        });
    }

    handleAddCategoryKeyUp(e) {
        if (e.key === 'Enter') {
            let bookstackId = this.props.id;
            let category = this.state.category;
            this.props.addNewCategory(bookstackId, category);
            this.clearAutocomplete();
        }
    }

    clearAutocomplete() {
        this.setState({
            addingCategory: false,
            category: "",
        });
        this.props.clearAutoSuggestCategories();
    }

    addCategory(categoryId) {
        let bookstackId = this.props.id;
        this.props.addCategory(bookstackId, categoryId);
    }

    render() {
        let autoSuggestCategories = '';
        if (this.props.autoSuggestCategories.size > 0) {
            autoSuggestCategories = (
                <Autocomplete
                    suggestions={this.props.autoSuggestCategories}
                    displayProperty={'category'}
                    onClick={e => this.addCategory(e)}
                />
            );
        }
        return (
            <div>
                <label>Add Category: <input
                    type="text"
                    value={this.state.category}
                    onChange={e => this.handleChange(e)}
                    onKeyUp={e => this.handleAddCategoryKeyUp(e)}
                /></label>
                {autoSuggestCategories}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategory);