import { List } from "immutable";
import { sagaTest } from "../../utils/testUtils";
import { watchBookSearch, watchGetBook, watchAddBook } from "../addBookSagas";
import {
    initialState,
    searchBooksRequest,
    searchBooksSuccess,
    searchBooksFailure,
    getBookRequest,
    selectBookSuccess,
    selectBookFailure,
    SELECT_BOOK_SUCCESS,
    SELECT_BOOK_FAILURE,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    addBookRequest,
    addBookSuccess,
    addBookFailure,
    SEARCH_BOOK_SUCCESS,
    SEARCH_BOOK_FAILURE,
} from "../addBookModule";
import { makeBook } from "../../BookStack/bookstackModule";
import { Book } from "../../Book/types";

const testBook: Book = {
    id: 1,
    img: "/img",
    title: "Gravity's Rainbow",
    pages: 1000,
    isbn: "321093812",
    publishers: [],
    authors: [],
};

describe("bookSearch", () => {
    sagaTest(
        { addBookStore: initialState },
        watchBookSearch,
        {
            method: "GET",
            url: "http://foo.bar.baz/api/book/?search=foobarbaz",
        },
        { data: [testBook] },
        searchBooksRequest("foobarbaz"),
        searchBooksSuccess(List([testBookRecord])),
        searchBooksFailure("Error message"),
        SEARCH_BOOK_SUCCESS,
        SEARCH_BOOK_FAILURE
    );
});

describe("getBook", () => {
    sagaTest(
        { addBookStore: initialState },
        watchGetBook,
        {
            method: "GET",
            url: "http://foo.bar.baz/api/book/1/",
        },
        { data: testBook },
        getBookRequest(1),
        selectBookSuccess(testBookRecord),
        selectBookFailure("Error message"),
        SELECT_BOOK_SUCCESS,
        SELECT_BOOK_FAILURE
    );
});

describe("addBook", () => {
    sagaTest(
        { addBookStore: initialState },
        watchAddBook,
        {
            method: "POST",
            url: "http://foo.bar.baz/api/book/",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token token",
            },
            data: { ...testBook, authors: [], publishers: [] },
        },
        { data: { ...testBook, authors: [], publishers: [] } },
        addBookRequest(testBook),
        addBookSuccess(testBook),
        addBookFailure("Error message"),
        ADD_BOOK_SUCCESS,
        ADD_BOOK_FAILURE
    );
});
