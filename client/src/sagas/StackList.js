import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from './utils';

import { STACK, stack as stackActions } from '../actions/StackList';

export function* loadStackList() {
    const { apiUrl } = yield select(getCredentials);
    const stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/`,
    });
    yield put(stackActions.success(stack.data));
}

function* watchLoadStacklist() {
    yield takeEvery(STACK.REQUEST, loadStackList);
}

export default [
    watchLoadStacklist,
];
