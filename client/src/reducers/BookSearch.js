import Immutable from 'immutable';

import * as bookSearchActions from '../actions/BookSearch';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function BookSearchReducer(state = defaultState, action) {
    switch (action.type) {
        case bookSearchActions.BOOK_SEARCH_SET_BOOKS:
            return Immutable.fromJS({books: action.books});
        default:
            return state;
    }
}