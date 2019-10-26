import { put, call, select, takeEvery } from 'redux-saga/effects';

import { axiosCall } from '../utils/sagasUtils';
import { getCredentials } from '../utils/sagasUtils';
import { 
    stackSuccess,
    stackFailure,
    STACK_REQUEST 
} from './stackListModule';
import { path } from './StackListRoute';

export function* loadStackList() {
    const { apiUrl } = yield select(getCredentials);
    try {
        const { data } = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/stack/`,
        });
        yield put(stackSuccess(data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(stackFailure(error));
    }
}

export function* watchLoadStacklist() {
    yield takeEvery(STACK_REQUEST, loadStackList);
}

export default [
    watchLoadStacklist,
];
