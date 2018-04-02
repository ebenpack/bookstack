import Immutable from 'immutable';

// Actions

import { makeAction } from '../utils/moduleUtils';

export const APP_INITIALIZE = 'APP_INITIALIZE'; // request
export const APP_SET_STATIC_PATH = 'APP_SET_STATIC_PATH';
export const APP_SET_API_URL = 'APP_SET_API_URL'; // set state
export const APP_SET_TOKEN = 'APP_SET_TOKEN'; // set state
export const APP_DELETE_TOKEN = 'APP_DELETE_TOKEN'; // set state
export const APP_LOGIN = 'APP_LOGIN'; // request
export const APP_LOGOFF = 'APP_LOGOFF'; // request
export const APP_LOGIN_SET_USER = 'APP_LOGIN_SET_USER';
export const APP_LOGIN_SET_PASS = 'APP_LOGIN_SET_PASS';
export const APP_LOGIN_SET_SAVE = 'APP_LOGIN_SET_SAVE';
export const APP_LOGIN_CLEAR = 'APP_LOGIN_CLEAR';

export const initialize = () =>
    makeAction(APP_INITIALIZE);

export const setStaticPath = staticPath =>
    makeAction(APP_SET_STATIC_PATH, { staticPath });

export const setApiUrl = apiUrl =>
    makeAction(APP_SET_API_URL, { apiUrl });

export const setToken = token =>
    makeAction(APP_SET_TOKEN, { token });

export const deleteToken = () =>
    makeAction(APP_DELETE_TOKEN);

export const login = (user, pass, save) =>
    makeAction(APP_LOGIN, { user, pass, save });

export const logoff = () =>
    makeAction(APP_LOGOFF);

export const updateUser = user => makeAction(APP_LOGIN_SET_USER, { user });
export const updatePass = pass => makeAction(APP_LOGIN_SET_PASS, { pass });
export const updateSave = save => makeAction(APP_LOGIN_SET_SAVE, { save });
export const clearLogin = () => makeAction(APP_LOGIN_CLEAR);

// State

const defaultState = Immutable.Map({
    apiUrl: '',
    token: '',
    user: '',
    pass: '',
    save: true,
});

export default function storeReducer(state = defaultState, action) {
    switch (action.type) {
    case APP_SET_API_URL:
        return state.set('apiUrl', action.apiUrl);
    case APP_SET_STATIC_PATH:
        return state.set('staticPath', action.staticPath);
    case APP_SET_TOKEN:
        return state.set('token', action.token ? action.token : '');
    case APP_DELETE_TOKEN:
        return state.set('token', '');
    case APP_LOGIN_SET_USER:
        return state.set('user', action.user);
    case APP_LOGIN_SET_PASS:
        return state.set('pass', action.pass);
    case APP_LOGIN_SET_SAVE:
        return state.set('save', action.save);
    case APP_LOGIN_CLEAR:
        return state.merge({
            user: '',
            pass: '',
        });
    default:
        return state;
    }
}
