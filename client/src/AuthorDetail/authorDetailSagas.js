import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials, initializeSaga } from '../utils/sagasUtils';
import { path } from './AuthorDetailRoute';
import { AUTHOR, author as authorActions } from './authorDetailModule';

export function* loadAuthor({ id }) {
    const { apiUrl } = yield select(getCredentials);
    const author = yield call(axios, {
        method: 'GET',
        url: `${apiUrl}/api/author/${id}/`,
    });
    yield put(authorActions.success(author.data));
}

const initialize = initializeSaga(path, loadAuthor, match => ({ id: match.params.id }));

function* watchLoadAuthor() {
    yield takeEvery(AUTHOR.REQUEST, loadAuthor);
}

export default [
    initialize,
    watchLoadAuthor,
];
