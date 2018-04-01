import Immutable from 'immutable';

import { makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

// Actions

export const ADD_BOOK = createRequestTypes('ADD_BOOK', 'ADD_BOOK');
export const GET_BOOK = createRequestTypes('ADD_BOOK', 'GET_BOOK');
export const SEARCH_BOOK = createRequestTypes('ADD_BOOK', 'SEARCH_BOOK', [REQUEST, SUCCESS, FAILURE, CLEAR]);
export const SELECT_BOOK = createRequestTypes('ADD_BOOK', 'SELECT_BOOK', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const addBook = {
    request: book => makeAction(ADD_BOOK.REQUEST, { book }),
    // TODO: We probably don't need to do anything on success
    // success: () => {},
};

export const getBook = {
    request: id => makeAction(GET_BOOK.REQUEST, { id }),
    // TODO: What do we do on success
    // success: () => {},
};

export const searchBooks = {
    request: query => makeAction(SEARCH_BOOK.REQUEST, { query }),
    success: books => makeAction(SEARCH_BOOK.SUCCESS, { books }),
    clear: () => makeAction(SEARCH_BOOK.CLEAR),
};

// TODO: Does select need to be a thing?
export const selectBook = {
    // request: ()=>{}, TODO: NO REQUEST??
    success: book => makeAction(SELECT_BOOK.SUCCESS, { book }),
    clear: () => makeAction(SELECT_BOOK.CLEAR),
};

// State

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