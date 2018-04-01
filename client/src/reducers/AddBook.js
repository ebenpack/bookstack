import Immutable from 'immutable';

import { SEARCH_BOOK, SELECT_BOOK } from '../actions/AddBook';

const defaultState = Immutable.fromJS({
    title: '',
    booksAutocomplete: [],
    selectedBook: {
        title: '',
        pages: '',
        isbn: '',
        img: '',
        authors: [],
        publishers: [],
        id: '',
    },
});

export default function addBookReducer(state = defaultState, action) {
    switch (action.type) {
    case SELECT_BOOK.SUCCESS:
        return state.set('selectedBook', Immutable.fromJS(action.book));
    case SEARCH_BOOK.SUCCESS:
        return state.set('booksAutocomplete', Immutable.fromJS(action.books));
    case SEARCH_BOOK.CLEAR:
        return state.set('selectedBook', Immutable.fromJS({
            title: '',
            pages: '',
            isbn: '',
            img: '',
            authors: [],
            publishers: [],
            id: '',
        }));
    default:
        return state;
    }
}
