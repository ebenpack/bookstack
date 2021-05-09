import { sagaTest } from "../../utils/testUtils";
import {
    watchAddCategory,
    watchSetAutoSuggestCategories,
} from "../addCategorySagas";
import {
    initialState,
    ADD_CATEGORY_ADD_SUCCESS,
    ADD_CATEGORY_ADD_FAILURE,
    addCategoryRequest,
    addCategorySuccess,
    addCategoryFailure,
    searchCategoryRequest,
    searchCategorySuccess,
    searchCategoryFailure,
    ADD_CATEGORY_SEARCH_SUCCESS,
    ADD_CATEGORY_SEARCH_FAILURE,
} from "../addCategoryModule";
import { List } from "immutable";
import { CategoryDetailRecord } from "../../Category/categoryModule";

describe("addCategory", () => {
    sagaTest(
        { addBookStore: initialState },
        watchAddCategory,
        {
            url: "http://foo.bar.baz/api/category/",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
            data: { category: "foobarbaz" },
        },
        { data: "foo" },
        addCategoryRequest("foobarbaz"),
        addCategorySuccess("foo"),
        addCategoryFailure("Error message"),
        ADD_CATEGORY_ADD_SUCCESS,
        ADD_CATEGORY_ADD_FAILURE
    );
});

describe("setAutoSuggestCategories", () => {
    sagaTest(
        { addBookStore: initialState },
        watchSetAutoSuggestCategories,
        {
            url: "http://foo.bar.baz/api/category/?search=foobarbaz",
            method: "GET",
        },
        { data: "foo" },
        searchCategoryRequest("foobarbaz"),
        searchCategorySuccess(
            List([new CategoryDetailRecord({ category: "fiction" })])
        ),
        searchCategoryFailure("Error message"),
        ADD_CATEGORY_SEARCH_SUCCESS,
        ADD_CATEGORY_SEARCH_FAILURE
    );
});
