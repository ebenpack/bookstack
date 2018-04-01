import { makeAction } from './utils';

export const APP_INITIALIZE = 'APP_INITIALIZE'; // request

export const APP_SET_API_URL = 'APP_SET_API_URL'; // set state

export const APP_SET_TOKEN = 'APP_SET_TOKEN'; // set state

export const APP_DELETE_TOKEN = 'APP_DELETE_TOKEN'; // set state

export const APP_LOGIN = 'APP_LOGIN'; // request

export const APP_LOGOFF = 'APP_LOGOFF'; // request

export const initialize = () =>
    makeAction(APP_INITIALIZE);

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
