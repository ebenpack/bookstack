import { delay } from 'redux-saga/effects';
import { put, call, select, take, takeEvery, race } from 'redux-saga/effects';

import { axiosCall, getCredentials, getCurrentTime } from '../utils/sagasUtils';
import {
    stackDetailSuccess,
    stackDetailFailure,
    stackDetailEditing,
    stackDetailPositionSuccess,
    stackDetailPositionFailure,
    stackDetailReadStateSuccess,
    stackDetailReadStateFailure,
    stackDetailAddBookSuccess,
    stackDetailAddBookFailure,
    stackDetailRemoveBookSuccess,
    stackDetailRemoveBookFailure,
    stackDetailAddCategoryRequest,
    stackDetailAddCategorySuccess,
    stackDetailAddCategoryFailure,
    stackDetailRemoveCategorySuccess,
    stackDetailRemoveCategoryFailure,
    StackDetailRequestAction,
    StackDetailPositionRequestAction,
    StackDetailReadStateRequestAction,
    StackDetailAddBookRequestAction,
    StackDetailRemoveBookRequestAction,
    StackDetailAddCategoryRequestAction,
    StackDetailAddNewCategoryRequestAction,
    StackDetailRemoveCategoryRequestAction,
    STACK_DETAIL_INITIALIZE,
    STACK_DETAIL_REQUEST,
    STACK_DETAIL_READ_STATE_REQUEST,
    STACK_DETAIL_POSITION_REQUEST,
    STACK_DETAIL_REMOVE_BOOK_REQUEST,
    STACK_DETAIL_ADD_CATEGORY_REQUEST,
    STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST,
    STACK_DETAIL_REMOVE_CATEGORY_REQUEST,
    STACK_DETAIL_ADD_BOOK_REQUEST,
    StackDetailRecord,
} from './stackDetailModule';
import { 
    ADD_CATEGORY_ADD_SUCCESS, 
    addCategoryRequest 
} from '../AddCategory/addCategoryModule';
import { List } from 'immutable';
import { makeBookstack, makeCategory } from '../BookStack/bookstackModule';

export function* loadStack({ id }: StackDetailRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/stack/${id}/`,
        });
        const books = List(data.books.map(makeBookstack));
        const stackDetail = new StackDetailRecord({
            ...data,
            creation_date: new Date(data.creation_date),
            books
        });
        yield put(stackDetailSuccess(stackDetail));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailFailure(error));
    }
}

export function* updateReadState({ bookId, newReadState }: StackDetailReadStateRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const response = yield call(axiosCall, {
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
        yield put(stackDetailReadStateSuccess(bookId, read));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailReadStateFailure(error));
    }
}

export function* updatePosition({ id, from, to }: StackDetailPositionRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    const stackLength = yield select(store =>
        store.stackDetailStore.stackDetail.books.size );
    try {
        if (to > 0 && to <= stackLength) {
            yield call(axiosCall, {
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
            yield put(stackDetailPositionSuccess(id, from, to));
        }
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailPositionFailure(error));
    }
}

export function* deleteBook({ id }: StackDetailRemoveBookRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        yield call(axiosCall, {
            method: 'DELETE',
            url: `${apiUrl}/api/bookstack/${id}/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        yield put(stackDetailRemoveBookSuccess(id));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailRemoveBookFailure(error));
    }
}

export function* addNewCategory({ bookstackId, category }: StackDetailAddNewCategoryRequestAction) {
    yield put(addCategoryRequest(category));
    let now = yield call(getCurrentTime);
    const waitUntil = now + 2500;
    while (true) {
        now = yield call(getCurrentTime);
        const { action, timeout } = yield race({
            action: yield take(ADD_CATEGORY_ADD_SUCCESS),
            timeout: yield delay(waitUntil - now),
        });

        if (timeout) {
            break;
        } else if (action.category.category === category) {
            yield put(stackDetailAddCategoryRequest(bookstackId, action.category.id));
            break;
        }
    }
}

export function* addCategory({ bookstackId, categoryId }: StackDetailAddCategoryRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
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
        const category = makeCategory(data);
        yield put(stackDetailAddCategorySuccess(data.bookstack, category));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailAddCategoryFailure(error));
    }
}

export function* deleteCategory({ bookstackId, categoryId }: StackDetailRemoveCategoryRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        yield call(axiosCall, {
            method: 'DELETE',
            url: `${apiUrl}/api/bookstackcategory/${categoryId}/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });
        yield put(stackDetailRemoveCategorySuccess(bookstackId, categoryId));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailRemoveCategoryFailure(error));
    }
}

export function* addBook({ bookId, stackId }: StackDetailAddBookRequestAction) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
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
        yield put(stackDetailEditing());
        yield put(stackDetailAddBookSuccess(data.book));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackDetailAddBookFailure(error));
    }
}

export function* initialize() {
    yield takeEvery(STACK_DETAIL_INITIALIZE, loadStack);
}

export function* watchLoadStack() {
    yield takeEvery(STACK_DETAIL_REQUEST, loadStack);
}

export function* watchUpdateReadState() {
    yield takeEvery(STACK_DETAIL_READ_STATE_REQUEST, updateReadState);
}

export function* watchUpdatePosition() {
    yield takeEvery(STACK_DETAIL_POSITION_REQUEST, updatePosition);
}

export function* watchDeleteBook() {
    yield takeEvery(STACK_DETAIL_REMOVE_BOOK_REQUEST, deleteBook);
}

export function* watchAddCategory() {
    yield takeEvery(STACK_DETAIL_ADD_CATEGORY_REQUEST, addCategory);
}

export function* watchAddNewCategory() {
    yield takeEvery(STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST, addNewCategory);
}

export function* watchDeleteCategory() {
    yield takeEvery(STACK_DETAIL_REMOVE_CATEGORY_REQUEST, deleteCategory);
}

export function* watchAddBook() {
    yield takeEvery(STACK_DETAIL_ADD_BOOK_REQUEST, addBook);
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
