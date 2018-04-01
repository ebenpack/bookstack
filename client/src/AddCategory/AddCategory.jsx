import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Autocomplete from '../Autocomplete/Autocomplete';

import { categorySearch } from './addCategoryModule';
import { addCategory, addNewCategory } from '../StackDetail/stackDetailModule';

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
            dispatch(categorySearch.clear()),
    };
}

// TODO: Make pure, stateless render function?
class AddCategory extends React.Component {
    constructor() {
        super();
        this.state = {
            category: '',
        };
    }

    componentWillUnmount() {
        this.props.clearAutoSuggestCategories();
    }

    handleChange(e) {
        const category = e.target.value;
        if (category) {
            this.props.setAutoSuggestCategories(category);
        } else {
            this.props.clearAutoSuggestCategories();
        }
        this.setState({
            category,
        });
    }

    handleAddCategoryKeyUp(e) {
        if (e.key === 'Enter') {
            const bookstackId = this.props.id;
            const { category } = this.state;
            this.props.addNewCategory(bookstackId, category);
            this.clearAutocomplete();
        }
    }

    clearAutocomplete() {
        this.setState({
            category: '',
        });
        this.props.clearAutoSuggestCategories();
    }

    addCategory(categoryId) {
        const bookstackId = this.props.id;
        this.props.addCategory(bookstackId, categoryId);
    }

    render() {
        let autoSuggestCategories = '';
        if (this.props.autoSuggestCategories.size > 0) {
            autoSuggestCategories = (
                <Autocomplete
                    suggestions={this.props.autoSuggestCategories}
                    displayProperty="category"
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
                />
                </label>
                {autoSuggestCategories}
            </div>
        );
    }
}

AddCategory.propTypes = {
    addCategory: propTypes.func.isRequired,
    clearAutoSuggestCategories: propTypes.func.isRequired,
    setAutoSuggestCategories: propTypes.func.isRequired,
    id: propTypes.number.isRequired,
    addNewCategory: propTypes.func.isRequired,
    autoSuggestCategories: immutablePropTypes.list.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCategory);
