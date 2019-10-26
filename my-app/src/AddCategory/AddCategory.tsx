import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';

import Autocomplete from '../Autocomplete/Autocomplete';

import { 
    searchCategoryRequest,
    searchCategoryClear
} from './addCategoryModule';
import {
    stackDetailAddNewCategoryRequest,
    stackDetailAddCategoryRequest
} from '../StackDetail/stackDetailModule';
import { AppState } from '../store';

interface PropsFromState {
    autoSuggestCategories: List<Map<string, any>>,
}

interface PropsFromDispatch {
    addCategory: typeof stackDetailAddCategoryRequest,
    addNewCategory: typeof stackDetailAddNewCategoryRequest,
    setAutoSuggestCategories: typeof searchCategoryRequest,
    clearAutoSuggestCategories: typeof searchCategoryClear,
}

interface OwnProps {
    id: number,
    category: string,
}

type AddCategoryProps = PropsFromState & PropsFromDispatch & OwnProps;

export class AddCategory extends React.Component<AddCategoryProps> {
    render() {
        const {
            id,
            autoSuggestCategories,
            addCategory,
            addNewCategory,
            setAutoSuggestCategories,
            clearAutoSuggestCategories,
        } = this.props;
        const [category, setCategoryInput] = useState('');
        const clearCategoryInput = () => setCategoryInput('');
        return (
            <div>
                <label>Add Category:
                    <input
                        className="input"
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
                    <Autocomplete
                        suggestions={autoSuggestCategories}
                        displayProperty="category"
                        onClick={(suggestionId) => {
                            clearCategoryInput();
                            clearAutoSuggestCategories();
                            addCategory(id, suggestionId);
                        }}
                    />
                </label>
            </div>
        )
    };
}

const mapStateToProps = (state: AppState) => ({
    autoSuggestCategories: state.addCategoryStore.get('autoSuggestCategories')
});

const mapDispatchToProps = {
    addCategory: stackDetailAddCategoryRequest,
    addNewCategory: stackDetailAddNewCategoryRequest,
    setAutoSuggestCategories: searchCategoryRequest,
    clearAutoSuggestCategories: searchCategoryClear,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddCategory);
