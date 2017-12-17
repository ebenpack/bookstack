import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import {AUTHOR} from '../actions/AuthorDetail';

export function* loadAuthor({id}) {
    let {apiUrl} = yield select(getCredentials);
    let author = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/author/${id}/`,
    });
    yield put(authorDetailActions.setAuthor(author.data));
}

function* watchLoadAuthor() {
    yield takeEvery(AUTHOR.REQUEST, loadAuthor)
}

export default function* rootSaga() {
    yield [
        watchLoadAuthor,
    ];
}