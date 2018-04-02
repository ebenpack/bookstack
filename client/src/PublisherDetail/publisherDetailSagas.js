import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials, initializeSaga } from '../utils/sagasUtils';
import { path } from './PublisherDetailRoute';
import { PUBLISHER, publisher as publisherActions } from './publisherDetailModule';


export function* loadPublisher({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const publisher = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/publisher/${id}/`,
    });
    yield put(publisherActions.success(publisher.data));
}

const initialize = initializeSaga(path, loadPublisher, match => ({ id: match.params.id }));

function* watchLoadPublisher() {
    yield takeEvery(PUBLISHER.REQUEST, loadPublisher);
}

export default [
    initialize,
    watchLoadPublisher,
];
