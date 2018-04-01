import Immutable from 'immutable';

// Actions

import { makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

// TODO: CONSOLIDATE ALL BOOK STUFF?
export const BOOK_SEARCH = createRequestTypes('BOOK_SEARCH', 'SEARCH', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const bookSearch = {
    request: query => makeAction(BOOK_SEARCH.REQUEST, { query }),
    success: books => makeAction(BOOK_SEARCH.SUCCESS, { books }),
    clear: () => makeAction(BOOK_SEARCH.CLEAR),
};

// State

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0,
});

export default function BookSearchReducer(state = defaultState, action) {
    switch (action.type) {
    case BOOK_SEARCH.SUCCESS:
        return Immutable.fromJS({ books: action.books });
    case BOOK_SEARCH.CLEAR:
        return Immutable.fromJS({ books: [] });
    default:
        return state;
    }
}
