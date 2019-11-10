import { put, call, select, takeEvery } from 'redux-saga/effects';

import { axiosCall, getCredentials } from '../utils/sagasUtils';
import {
    publisherSuccess,
    publisherFailure,
    PublisherRequestAction,
    PUBLISHER_INITIALIZE,
    PUBLISHER_REQUEST,
} from './publisherDetailModule';

export function* loadPublisher({ id }: PublisherRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const publisher = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/publisher/${id}/`,
        });
        yield put(publisherSuccess(publisher.data));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: 'Add category request failed' };
        yield put(publisherFailure(error));
    }
}

export function* initialize() {
    yield takeEvery(PUBLISHER_INITIALIZE, loadPublisher);
}

export function* watchLoadPublisher() {
    yield takeEvery(PUBLISHER_REQUEST, loadPublisher);
}

export default [initialize, watchLoadPublisher];
