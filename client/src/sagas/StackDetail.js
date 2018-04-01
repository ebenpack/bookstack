import axios from 'axios';

import { delay } from 'redux-saga';
import { put, call, select, take, takeEvery, race } from 'redux-saga/effects';

import { getCredentials, getCurrentTime } from './utils';

import * as categoryActions from '../actions/AddCategory';
import * as stackDetailActions from '../actions/StackDetail';

const { ADD } = categoryActions;
const {
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
} = stackDetailActions;

export function* loadStack({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/${id}/`,
    });
    yield put(stackDetail.success(stack.data));
}

export function* updateReadState({ bookId, readState }) {
    const { apiUrl, token } = yield select(getCredentials);
    const response = yield call(axios, {
        method: 'PATCH',
        url: `${apiUrl}/api/bookset/${bookId}/`,
        data: {
            read: readState,
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });
    const { id, read } = response.data;
    yield put(readState.success(id, read));
}

export function* updatePosition({ id, from, to }) {
    const { apiUrl, token } = yield select(getCredentials);
    const stackLength = yield select(store => store.stackDetailStore.getIn(['stackDetail', 'books']).size);
    if (to > 0 && to <= stackLength) {
        yield call(axios, {
            method: 'PATCH',
            url: `${apiUrl}/api/bookset/${id}/renumber/`,
            data: {
                position: to,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
    }
    yield put(position.success(id, from, to));
}

export function* deleteBook({ id }) {
    const { apiUrl, token } = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/bookset/${id}/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });
    yield put(removeBook.success(id));
}

export function* addNewCategory({ bookstackId, category }) {
    yield put(categoryActions.addCategory.request(category));
    let now = yield call(getCurrentTime);
    const waitUntil = now + 2500;
    while (true) {
        now = yield call(getCurrentTime);
        const { action, timeout } = yield race({
            action: yield take(ADD.SUCCESS),
            timeout: yield delay(waitUntil - now),
        });

        if (timeout) {
            break;
        } else if (action.category.category === category) {
            yield put(stackDetailActions.addCategory.request(bookstackId, action.category.id));
            break;
        }
    }
}

export function* addCategory({ bookstackId, categoryId }) {
    const { apiUrl, token } = yield select(getCredentials);
    const response = yield call(axios, {
        method: 'POST',
        url: `${apiUrl}/api/booksetcategory/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        data: {
            bookstack: bookstackId,
            category: categoryId,
        },
    });

    yield put(stackDetailActions.addCategory.success(response.data.bookstack, response.data));
}

export function* deleteCategory({ bookstackId, categoryId }) {
    const { apiUrl, token } = yield select(getCredentials);
    yield call(axios, {
        method: 'DELETE',
        url: `${apiUrl}/api/booksetcategory/${categoryId}/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
    });
    yield put(removeCategory.success(bookstackId, categoryId));
}

export function* addBook({ bookId, stackId }) {
    const { apiUrl, token } = yield select(getCredentials);
    yield call(axios, {
        url: `${apiUrl}/api/bookset/`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        },
        data: {
            categories: [],
            bookId,
            stackId,
        },
    });
    // TODO: FIIIIIXXXX!
    // yield put(addBookActions.addNewBook(bookId, stackId)); WTF?
    // TODO: FIX
    // yield put(addBookActions.clearSelected());
    yield put(stackDetail.editing());
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
    yield takeEvery(ADD_CATEGORY.REQUEST, addCategory);
}

function* watchAddNewCategory() {
    yield takeEvery(ADD_NEW_CATEGORY.REQUEST, addNewCategory);
}

function* watchDeleteCategory() {
    yield takeEvery(REMOVE_CATEGORY.REQUEST, deleteCategory);
}

function* watchAddBook() {
    yield takeEvery(ADD_BOOK.REQUEST, addBook);
}

export default [
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchAddCategory,
    watchAddNewCategory,
    watchDeleteCategory,
    watchAddBook,
];
