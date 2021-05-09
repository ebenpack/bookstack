import { fromJS } from "immutable";
import { sagaTest } from "../../utils/testUtils";
import {
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchAddCategory,
    watchDeleteCategory,
    watchAddBook,
} from "../stackDetailSagas";
import {
    initialState,
    stackDetailRequest,
    stackDetailSuccess,
    stackDetailFailure,
    STACK_DETAIL_SUCCESS,
    STACK_DETAIL_FAILURE,
    stackDetailReadStateRequest,
    stackDetailReadStateSuccess,
    stackDetailReadStateFailure,
    STACK_DETAIL_READ_STATE_SUCCESS,
    STACK_DETAIL_READ_STATE_FAILURE,
    stackDetailPositionRequest,
    stackDetailPositionSuccess,
    stackDetailPositionFailure,
    STACK_DETAIL_POSITION_SUCCESS,
    STACK_DETAIL_POSITION_FAILURE,
    stackDetailRemoveBookRequest,
    stackDetailRemoveBookSuccess,
    stackDetailRemoveBookFailure,
    STACK_DETAIL_REMOVE_BOOK_SUCCESS,
    STACK_DETAIL_REMOVE_BOOK_FAILURE,
    STACK_DETAIL_ADD_CATEGORY_FAILURE,
    STACK_DETAIL_ADD_CATEGORY_SUCCESS,
    stackDetailRemoveCategoryRequest,
    stackDetailRemoveCategorySuccess,
    stackDetailRemoveCategoryFailure,
    STACK_DETAIL_REMOVE_CATEGORY_SUCCESS,
    STACK_DETAIL_REMOVE_CATEGORY_FAILURE,
    stackDetailAddBookRequest,
    stackDetailAddBookSuccess,
    stackDetailAddBookFailure,
    STACK_DETAIL_ADD_BOOK_SUCCESS,
    STACK_DETAIL_ADD_BOOK_FAILURE,
    stackDetailAddCategoryRequest,
    stackDetailAddCategorySuccess,
    stackDetailAddCategoryFailure,
} from "../stackDetailModule";

describe("loadStack", () => {
    sagaTest(
        { addBookStore: initialState },
        watchLoadStack,
        {
            method: "GET",
            url: "http://foo.bar.baz/api/stack/foobarbaz/",
        },
        { data: "foo" },
        stackDetailRequest("foobarbaz"),
        stackDetailSuccess("foo"),
        stackDetailFailure("Error message"),
        STACK_DETAIL_SUCCESS,
        STACK_DETAIL_FAILURE
    );
});

describe("updateReadState", () => {
    sagaTest(
        { addBookStore: initialState },
        watchUpdateReadState,
        {
            method: "PATCH",
            url: "http://foo.bar.baz/api/bookstack/foobarbaz/",
            data: {
                read: true,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
        },
        { data: { read: true } },
        stackDetailReadStateRequest("foobarbaz", true),
        stackDetailReadStateSuccess("foobarbaz", true),
        stackDetailReadStateFailure("Error message"),
        STACK_DETAIL_READ_STATE_SUCCESS,
        STACK_DETAIL_READ_STATE_FAILURE
    );
});

describe("updatePosition", () => {
    sagaTest(
        {
            stackDetailStore: initialState.setIn(
                ["stackDetail", "books"],
                fromJS([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
            ),
        },
        watchUpdatePosition,
        {
            method: "PATCH",
            url: "http://foo.bar.baz/api/bookstack/foobarbaz/renumber/",
            data: {
                position: 3,
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
        },
        { data: "foo" },
        stackDetailPositionRequest("foobarbaz", 1, 3),
        stackDetailPositionSuccess("foobarbaz", 1, 3),
        stackDetailPositionFailure("Error message"),
        STACK_DETAIL_POSITION_SUCCESS,
        STACK_DETAIL_POSITION_FAILURE
    );
});

describe("deleteBook", () => {
    sagaTest(
        { addBookStore: initialState },
        watchDeleteBook,
        {
            method: "DELETE",
            url: "http://foo.bar.baz/api/bookstack/foobarbaz/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
        },
        { data: "foo" },
        stackDetailRemoveBookRequest("foobarbaz"),
        stackDetailRemoveBookSuccess("foobarbaz"),
        stackDetailRemoveBookFailure("Error message"),
        STACK_DETAIL_REMOVE_BOOK_SUCCESS,
        STACK_DETAIL_REMOVE_BOOK_FAILURE
    );
});

// TODO: addNewCategory

describe("addCategory", () => {
    sagaTest(
        { addBookStore: initialState },
        watchAddCategory,
        {
            method: "POST",
            url: "http://foo.bar.baz/api/bookstackcategory/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
            data: {
                bookstack: "foobar",
                category: "bazqux",
            },
        },
        { data: { bookstack: "foobar", category: "bazqux" } },
        stackDetailAddCategoryRequest("foobar", "bazqux"),
        stackDetailAddCategorySuccess("foobar", "bazqux"),
        stackDetailAddCategoryFailure("Error message"),
        STACK_DETAIL_ADD_CATEGORY_SUCCESS,
        STACK_DETAIL_ADD_CATEGORY_FAILURE
    );
});

describe("deleteCategory", () => {
    sagaTest(
        { addBookStore: initialState },
        watchDeleteCategory,
        {
            method: "DELETE",
            url: "http://foo.bar.baz/api/bookstackcategory/bazqux/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
        },
        { data: "foo" },
        stackDetailRemoveCategoryRequest("foobar", "bazqux"),
        stackDetailRemoveCategorySuccess("foobar", "bazqux"),
        stackDetailRemoveCategoryFailure("Error message"),
        STACK_DETAIL_REMOVE_CATEGORY_SUCCESS,
        STACK_DETAIL_REMOVE_CATEGORY_FAILURE
    );
});

describe("addBook", () => {
    sagaTest(
        { addBookStore: initialState },
        watchAddBook,
        {
            method: "POST",
            url: "http://foo.bar.baz/api/bookstack/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
            data: {
                categories: [],
                book_id: "foobar",
                stack_id: "bazqux",
            },
        },
        { data: "foo" },
        stackDetailAddBookRequest("foobar", "bazqux"),
        stackDetailAddBookSuccess("foo"),
        stackDetailAddBookFailure("Error message"),
        STACK_DETAIL_ADD_BOOK_SUCCESS,
        STACK_DETAIL_ADD_BOOK_FAILURE
    );
});
