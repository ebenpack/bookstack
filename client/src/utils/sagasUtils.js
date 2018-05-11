import { matchPath } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import { call, select, takeEvery } from 'redux-saga/effects';

import { pathNameSelector } from './routeUtils';
import { APP_INITIALIZE } from '../App/appModule';

export const getCredentials = store => ({
    apiUrl: store.appStore.get('apiUrl'),
    token: store.appStore.get('token'),
});

export const getCurrentTime = () => Date.now();

export const initializeSaga = (path, initFn, matchFn) => function* initialize() {
    yield takeEvery([APP_INITIALIZE, LOCATION_CHANGE], function* init() {
        const pathName = yield select(pathNameSelector);
        const match = yield call(matchPath, pathName, { path, exact: true });
        if (match) {
            yield call(initFn, matchFn(match));
        }
    });
};
