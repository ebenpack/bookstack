import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from '../utils/sagasUtils';
import * as categoryActions from './addCategoryModule';

export function* addCategory({ category }) {
    const { apiUrl, token } = yield select(getCredentials);
    try {
        const { data } = yield call(axios, {
            method: 'POST',
            url: `${apiUrl}/api/category/`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            data: {
                category,
            },
        });
        yield put(categoryActions.addCategory.success(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(categoryActions.addCategory.failure(error));
    }
}

export function* setAutoSuggestCategories({ query }) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/category/?search=${query}`,
        });
        yield put(categoryActions.categorySearch.success(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Category search request failed' };
        yield put(categoryActions.categorySearch.failure(error));
    }
}

export function* watchAddCategory() {
    yield takeEvery(categoryActions.ADD.REQUEST, addCategory);
}

export function* watchSetAutoSuggestCategories() {
    yield takeEvery(categoryActions.SEARCH.REQUEST, setAutoSuggestCategories);
}


export default [
    watchAddCategory,
    watchSetAutoSuggestCategories,
];
