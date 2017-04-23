import Immutable from 'immutable';

import * as appActions from '../actions/App';

const defaultState = Immutable.Map({apiUrl: '', token: ''});

export default function storeReducer(state = defaultState, action) {
    switch (action.type) {
        case appActions.APP_SET_API_URL:
            return state.set('apiUrl', action.apiUrl);
        case appActions.APP_SET_TOKEN:
            return state.set('token', action.token ? action.token : '');
        case appActions.APP_DELETE_TOKEN:
            return state.set('token', '');
        default:
            return state;
    }
}