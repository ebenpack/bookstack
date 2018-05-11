import Immutable from 'immutable';

// Actions

import { makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

export const STACK = createRequestTypes('STACK', 'STACK', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const stack = {
    request: () =>
        makeAction(STACK.REQUEST),
    success: stck =>
        makeAction(STACK.SUCCESS, { stack: stck }),
    failure: error =>
        makeAction(STACK.FAILURE, { error }),
    clear: () => makeAction(STACK.CLEAR),
};

// State

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
