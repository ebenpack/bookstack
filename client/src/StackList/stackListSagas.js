import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials, initializeSaga } from '../utils/sagasUtils';
import { STACK, stack as stackActions } from './stackListModule';
import { path } from './StackListRoute';

export function* loadStackList() {
    const { apiUrl } = yield select(getCredentials);
    const stack = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/stack/`,
    });
    yield put(stackActions.success(stack.data));
}

const initialize = initializeSaga(path, loadStackList, match => null);

function* watchLoadStacklist() {
    yield takeEvery(STACK.REQUEST, loadStackList);
}

export default [
    watchLoadStacklist,
    initialize,
];
