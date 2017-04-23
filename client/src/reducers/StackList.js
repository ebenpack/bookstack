import Immutable from 'immutable';

import * as stackListActions from '../actions/StackList';

export default function stackListReducer(state = Immutable.List(), action) {
    switch (action.type) {
        case stackListActions.STACK_SET:
            return Immutable.fromJS(action.stack);
        case stackListActions.STACK_UNLOAD:
            return Immutable.List();
        default:
            return state;
    }
}