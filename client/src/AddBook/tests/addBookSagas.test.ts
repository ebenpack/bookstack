import { fromJS } from "immutable";
import { sagaTest } from "../../utils/testUtils";
import { watchBookSearch, watchGetBook, watchAddBook } from "../addBookSagas";
import {
    initialState,
    addBook,
    getBook,
    searchBooks,
    selectBook,
    ADD_BOOK,
    SELECT_BOOK,
    SEARCH_BOOK,
} from "../addBookModule";

sagaTest(
    "bookSearch",
    { addBookStore: initialState },
    watchBookSearch,
    {
        method: "GET",
        url: "http://foo.bar.baz/api/book/?search=foobarbaz",
    },
    { data: "foo" },
    searchBooks.request("foobarbaz"),
    searchBooks.success("foo"),
    searchBooks.failure("Error message"),
    SEARCH_BOOK.SUCCESS,
    SEARCH_BOOK.FAILURE
);

sagaTest(
    "getBook",
    { addBookStore: initialState },
    watchGetBook,
    {
        method: "GET",
        url: "http://foo.bar.baz/api/book/foobarbaz/",
    },
    { data: "foo" },
    getBook.request("foobarbaz"),
    selectBook.success("foo"),
    selectBook.failure("Error message"),
    SELECT_BOOK.SUCCESS,
    SELECT_BOOK.FAILURE
);

sagaTest(
    "addBook",
    { addBookStore: initialState },
    watchAddBook,
    {
        method: "POST",
        url: "http://foo.bar.baz/api/book/",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token token",
        },
        data: { title: "foo" },
    },
    { data: "foo" },
    addBook.request(fromJS({ title: "foo" })),
    addBook.success("foo"),
    addBook.failure("Error message"),
    ADD_BOOK.SUCCESS,
    ADD_BOOK.FAILURE
);
