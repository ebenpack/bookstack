import { put, call, select, takeEvery } from "redux-saga/effects";

import { axiosCall, getCredentials } from "../utils/sagasUtils";
import {
    searchBooksSuccess,
    searchBooksFailure,
    selectBookSuccess,
    selectBookFailure,
    addBookFailure,
    AddBookRequestAction,
    GetBookRequestAction,
    SearchBookRequestAction,
    SEARCH_BOOK_REQUEST,
    GET_BOOK_REQUEST,
    ADD_BOOK_REQUEST,
} from "./addBookModule";
import { makeBook } from "../BookStack/bookstackModule";
import { List } from "immutable";
import { IBook } from "../Book/types";
import { stackDetailAddBookSuccess } from "../StackDetail/stackDetailModule";

export function* searchBooks({ query }: SearchBookRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: "GET",
            url: `${apiUrl}/api/book/?search=${query}`,
        });
        const autocompleteBooks: List<IBook> = List(data.map(makeBook));
        yield put(searchBooksSuccess(autocompleteBooks));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: "Search books request failed" };
        yield put(searchBooksFailure(error));
    }
}

export function* getBook({ id }: GetBookRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: "GET",
            url: `${apiUrl}/api/book/${id}/`,
        });
        const book = makeBook(data);
        yield put(selectBookSuccess(book));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: "Get book request failed" };
        yield put(selectBookFailure(error));
    }
}

export function* addBook({ book }: AddBookRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            url: `${apiUrl}/api/book/`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            data: book.toJS(),
        });

        yield put(stackDetailAddBookSuccess(data));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: "Add book request failed" };
        yield put(addBookFailure(error));
    }
}

export function* watchBookSearch() {
    yield takeEvery(SEARCH_BOOK_REQUEST, searchBooks);
}

export function* watchGetBook() {
    yield takeEvery(GET_BOOK_REQUEST, getBook);
}

export function* watchAddBook() {
    yield takeEvery(ADD_BOOK_REQUEST, addBook);
}

export default [watchBookSearch, watchGetBook, watchAddBook];
