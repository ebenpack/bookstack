import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import {ADD, SEARCH} from '../actions/AddCategory';
import * as categoryActions from '../actions/AddCategory';

export function* addCategory({category}) {
    let {apiUrl, token} = yield select(getCredentials);
    let {data} = yield call(axios, {
        method: "POST",
        url: `${apiUrl}/api/category/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        data: {
            category: category
        }
    });
    yield put(categoryActions.addCategory.success(data))
}

export function* setAutoSuggestCategories({query}) {
    let {apiUrl} = yield select(getCredentials);
    let autoSuggestCategories = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/category/?search=${query}`,
    });
    yield put(categoryActions.categorySearch.success(autoSuggestCategories.data));
}

function* watchAddCategory() {
    yield takeEvery(ADD.REQUEST, addCategory)
}

function* watchSetAutoSuggestCategories() {
    yield takeEvery(SEARCH.REQUEST, setAutoSuggestCategories)
}


export default [
    watchAddCategory,
    watchSetAutoSuggestCategories,
];
