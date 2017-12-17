import axios from 'axios';

import {put, call, select, takeEvery} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as appActions from '../actions/App'

function* getStoredToken() {
    // These thunks are required to prevent 'illegal invocation' error
    let token = yield call(() => localStorage.getItem('token'));
    return token;
}

function* storeToken(token) {
    yield call(() => localStorage.setItem('token', token));
}

function* removeToken(token) {
    yield call(() => localStorage.removeItem('token'));
}

export function* initialize() {
    let token = yield call(getStoredToken);
    yield put(appActions.setToken(token));
}

export function* login({user, pass, save}) {
    let {apiUrl} = yield select(getCredentials);
    let response = yield call(axios, {
        method: 'POST',
        url: `${apiUrl}/api-token-auth/`,
        data: {
            username: user,
            password: pass,
        },
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let login = response.data;
    let token = login.token;
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
    yield takeEvery(appActions.APP_INITIALIZE, initialize)
}

function* watchLogin() {
    yield takeEvery(appActions.APP_LOGIN, login)
}

function* watchLogoff() {
    yield takeEvery(appActions.APP_LOGOFF, logoff)
}

export default [
    watchInitialize,
    watchLogin,
    watchLogoff,
];