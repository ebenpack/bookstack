import React from 'react';
import {connect} from 'react-redux';

import Category from './Category.jsx';
import Autocomplete from './Autocomplete.jsx';

import {
    addCategory,
    addNewCategory,
    setAutoSuggestCategories,
    clearAutoSuggestCategories
} from '../actions/AddCategoryActions';

function mapStateToProps(state) {
    return {
        apiUrl: state.appStore.get('apiUrl'),
        token: state.appStore.get('token'),
        autoSuggestCategories: state.addCategoryStore.get('autoSuggestCategories'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addCategory: (apiUrl, token, bookstackId, categoryId) =>
            dispatch(addCategory(apiUrl, token, bookstackId, categoryId)),
        addNewCategory: (apiUrl, token, category, bookstackId) =>
            dispatch(addNewCategory(apiUrl, token, category, bookstackId)),
        setAutoSuggestCategories: (apiUrl, query) =>
            dispatch(setAutoSuggestCategories(apiUrl, query)),
        clearAutoSuggestCategories: () =>
            dispatch(clearAutoSuggestCategories())
    }
}


class AddCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            addingCategory: false,
            category: '',
        };
    }

    componentWillUnmount(){
        this.props.clearAutoSuggestCategories();
    }

    handleChange(e) {
        let category = e.target.value;
        if (category) {
            this.props.setAutoSuggestCategories(this.props.apiUrl, category);
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
            this.props.addNewCategory(this.props.apiUrl, this.props.token, category, bookstackId);
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
        this.props.addCategory(this.props.apiUrl, this.props.token, bookstackId, categoryId);
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