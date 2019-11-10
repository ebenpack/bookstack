import { List, Record } from 'immutable';

import { IAddBook } from './types';
import { IBook } from '../Book/types';
import { BookRecord } from '../Book/bookModule';

// Actions
export const ADD_BOOK_REQUEST = 'ADD_BOOK_ADD_BOOK_REQUEST';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILURE = 'ADD_BOOK_ADD_BOOK_FAILURE';

export const GET_BOOK_REQUEST = 'ADD_BOOK_GET_BOOK_REQUEST';
export const GET_BOOK_SUCCESS = 'ADD_BOOK_GET_BOOK_SUCCESS';
export const GET_BOOK_FAILURE = 'ADD_BOOK_GET_BOOK_FAILURE';

export const SEARCH_BOOK_REQUEST = 'ADD_BOOK_SEARCH_BOOK_REQUEST';
export const SEARCH_BOOK_SUCCESS = 'ADD_BOOK_SEARCH_BOOK_SUCCESS';
export const SEARCH_BOOK_FAILURE = 'ADD_BOOK_SEARCH_BOOK_FAILURE';
export const SEARCH_BOOK_CLEAR = 'ADD_BOOK_SEARCH_BOOK_CLEAR';

export const SELECT_BOOK_REQUEST = 'ADD_BOOK_SELECT_BOOK_REQUEST';
export const SELECT_BOOK_SUCCESS = 'ADD_BOOK_SELECT_BOOK_SUCCESS';
export const SELECT_BOOK_FAILURE = 'ADD_BOOK_SELECT_BOOK_FAILURE';
export const SELECT_BOOK_CLEAR = 'ADD_BOOK_SELECT_BOOK_CLEAR';

// Action Creators

/*************
** Add Book **
**************/
export interface AddBookRequestAction {
    type: typeof ADD_BOOK_REQUEST
    book: IBook
}

export interface AddBookSuccessAction {
    type: typeof ADD_BOOK_SUCCESS
    book: IBook
}

export interface AddBookFailureAction {
    type: typeof ADD_BOOK_FAILURE
    error: string
}

export const addBookRequest: (book: IBook) => AddBookRequestAction =
    (book) => ({ type: ADD_BOOK_REQUEST,  book });

export const addBookSuccess: (book: IBook) => AddBookSuccessAction =
    (book) => ({ type: ADD_BOOK_SUCCESS,  book });

export const addBookFailure: (error: string) => AddBookFailureAction =
    (error) => ({ type: ADD_BOOK_FAILURE,  error });


/*************
** Get Book **
**************/
export interface GetBookRequestAction {
    type: typeof GET_BOOK_REQUEST
    id: number
}

export const getBookRequest: (id: number) => GetBookRequestAction =
    (id) => ({ type: GET_BOOK_REQUEST, id });


/*****************
** Search Books **
******************/
export interface SearchBookRequestAction {
    type: typeof SEARCH_BOOK_REQUEST
    query: string
}

export interface SearchBookSuccessAction {
    type: typeof SEARCH_BOOK_SUCCESS
    books: List<IBook>
}

export interface SearchBookFailureAction {
    type: typeof SEARCH_BOOK_FAILURE
    error: string
}

export interface SearchBookClearAction {
    type: typeof SEARCH_BOOK_CLEAR
}

export const searchBooksRequest: (query: string) => SearchBookRequestAction =
    (query) => ({ type: SEARCH_BOOK_REQUEST, query });

export const searchBooksSuccess: (books: List<IBook>) => SearchBookSuccessAction =
    (books) => ({ type: SEARCH_BOOK_SUCCESS, books });

export const searchBooksFailure: (error: string) => SearchBookFailureAction =
    (error) => ({ type: SEARCH_BOOK_FAILURE, error });

export const searchBooksClear: () => SearchBookClearAction =
    () => ({ type: SEARCH_BOOK_CLEAR });



/****************
** Select Book **
*****************/
export interface SelectBookSuccessAction {
    type: typeof SELECT_BOOK_SUCCESS
    book: BookRecord
}

export interface SelectBookFailureAction {
    type: typeof SELECT_BOOK_FAILURE
    error: string
}

export interface SelectBookClearAction {
    type: typeof SELECT_BOOK_CLEAR
}

export const selectBookSuccess: (book: BookRecord) => SelectBookSuccessAction =
    (book) => ({ type: SELECT_BOOK_SUCCESS, book });

export const selectBookFailure: (error: string) => SelectBookFailureAction =
    (error) => ({ type: SELECT_BOOK_FAILURE, error });

export const selectBookClear: () => SelectBookClearAction =
    () => ({ type: SELECT_BOOK_CLEAR });

export const defaultAddBookRecordValue = {
    selectedBook: new BookRecord(),
    booksAutocomplete: List(),
};

type AddBookRecordParams = {
    selectedBook?: BookRecord;
    booksAutocomplete?: List<IBook>;
}

export class AddBookRecord extends Record(defaultAddBookRecordValue) implements IAddBook {
    constructor(params?: AddBookRecordParams) {
        params ? super(params) : super();
    }
    with(values: AddBookRecordParams) {
        return this.merge(values) as this;
    }
}


// State
export const initialState = new AddBookRecord(defaultAddBookRecordValue);

export type AddBookActionTypes
    = SearchBookSuccessAction
    | SearchBookClearAction
    | SelectBookSuccessAction
    | SelectBookClearAction;

// TODO use component state?
export default function addBookReducer(state = initialState, action: AddBookActionTypes) {
    switch (action.type) {
        case SELECT_BOOK_SUCCESS:
            // tODO: convert data in saga
            return state.with({ selectedBook: action.book });
        case SEARCH_BOOK_SUCCESS:
            return state.with({ booksAutocomplete: action.books });
        case SEARCH_BOOK_CLEAR:
            // TODO: IS THIS RIGHT?
            return state.with({ selectedBook: new BookRecord() });
        case SELECT_BOOK_CLEAR:
            return state.with({ selectedBook: new BookRecord() });
        default:
            return state;
    }
}
