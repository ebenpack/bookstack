import Immutable from 'immutable';

export default function stackListReducer(state = Immutable.List(), action) {
    switch (action.type) {
        case 'LOAD_STACK':
            return Immutable.fromJS(action.value);
        case 'UNLOAD_STACK':
            return Immutable.List();
        default:
            return state;
    }
}