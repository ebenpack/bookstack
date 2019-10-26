import Immutable from 'immutable';

import { makeAction, createRequestTypes } from '../utils/moduleUtils';

// Actions

export const AUTHOR = createRequestTypes('AUTHOR', 'AUTHOR');

export const author = {
    request: id =>
        makeAction(AUTHOR.REQUEST, { id }),
    success: auth =>
        makeAction(AUTHOR.SUCCESS, { author: auth }),
    failure: error =>
        makeAction(AUTHOR.FAILURE, { error }),
};

// State

export const initialState = Immutable.fromJS({
    books: [],
    name: '',
});

export default function AuthorDetailReducer(state = initialState, action) {
    switch (action.type) {
    case AUTHOR.SUCCESS:
        return Immutable.fromJS(action.author);
    default:
        return state;
    }
}
