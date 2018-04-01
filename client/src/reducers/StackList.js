import Immutable from 'immutable';

import { STACK } from '../actions/StackList';

export default function stackListReducer(state = Immutable.List(), action) {
    switch (action.type) {
    case STACK.SUCCESS:
        return Immutable.fromJS(action.stack);
    case STACK.CLEAR:
        return Immutable.List();
    default:
        return state;
    }
}
