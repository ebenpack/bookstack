import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as publisherDetailActions from '../actions/PublisherDetail';


export function* loadPublisher({id}) {
    let {apiUrl} = yield select(getCredentials);
    let publisher = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/publisher/${id}/`,
        contentType: 'application/json',
        type: 'json',
    });
    yield put(publisherDetailActions.setPublisher(publisher.data));
}

function* watchLoadPublisher() {
    yield takeEvery(publisherDetailActions.PUBLISHER_LOAD, loadPublisher)
}

export default [
    watchLoadPublisher,
];
