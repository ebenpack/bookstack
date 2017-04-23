import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as authorDetailActions from '../actions/AuthorDetail';

export function* loadAuthor({id}) {
    let {apiUrl} = yield select(getCredentials);
    let author = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/author/${id}/`,
        contentType: 'application/json',
        type: 'json',
    });
    yield put(authorDetailActions.setAuthor(author.data));
}

function* watchLoadAuthor() {
    yield takeEvery(authorDetailActions.AUTHOR_LOAD, loadAuthor)
}

export default function* rootSaga() {
    yield [
        watchLoadAuthor,
    ];
}