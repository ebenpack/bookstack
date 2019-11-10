import { Record } from 'immutable';
import { AnyAction } from 'redux';

import { IApp } from './types';

// Actions

export const APP_INITIALIZE = 'APP_INITIALIZE'; // request
export const APP_SET_STATIC_PATH = 'APP_SET_STATIC_PATH';
export const APP_SET_API_URL = 'APP_SET_API_URL'; // set state
export const APP_SET_TOKEN = 'APP_SET_TOKEN'; // set state
export const APP_DELETE_TOKEN = 'APP_DELETE_TOKEN'; // set state
export const APP_LOGOFF = 'APP_LOGOFF'; // request
export const APP_LOGIN_SET_USER = 'APP_LOGIN_SET_USER';
export const APP_LOGIN_SET_PASS = 'APP_LOGIN_SET_PASS';
export const APP_LOGIN_SET_SAVE = 'APP_LOGIN_SET_SAVE';
export const APP_LOGIN_CLEAR = 'APP_LOGIN_CLEAR';


export const APP_LOGIN_REQUEST = 'APP_LOGIN_LOGIN_REQUEST';
export const APP_LOGIN_SUCCESS = 'APP_LOGIN_LOGIN_SUCCESS';
export const APP_LOGIN_FAILURE = 'APP_LOGIN_LOGIN_FAILURE';

export const initialize = () =>
    ({ type: APP_INITIALIZE });

export const setStaticPath = (staticPath: string) =>
    ({ type: APP_SET_STATIC_PATH, staticPath });

export const setApiUrl = (apiUrl: string) =>
    ({ type: APP_SET_API_URL, apiUrl });

export const setToken = (token: string) =>
    ({ type: APP_SET_TOKEN, token });

export const deleteToken = () =>
    ({ type: APP_DELETE_TOKEN });

export interface AppLoginRequestAction {
    type: typeof APP_LOGIN_REQUEST
    user: string,
    pass: string,
    save: boolean
}

export interface AppLoginSuccessAction {
    type: typeof APP_LOGIN_SUCCESS
}

export interface AppLoginFailureAction {
    type: typeof APP_LOGIN_FAILURE,
    error: string
}

export const appLoginRequest: (user: string, pass: string, save: boolean) => AppLoginRequestAction =
    (user, pass, save) => ({ type: APP_LOGIN_REQUEST, user, pass, save });

export const appLoginSuccess: () => AppLoginSuccessAction =
    () => ({ type: APP_LOGIN_SUCCESS });

export const appLoginFailure: (error: string) => AppLoginFailureAction =
    (error) => ({ type: APP_LOGIN_FAILURE, error });

export const logoff = () =>
    ({ type: APP_LOGOFF });

export const updateUser = (user: string) =>
    ({ type: APP_LOGIN_SET_USER, user });

export const updatePass = (pass: string) =>
    ({ type: APP_LOGIN_SET_PASS, pass });

export const updateSave = (save: boolean) =>
    ({ type: APP_LOGIN_SET_SAVE, save });

export const clearLogin = () =>
    ({ type: APP_LOGIN_CLEAR });

// State

export const defaultAppRecordValue = {
    apiUrl: '',
    token: '',
    user: '',
    pass: '',
    save: true,
    loginError: false,
    staticPath: '',
};

type AppParams = {
    apiUrl?: string;
    token?: string;
    user?: string;
    pass?: string;
    save?: boolean;
    loginError?: boolean;
    staticPath?: string;
}

export class AppRecord extends Record(defaultAppRecordValue) implements IApp {
    constructor(params?: AppParams) {
        params ? super(params) : super();
    }
    with(values: AppParams) {
        return this.merge(values) as this;
    }
}

export const initialState = new AppRecord(defaultAppRecordValue);

export default function storeReducer(state = initialState, action: AnyAction) {
    switch (action.type) {
    case APP_SET_API_URL:
        return state.with({ apiUrl: action.apiUrl });
    case APP_SET_STATIC_PATH:
        return state.with({ staticPath: action.staticPath });
    case APP_SET_TOKEN:
        return state.with({ token: action.token ? action.token : '' });
    case APP_DELETE_TOKEN:
        return state.with({ token: '' });
    case APP_LOGIN_SET_USER:
        return state.with({ user: action.user });
    case APP_LOGIN_SET_PASS:
        return state.with({ pass: action.pass });
    case APP_LOGIN_SET_SAVE:
        return state.with({ save: action.save });
    case APP_LOGIN_SUCCESS:
        return state.with({ loginError: false });
    case APP_LOGIN_FAILURE:
        return state.with({ loginError: true });
    case APP_LOGIN_CLEAR:
        return state.with({
            user: '',
            pass: '',
        });
    default:
        return state;
    }
}
