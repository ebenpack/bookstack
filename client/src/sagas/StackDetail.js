import axios from 'axios';

import {delay} from 'redux-saga';
import {put, call, select, take, takeEvery, race} from 'redux-saga/effects';

import {getCredentials, getCurrentTime} from './utils';

import {ADD} from '../actions/AddCategory';
import * as categoryActions from '../actions/AddCategory';

import  {
    STACK_DETAIL,
    POSITION,
    READ_STATE,
    ADD_BOOK,
    REMOVE_BOOK,
    ADD_CATEGORY,
    ADD_NEW_CATEGORY,
    REMOVE_CATEGORY,
    stackDetail,
    position,
    removeBook,
    removeCategory,
}  from '../actions/StackDetail';

import * as stackDetailActions from '../actions/StackDetail';

export function* loadStack({id}) {
    let {apiUrl} = yield select(getCredentials);
    let stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/${id}/`,
    });
    yield put(stackDetail.success(stack.data));
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
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    });
    let {id, read} = response.data;
    yield put(readState.success(id, read));
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
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        })
    }
    yield put(position.success(id, from, to));
}

export function* deleteBook({id}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/bookset/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    });
    yield put(removeBook.success(id));

}

export function* addNewCategory({bookstackId, category}){
    yield put(categoryActions.addCategory.request(category));
    let now = yield call(getCurrentTime);
    let waitUntil = now + 2500;
    while (true) {
        debugger
        let now = yield call(getCurrentTime);
        let {action, timeout} = yield race({
            action: yield take(ADD.SUCCESS),
            timeout: yield delay(waitUntil - now)
        });
        debugger
        console.log('CATEGORY', category)
        console.log('ADDED', action)
        if (timeout) {
            break;
        } else if (action.category.category === category) {
            debugger
            yield put(stackDetailActions.addCategory.request(bookstackId, action.category.id));
            break;
        }

    }
}

export function* addCategory({bookstackId, categoryId}) {
    let {apiUrl, token} = yield select(getCredentials);
    let response = yield call(axios, {
        method: 'POST',
        url: `${apiUrl}/api/booksetcategory/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        data: {
            bookstack: bookstackId,
            category: categoryId,
        }
    });
    debugger
    yield put(stackDetailActions.addCategory.success(response.data.bookstack, response.data));
}

export function* deleteCategory({bookstackId, categoryId}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/booksetcategory/${categoryId}/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    });
    yield put(removeCategory.success(bookstackId, categoryId));
}

export function* addBook({bookId, stackId}) {
    let {apiUrl, token} = yield select(getCredentials);
    yield call(axios, {
        url: `${apiUrl}/api/bookset/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        data: {
            categories: [],
            bookId,
            stackId
        }
    });
    // TODO: FIIIIIXXXX!
    // yield put(addBookActions.addNewBook(bookId, stackId)); WTF?
    // TODO: FIX
    //yield put(addBookActions.clearSelected());
    yield put(stackDetail.editing())
}


function* watchLoadStack() {
    yield takeEvery(STACK_DETAIL.REQUEST, loadStack);
}

function* watchUpdateReadState() {
    yield takeEvery(READ_STATE.REQUEST, updateReadState);
}

function* watchUpdatePosition() {
    yield takeEvery(POSITION.REQUEST, updatePosition);
}

function* watchDeleteBook() {
    yield takeEvery(REMOVE_BOOK.REQUEST, deleteBook);
}

function* watchAddCategory() {
    yield takeEvery(ADD_CATEGORY.REQUEST, addCategory)
}

function* watchAddNewCategory() {
    yield takeEvery(ADD_NEW_CATEGORY.REQUEST, addNewCategory);
}

function* watchDeleteCategory() {
    yield takeEvery(REMOVE_CATEGORY.REQUEST, deleteCategory);
}

function* watchAddBook() {
    yield takeEvery(ADD_BOOK.REQUEST, addBook)
}

export default [
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchAddCategory,
    watchAddNewCategory,
    watchDeleteCategory,
    watchAddBook
];