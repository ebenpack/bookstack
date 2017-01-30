import Immutable from 'immutable';

const defaultState = Immutable.Map({apiUrl: '', token: ''});

export default function storeReducer(state = defaultState, action) {
    switch (action.type) {
        case 'APP_SET_APIURL':
            return state.set('apiUrl', action.apiUrl);
        case 'APP_SET_TOKEN':
            return state.set('token', action.token);
        case 'APP_DELETE_TOKEN':
            return state.set('token', '');
        default:
            return state;
    }
}