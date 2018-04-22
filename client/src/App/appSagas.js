import axios from 'axios';
import { put, call, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { getCredentials } from '../utils/sagasUtils';
import { path } from '../StackList/StackListRoute';
import * as appActions from './appModule';

function* getStoredToken() {
    const token = yield call([window.localStorage, window.localStorage.getItem], 'token');
    return token;
}

function* storeToken(token) {
    yield call([window.localStorage, window.localStorage.setItem], 'token', token);
}

function* removeToken() {
    yield call([window.localStorage, window.localStorage.removeItem], 'token');
}

export function* initialize() {
    const token = yield call(getStoredToken);
    yield put(appActions.setToken(token));
}

export function* login({ user, pass, save }) {
    const { apiUrl } = yield select(getCredentials);
    try {
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
        yield put(appActions.clearLogin());
        yield put(push(path));
        yield put(appActions.setToken(token));
        yield put(appActions.login.success());
    } catch (error) {
        yield put(appActions.login.failure());
    }
}

export function* logoff() {
    yield call(removeToken);
    yield put(appActions.deleteToken());
}

export function* watchInitialize() {
    yield takeEvery(appActions.APP_INITIALIZE, initialize);
}

export function* watchLogin() {
    yield takeEvery(appActions.APP_LOGIN.REQUEST, login);
}

export function* watchLogoff() {
    yield takeEvery(appActions.APP_LOGOFF, logoff);
}

export default [
    watchInitialize,
    watchLogin,
    watchLogoff,
];
