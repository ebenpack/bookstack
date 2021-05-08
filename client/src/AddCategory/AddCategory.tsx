import * as React from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import Autocomplete from "../Autocomplete/Autocomplete";

import {
    searchCategoryRequest,
    searchCategoryClear,
} from "./addCategoryModule";
import {
    stackDetailAddNewCategoryRequest,
    stackDetailAddCategoryRequest,
} from "../StackDetail/stackDetailModule";
import { AppState } from "../store";
import { ICategoryDetail } from "../Category/types";

interface PropsFromState {
    autoSuggestCategories: List<ICategoryDetail>;
}

interface PropsFromDispatch {
    addCategory: typeof stackDetailAddCategoryRequest;
    addNewCategory: typeof stackDetailAddNewCategoryRequest;
    setAutoSuggestCategories: typeof searchCategoryRequest;
    clearAutoSuggestCategories: typeof searchCategoryClear;
}

interface IState {
    category: string;
}

interface OwnProps {
    id: number;
}

type AddCategoryProps = PropsFromState & PropsFromDispatch & OwnProps;

export class AddCategory extends React.Component<AddCategoryProps, IState> {
    constructor(props: AddCategoryProps) {
        super(props);
        this.state = {
            category: "",
        };
        this.setCategoryInput = this.setCategoryInput.bind(this);
        this.clearCategoryInput = this.clearCategoryInput.bind(this);
    }
    setCategoryInput(category: string) {
        this.setState({ category });
    }
    clearCategoryInput() {
        this.setCategoryInput("");
    }
    render() {
        const {
            id,
            autoSuggestCategories,
            addCategory,
            addNewCategory,
            setAutoSuggestCategories,
            clearAutoSuggestCategories,
        } = this.props;
        const { category } = this.state;
        return (
            <div>
                <label>
                    Add Category:
                    <input
                        className="input"
                        type="text"
                        value={category}
                        onChange={(e) => {
                            const newCategory = e.target.value;
                            if (newCategory) {
                                this.setCategoryInput(newCategory);
                                setAutoSuggestCategories(newCategory);
                            } else {
                                this.clearCategoryInput();
                                clearAutoSuggestCategories();
                            }
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                addNewCategory(id, category);
                                this.clearCategoryInput();
                                clearAutoSuggestCategories();
                            }
                        }}
                    />
                    <Autocomplete
                        getDisplayProperty={(suggestion) => suggestion.category}
                        getId={(suggestion) => suggestion.id}
                        suggestions={autoSuggestCategories}
                        onClick={(suggestionId) => {
                            this.clearCategoryInput();
                            clearAutoSuggestCategories();
                            addCategory(id, suggestionId);
                        }}
                    />
                </label>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    autoSuggestCategories: state.addCategoryStore.autoSuggestCategories,
});

const mapDispatchToProps = {
    addCategory: stackDetailAddCategoryRequest,
    addNewCategory: stackDetailAddNewCategoryRequest,
    setAutoSuggestCategories: searchCategoryRequest,
    clearAutoSuggestCategories: searchCategoryClear,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
