import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials, initializeSaga } from '../utils/sagasUtils';
import { path } from './PublisherDetailRoute';
import { PUBLISHER, publisher as publisherActions } from './publisherDetailModule';


export function* loadPublisher({ id }) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const publisher = yield call(axios, {
            method: 'GET',
            url: `${apiUrl}/api/publisher/${id}/`,
        });
        yield put(publisherActions.success(publisher.data));
    } catch (error) {
        yield put(publisherActions.failure(error));
    }
}

const initialize = initializeSaga(path, loadPublisher, match => ({ id: match.params.id }));

export function* watchLoadPublisher() {
    yield takeEvery(PUBLISHER.REQUEST, loadPublisher);
}

export default [
    initialize,
    watchLoadPublisher,
];
