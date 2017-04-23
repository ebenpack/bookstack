import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as categoryActions from '../actions/AddCategory';
import * as stackDetailActions from '../actions/StackDetail';

export function* addCategory({bookstackId, categoryId}) {
    let {apiUrl, token} = yield select(getCredentials);
    let category = yield call(axios, {
        method: 'POST',
        url: `${apiUrl}/api/booksetcategory/`,
        type: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: {
            bookstack: bookstackId,
            category: categoryId,
        }
    });
    yield put(stackDetailActions.updateCategory(category.data));
}

export function* addNewCategory({category, bookstackId}) {
    let {apiUrl, token} = yield select(getCredentials);
    let respose = yield call(axios, {
        method: "POST",
        url: `${apiUrl}/api/category/`,
        type: 'json',
        contentType: 'application/json',
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: {
            category: category
        }
    });
    let newCategory = respose.data;
    yield put(categoryActions.addCategory(bookstackId, newCategory.id));
}

export function* setAutoSuggestCategories({query}) {
    let {apiUrl} = yield select(getCredentials);
    let autoSuggestCategories = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/category/?search=${query}`,
        type: 'json',
        contentType: 'application/json'
    });
    yield put(categoryActions.addAutoSuggestCategories(autoSuggestCategories.data));
}

function* watchAddCategory() {
    yield takeEvery(categoryActions.ADD_CATEGORY, addCategory)
}

function* watchAddNewCategory() {
    yield takeEvery(categoryActions.ADD_CATEGORY_ADD_NEW_CATEGORY, addNewCategory)
}

function* watchSetAutoSuggestCategories() {
    yield takeEvery(categoryActions.ADD_CATEGORY_SET_AUTOCOMPLETE_SUGGESTIONS, setAutoSuggestCategories)
}


export default [
    watchAddCategory,
    watchAddNewCategory,
    watchSetAutoSuggestCategories,
];
