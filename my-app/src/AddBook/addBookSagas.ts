import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { axiosCall, getCredentials } from '../utils/sagasUtils';
import {
    searchBooksSuccess,
    searchBooksFailure,
    selectBookSuccess,
    selectBookFailure,
    addBookSuccess,
    addBookFailure,
    AddBookRequestAction,
    GetBookRequestAction,
    SearchBookRequestAction,
    SEARCH_BOOK_REQUEST,
    GET_BOOK_REQUEST,
    ADD_BOOK_REQUEST
} from './addBookModule';

export function* searchBooks({ query }: SearchBookRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/book/?search=${query}`,
        });
        yield put(searchBooksSuccess(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Search books request failed' };
        yield put(searchBooksFailure(error));
    }
}

export function* getBook({ id }: GetBookRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/book/${id}/`,
        });
        yield put(selectBookSuccess(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Get book request failed' };
        yield put(selectBookFailure(error));
    }
}

export function* addBook({ book }: AddBookRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            url: `${apiUrl}/api/book/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            data: book.toJS(),
        });
        yield put(addBookSuccess(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add book request failed' };
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

export default [
    watchBookSearch,
    watchGetBook,
    watchAddBook,
];
