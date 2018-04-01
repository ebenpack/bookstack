import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from '../utils/sagasUtils';

import { AUTHOR, author as authorActions } from './authorDetailModule';

export function* loadAuthor({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const author = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/author/${id}/`,
    });
    yield put(authorActions.success(author.data));
}

function* watchLoadAuthor() {
    yield takeEvery(AUTHOR.REQUEST, loadAuthor);
}

export default [
    watchLoadAuthor,
];
