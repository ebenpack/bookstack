import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from './utils';

import * as authorDetailActions from '../actions/AuthorDetail';

const { AUTHOR } = authorDetailActions;

export function* loadAuthor({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const author = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/author/${id}/`,
    });
    yield put(authorDetailActions.setAuthor(author.data));
}

function* watchLoadAuthor() {
    yield takeEvery(AUTHOR.REQUEST, loadAuthor);
}

export default function* rootSaga() {
    yield [
        watchLoadAuthor,
    ];
}
