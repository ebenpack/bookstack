import axios from 'axios';
import { delay } from 'redux-saga/effects';
import { put, call, select, take, takeEvery, race } from 'redux-saga/effects';

import { getCredentials, getCurrentTime, initializeSaga } from '../utils/sagasUtils';
import { path } from './StackDetailRoute';
import {
    STACK_DETAIL,
    POSITION,
    READ_STATE,
    ADD_BOOK,
    REMOVE_BOOK,
    ADD_CATEGORY,
    ADD_NEW_CATEGORY,
    REMOVE_CATEGORY,
    addBook as addBookAction,
    addCategory as addCategoryAction,
    readState,
    stackDetail,
    position,
    removeBook,
    removeCategory,
} from './stackDetailModule';
import * as categoryActions from '../AddCategory/addCategoryModule';

const { ADD } = categoryActions;

export function* loadStack({ id }) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const stack = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/stack/${id}/`,
        });
        yield put(stackDetail.success(stack.data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetail.failure(error));
    }
}

export function* updateReadState({ bookId, newReadState }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const response = yield call(axios, {
            method: 'PATCH',
            url: `${apiUrl}/api/bookstack/${bookId}/`,
            data: {
                read: newReadState,
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        const { read } = response.data;
        yield put(readState.success(bookId, read));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(readState.failure(error));
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
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
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
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
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
            yield put(addCategoryAction.request(bookstackId, action.category.id));
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
        yield put(addCategoryAction.success(response.data.bookstack, response.data.category));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(addCategoryAction.failure(error));
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
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
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
        yield put(addBookAction.success());
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(addBookAction.failure(error));
    }
}

export const initialize = initializeSaga(path, loadStack, match => ({ id: match.params.id }));

export function* watchLoadStack() {
    yield takeEvery(STACK_DETAIL.REQUEST, loadStack);
}

export function* watchUpdateReadState() {
    yield takeEvery(READ_STATE.REQUEST, updateReadState);
}

export function* watchUpdatePosition() {
    yield takeEvery(POSITION.REQUEST, updatePosition);
}

export function* watchDeleteBook() {
    yield takeEvery(REMOVE_BOOK.REQUEST, deleteBook);
}

export function* watchAddCategory() {
    yield takeEvery(ADD_CATEGORY.REQUEST, addCategory);
}

export function* watchAddNewCategory() {
    yield takeEvery(ADD_NEW_CATEGORY.REQUEST, addNewCategory);
}

export function* watchDeleteCategory() {
    yield takeEvery(REMOVE_CATEGORY.REQUEST, deleteCategory);
}

export function* watchAddBook() {
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
