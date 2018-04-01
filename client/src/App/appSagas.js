import axios from 'axios';

import { put, call, select, takeEvery } from 'redux-saga/effects';

import { getCredentials } from '../utils/sagasUtils';

import * as appActions from './appModule';

function* getStoredToken() {
    // These thunks are required to prevent 'illegal invocation' error
    const token = yield call(() => window.localStorage.getItem('token'));
    return token;
}

function* storeToken(token) {
    yield call(() => window.localStorage.setItem('token', token));
}

function* removeToken() {
    yield call(() => window.localStorage.removeItem('token'));
}

export function* initialize() {
    const token = yield call(getStoredToken);
    yield put(appActions.setToken(token));
}

export function* login({ user, pass, save }) {
    const { apiUrl } = yield select(getCredentials);
    const response = yield call(axios, {
        method: 'POST',
        url: `${apiUrl}/api-token-auth/`,
        data: {
            username: user,
            password: pass,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const { token } = response.data;
    if (save) {
        yield call(storeToken, token);
    }
    yield put(appActions.setToken(token));
}

export function* logoff() {
    yield call(removeToken);
    yield put(appActions.deleteToken());
}

function* watchInitialize() {
    yield takeEvery(appActions.APP_INITIALIZE, initialize);
}

function* watchLogin() {
    yield takeEvery(appActions.APP_LOGIN, login);
}

function* watchLogoff() {
    yield takeEvery(appActions.APP_LOGOFF, logoff);
}

export default [
    watchInitialize,
    watchLogin,
    watchLogoff,
];
