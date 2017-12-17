import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import {PUBLISHER, publisher as publisherActions} from '../actions/PublisherDetail';


export function* loadPublisher({id}) {
    let {apiUrl} = yield select(getCredentials);
    let publisher = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/publisher/${id}/`,
    });
    yield put(publisherActions.success(publisher.data));
}

function* watchLoadPublisher() {
    yield takeEvery(PUBLISHER.REQUEST, loadPublisher)
}

export default [
    watchLoadPublisher,
];
