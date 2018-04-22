import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from '../utils/sagasUtils';
import * as addBookActions from './addBookModule';

export function* searchBooks({ query }) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/book/?search=${query}`,
        });
        yield put(addBookActions.searchBooks.success(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Search books request failed' };
        yield put(addBookActions.searchBooks.failure(error));
    }
}

export function* getBook({ id }) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/book/${id}/`,
        });
        yield put(addBookActions.selectBook.success(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Get book request failed' };
        yield put(addBookActions.selectBook.failure(error));
    }
}

export function* addBook({ book }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axios, {
            url: `${apiUrl}/api/book/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            data: book.toJS(),
        });
        yield put(addBookActions.addBook.success(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add book request failed' };
        yield put(addBookActions.addBook.failure(error));
    }
}

export function* watchBookSearch() {
    yield takeEvery(addBookActions.SEARCH_BOOK.REQUEST, searchBooks);
}

export function* watchGetBook() {
    yield takeEvery(addBookActions.GET_BOOK.REQUEST, getBook);
}

export function* watchAddBook() {
    yield takeEvery(addBookActions.ADD_BOOK.REQUEST, addBook);
}

export default [
    watchBookSearch,
    watchGetBook,
    watchAddBook,
];
