import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Autocomplete from '../Autocomplete/Autocomplete';

import { categorySearch, categoryInput } from './addCategoryModule';
import {
    addCategory as addCategoryAction,
    addNewCategory as addNewCategoryAction,
} from '../StackDetail/stackDetailModule';

export const AddCategory = ({
    id,
    autoSuggestCategories,
    category,
    addCategory,
    addNewCategory,
    setAutoSuggestCategories,
    clearAutoSuggestCategories,
    setCategoryInput,
    clearCategoryInput,
}) => (
    <div>
        <label>Add Category: <input
            type="text"
            value={category}
            onChange={(e) => {
                const newCategory = e.target.value;
                if (newCategory) {
                    setCategoryInput(newCategory);
                    setAutoSuggestCategories(newCategory);
                } else {
                    clearCategoryInput();
                    clearAutoSuggestCategories();
                }
            }}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    addNewCategory(id, category);
                    clearCategoryInput();
                    clearAutoSuggestCategories();
                }
            }}
        />
        </label>
        {
            (autoSuggestCategories.size > 0) ? (
                <Autocomplete
                    suggestions={autoSuggestCategories}
                    displayProperty="category"
                    onClick={(suggestionId) => {
                        clearCategoryInput();
                        clearAutoSuggestCategories();
                        addCategory(id, suggestionId);
                    }}
                />
            ) : null
        }
    </div>
);

AddCategory.propTypes = {
    category: propTypes.string.isRequired,
    addCategory: propTypes.func.isRequired,
    setCategoryInput: propTypes.func.isRequired,
    clearCategoryInput: propTypes.func.isRequired,
    clearAutoSuggestCategories: propTypes.func.isRequired,
    setAutoSuggestCategories: propTypes.func.isRequired,
    id: propTypes.number.isRequired,
    addNewCategory: propTypes.func.isRequired,
    autoSuggestCategories: immutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({
    autoSuggestCategories: state.addCategoryStore.get('autoSuggestCategories'),
    category: state.addCategoryStore.get('category'),
});

const mapDispatchToProps = {
    addCategory: addCategoryAction.request,
    addNewCategory: addNewCategoryAction.request,
    setCategoryInput: categoryInput.set,
    clearCategoryInput: categoryInput.clear,
    setAutoSuggestCategories: categorySearch.request,
    clearAutoSuggestCategories: categorySearch.clear,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCategory);
