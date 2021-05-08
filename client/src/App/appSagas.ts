import { put, call, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { push } from "connected-react-router";

import { axiosCall, getCredentials } from "../utils/sagasUtils";
import { path } from "../StackList/StackListRoute";
import {
    appLoginSuccess,
    appLoginFailure,
    setToken,
    clearLogin,
    deleteToken,
    AppLoginRequestAction,
    APP_LOGIN_REQUEST,
    APP_INITIALIZE,
    APP_LOGOFF,
} from "./appModule";

function* getStoredToken(): SagaIterator {
    const token = yield call(
        [window.localStorage, window.localStorage.getItem],
        "token"
    );
    return token;
}

function* storeToken(token: string) {
    yield call(
        [window.localStorage, window.localStorage.setItem],
        "token",
        token
    );
}

function* removeToken() {
    yield call([window.localStorage, window.localStorage.removeItem], "token");
}

export function* initialize(): SagaIterator {
    const token = yield call(getStoredToken);
    yield put(setToken(token));
}

export function* login({
    user,
    pass,
    save,
}: AppLoginRequestAction): SagaIterator {
    const { apiUrl } = yield select(getCredentials);
    try {
        const response = yield call(axiosCall, {
            method: "POST",
            url: `${apiUrl}/api-token-auth/`,
            data: {
                username: user,
                password: pass,
            },
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { token } = response.data;
        if (save) {
            yield call(storeToken, token);
        }
        yield put(clearLogin());
        yield put(push(path));
        yield put(setToken(token));
        yield put(appLoginSuccess());
    } catch (error) {
        yield put(appLoginFailure(error));
    }
}

export function* logoff() {
    yield call(removeToken);
    yield put(deleteToken());
}

export function* watchInitialize() {
    yield takeEvery(APP_INITIALIZE, initialize);
}

export function* watchLogin() {
    yield takeEvery(APP_LOGIN_REQUEST, login);
}

export function* watchLogoff() {
    yield takeEvery(APP_LOGOFF, logoff);
}

export default [watchInitialize, watchLogin, watchLogoff];
