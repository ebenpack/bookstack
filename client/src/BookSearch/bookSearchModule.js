import Immutable from 'immutable';

import { makeAction, createRequestTypes, SET, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

// Actions

// TODO: CONSOLIDATE ALL BOOK STUFF?
export const BOOK_SEARCH = createRequestTypes('BOOK_SEARCH', 'SEARCH', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const QUERY = createRequestTypes('BOOK_SEARCH', 'QUERY', [SET, CLEAR]);

export const bookSearch = {
    request: query =>
        makeAction(BOOK_SEARCH.REQUEST, { query }),
    success: books =>
        makeAction(BOOK_SEARCH.SUCCESS, { books }),
    failure: error =>
        makeAction(BOOK_SEARCH.FAILURE, { error }),
    clear: () =>
        makeAction(BOOK_SEARCH.CLEAR),
};

export const query = {
    set: value => makeAction(QUERY.SET, { query: value }),
    clear: () => makeAction(QUERY.CLEAR, {}),
};

// State

export const initialState = Immutable.fromJS({
    query: '',
    books: [],
});

export default function BookSearchReducer(state = initialState, action) {
    switch (action.type) {
    case BOOK_SEARCH.SUCCESS:
        return state.set('books', action.books);
    case BOOK_SEARCH.CLEAR:
        return state.set('books', new Immutable.List());
    case QUERY.SET:
        return state.set('query', action.query);
    case QUERY.CLEAR:
        return state.set('query', '');
    default:
        return state;
    }
}
