import { put, call, select, takeEvery } from 'redux-saga/effects';

import { axiosCall, getCredentials } from '../utils/sagasUtils';
import {
    authorSuccess,
    authorFailure,
    AuthorRequestAction,
    AUTHOR_REQUEST,
    AUTHOR_INITIALIZE
} from './authorDetailModule';

export function* loadAuthor({ id }: AuthorRequestAction) {
    const { apiUrl } = yield select(getCredentials);
    try {
        const author = yield call(axiosCall, {
            method: 'GET',
            url: `${apiUrl}/api/author/${id}/`,
        });
        yield put(authorSuccess(author.data));
    } catch (err) {
        const error = err && err.response && err.response.data
            ? err.response.data
            : { error: 'Add category request failed' };
        yield put(authorFailure(error));
    }
}

export function* watchLoadAuthor() {
    yield takeEvery([AUTHOR_REQUEST, AUTHOR_INITIALIZE], loadAuthor);
}

export default [
    watchLoadAuthor,
];
