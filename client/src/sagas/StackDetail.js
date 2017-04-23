import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as stackDetailActions from '../actions/StackDetail';

export function* loadStack({id}) {
    let {apiUrl} = yield select(getCredentials);
    let stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/${id}/`,
        contentType: 'application/json',
        type: 'json'
    });
    yield put(stackDetailActions.setStack(stack.data));
}

export function* updateReadState({bookId, readState}) {
    let {apiUrl, token} = yield select(getCredentials);
    let response = yield call(axios, {
        method: 'PATCH',
        url: `${apiUrl}/api/bookset/${bookId}/`,
        data: {
            read: readState,
        },
        headers: {
            'Authorization': `Token ${token}`,
        },
        type: 'json',
        contentType: 'application/json'
    });
    let {id, read} = response.data;
    yield put(stackDetailActions.setReadState(id, read));
}

export function* updatePosition({id, from, to}) {
    let {apiUrl, token} = yield select(getCredentials);
    let stackLength = yield select(
        store => store.stackDetailStore.getIn(['stackDetail', 'books']).size
    );
    if (to > 0 && to <= stackLength) {
        yield call(axios, {
            method: 'PATCH',
            url: `${apiUrl}/api/bookset/${id}/renumber/`,
            data: {
                position: to,
            },
            headers: {
                'Authorization': `Token ${token}`,
            },

            type: 'json',
            contentType: 'application/json'
        })
    }
    yield put(stackDetailActions.setPosition(id, from, to));
}

export function* deleteBook({id}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/bookset/${id}/`,
        contentType: 'application/json',
        type: 'json',
        headers: {
            'Authorization': `Token ${token}`,
        },
    });
    yield put(stackDetailActions.removeBook(id));

}

export function* deleteCategory({bookstackId, categoryId}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/booksetcategory/${categoryId}/`,
        headers: {
            'Authorization': `Token ${token}`,
        },
        type: 'json',
        contentType: 'application/json'
    });
    yield put(stackDetailActions.removeCategory(bookstackId, categoryId));
}

function* watchLoadStack() {
    yield takeEvery(stackDetailActions.STACK_DETAIL_LOAD, loadStack);
}

function* watchUpdateReadState() {
    yield takeEvery(stackDetailActions.STACK_DETAIL_UPDATE_READ_STATE, updateReadState);
}

function* watchUpdatePosition() {
    yield takeEvery(stackDetailActions.STACK_DETAIL_UPDATE_POSITION, updatePosition);
}

function* watchDeleteBook() {
    yield takeEvery(stackDetailActions.STACK_DETAIL_DELETE_BOOK, deleteBook);
}

function* watchDeleteCategory() {
    yield takeEvery(stackDetailActions.STACK_DETAIL_DELETE_CATEGORY, deleteCategory);
}

export default [
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchDeleteCategory,
];