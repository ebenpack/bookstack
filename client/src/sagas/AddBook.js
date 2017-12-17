import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as addBookActions from '../actions/AddBook';
import * as stackActions from '../actions/StackDetail';

export function* searchBooks({query}) {
    let {apiUrl} = yield select(getCredentials);
    let booksAutocomplete = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/book/?search=${query}`,
    });
    yield put(addBookActions.searchBooks.success(booksAutocomplete.data));
}

export function* getBook({id}) {
    let {apiUrl} = yield select(getCredentials);
    let selected = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/book/${id}/`,
    });
    yield put(addBookActions.selectBook.success(selected.data));
}

export function* addBook({book}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        url: `${apiUrl}/api/book/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        data: book.toJS(),
    });
    // TODO: WHAT DO??!?!?!
}

function* watchBookSearch() {
    yield takeEvery(addBookActions.SEARCH_BOOK.REQUEST, searchBooks)
}

function* watchGetBook() {
    yield takeEvery(addBookActions.GET_BOOK.REQUEST, getBook)
}

function* watchAddBook() {
    yield takeEvery(addBookActions.ADD_BOOK.REQUEST, addBook)
}

export default [
    watchBookSearch,
    watchGetBook,
    watchAddBook,
];