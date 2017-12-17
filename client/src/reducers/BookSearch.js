import Immutable from 'immutable';

import {BOOK_SEARCH} from '../actions/BookSearch';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function BookSearchReducer(state = defaultState, action) {
    switch (action.type) {
        case BOOK_SEARCH.SUCCESS:
            return Immutable.fromJS({books: action.books});
        case BOOK_SEARCH.CLEAR:
            return Immutable.fromJS({books: []});
        default:
            return state;
    }
}