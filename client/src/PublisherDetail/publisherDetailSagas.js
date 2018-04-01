import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from '../utils/sagasUtils';

import { PUBLISHER, publisher as publisherActions } from './publisherDetailModule';


export function* loadPublisher({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const publisher = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/publisher/${id}/`,
    });
    yield put(publisherActions.success(publisher.data));
}

function* watchLoadPublisher() {
    yield takeEvery(PUBLISHER.REQUEST, loadPublisher);
}

export default [
    watchLoadPublisher,
];
