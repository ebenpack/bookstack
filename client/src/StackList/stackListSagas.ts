import { put, call, select, takeEvery } from 'redux-saga/effects';

import { axiosCall } from '../utils/sagasUtils';
import { getCredentials } from '../utils/sagasUtils';
import {
    stackSuccess,
    stackFailure,
    STACK_REQUEST,
    STACK_INITIALIZE
} from './stackListModule';
import { List } from 'immutable';
import { StackDetailRecord, StackDetailParams } from '../StackDetail/stackDetailModule';

export function* loadStackList() {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/stack/`,
        });
        yield put(stackSuccess(
            List(data.map((stack: StackDetailParams) => new StackDetailRecord(stack)))
        ));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackFailure(error));
    }
}

export function* watchLoadStacklist() {
    yield takeEvery([STACK_REQUEST, STACK_INITIALIZE], loadStackList);
}

export default [
    watchLoadStacklist,
];
