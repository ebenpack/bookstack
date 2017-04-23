import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as addBookActions from '../actions/AddBook';
import * as stackDetailActions from '../actions/StackDetail';

export function* searchBooks({query}) {
    let {apiUrl} = yield select(getCredentials);
    let booksAutocomplete = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/book/?search=${query}`,
        contentType: 'application/json',
        type: 'json',
    });
    yield put(addBookActions.addAutocompleteSuggestions(booksAutocomplete.data));
}

export function* selectBook({id}) {
    let {apiUrl} = yield select(getCredentials);
    let selected = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/book/${id}/`,
        contentType: 'application/json',
        type: 'json',
    });
    yield put(addBookActions.selectBook(selected.data));
}

export function* addBook({bookId, stackId}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        url: `${apiUrl}/api/bookset/`,
        contentType: 'application/json',
        type: 'json',
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: JSON.stringify({
            bookId: bookId,
            categories: [],
            stack: stackId
        })
    });
    yield put(stackDetailActions.addBook(bookId, stackId));
    yield put(addBookActions.clearSelected());
    yield put(stackDetailActions.toggleEditing())
}

export function* addNewBook({book}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        url: `${apiUrl}/api/book/`,
        contentType: 'application/json',
        type: 'json',
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + token,
        },
        data: book.toJS(),
    });
    // TODO: WHAT DO??!?!?!
}

function* watchBookSearch() {
    yield takeEvery(addBookActions.ADD_BOOK_SEARCH, searchBooks)
}

function* watchSelectBook() {
    yield takeEvery(addBookActions.ADD_BOOK_ADD_SELECTED_BOOK, selectBook)
}

function* watchAddBook() {
    yield takeEvery(addBookActions.ADD_BOOK, addBook)
}

function* watchAddNewBook() {
    yield takeEvery(addBookActions.ADD_BOOK_ADD_NEW_BOOK, addNewBook)
}

export default [
    watchBookSearch,
    watchSelectBook,
    watchAddBook,
    watchAddNewBook,
];