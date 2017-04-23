import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as stackListActions from '../actions/StackList';

export function* loadStackList() {
    let {apiUrl} = yield select(getCredentials);
    let stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/`,
        contentType: 'application/json',
        type: 'json'
    });
    yield put(stackListActions.setStack(stack.data));
}

function* watchLoadStacklist() {
    yield takeEvery(stackListActions.STACK_LOAD, loadStackList)
}

export default [
    watchLoadStacklist,
];
