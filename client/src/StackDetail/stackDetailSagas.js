import axios from 'axios';
import { delay } from 'redux-saga';
import { put, call, select, take, takeEvery, race } from 'redux-saga/effects';

import { getCredentials, getCurrentTime, initializeSaga } from '../utils/sagasUtils';
import { path } from './StackDetailRoute';
import * as categoryActions from '../AddCategory/addCategoryModule';
import * as stackDetailActions from '../StackDetail/stackDetailModule';

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
    try {
        const stack = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/stack/${id}/`,
        });
        yield put(stackDetail.success(stack.data));
    } catch (error) {
        yield put(stackDetail.failure(error));
    }
}

export function* updateReadState({ bookId, readState }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const response = yield call(axios, {
            method: 'PATCH',
            url: `${apiUrl}/api/bookstack/${bookId}/`,
            data: {
                read: readState,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        const { read } = response.data;
        yield put(stackDetailActions.readState.success(bookId, read));
    } catch (error) {
        yield put(stackDetailActions.readState.failure(error));
    }
}

export function* updatePosition({ id, from, to }) {
    const { apiUrl, token } = yield select(getCredentials);
    const stackLength = yield select(store =>
        store.stackDetailStore.getIn(['stackDetail', 'books']).size);
    try {
        if (to > 0 && to <= stackLength) {
            yield call(axios, {
                method: 'PATCH',
                url: `${apiUrl}/api/bookstack/${id}/renumber/`,
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
    } catch (error) {
        yield put(position.failure(error));
    }
}

export function* deleteBook({ id }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        yield call(axios, {
            method: 'DELETE',
            url: `${apiUrl}/api/bookstack/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        yield put(removeBook.success(id));
    } catch (error) {
        yield put(removeBook.failure(error));
    }
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
    try {
        const response = yield call(axios, {
            method: 'POST',
            url: `${apiUrl}/api/bookstackcategory/`,
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
    } catch (error) {
        yield put(stackDetailActions.addCategory.failure(error));
    }
}

export function* deleteCategory({ bookstackId, categoryId }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        yield call(axios, {
            method: 'DELETE',
            url: `${apiUrl}/api/bookstackcategory/${categoryId}/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        yield put(removeCategory.success(bookstackId, categoryId));
    } catch (error) {
        yield put(removeCategory.failure(error));
    }
}

export function* addBook({ bookId, stackId }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        yield call(axios, {
            url: `${apiUrl}/api/bookstack/`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            data: {
                categories: [],
                book_id: bookId,
                stack_id: stackId,
            },
        });
        yield put(stackDetail.editing());
        yield put(stackDetailActions.addBook.success());
    } catch (error) {
        yield put(stackDetailActions.addBook.failure(error));
    }
}

const initialize = initializeSaga(path, loadStack, match => ({ id: match.params.id }));

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
    initialize,
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchAddCategory,
    watchAddNewCategory,
    watchDeleteCategory,
    watchAddBook,
];
