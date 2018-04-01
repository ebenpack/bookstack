import Immutable from 'immutable';

// Actions

import { makeAction, createRequestTypes } from '../utils/moduleUtils';

export const AUTHOR = createRequestTypes('AUTHOR', 'AUTHOR');

export const author = {
    request: id => makeAction(AUTHOR.REQUEST, { id }),
    success: auth => makeAction(AUTHOR.SUCCESS, { author: auth }),
};

// State

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
});

export default function AuthorDetailReducer(state = defaultState, action) {
    switch (action.type) {
    case AUTHOR.SUCCESS:
        return Immutable.fromJS(action.author);
    default:
        return state;
    }
}
