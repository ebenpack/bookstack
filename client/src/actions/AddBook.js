import {makeAction} from './utils';

export const ADD_BOOK = 'ADD_BOOK';
export const ADD_BOOK_ADD_NEW_BOOK = 'ADD_BOOK_ADD_NEW_BOOK';
export const ADD_BOOK_SEARCH = 'ADD_BOOK_SEARCH';
export const ADD_BOOK_AUTOCOMPLETE_SUGGESTIONS = 'ADD_BOOK_AUTOCOMPLETE_SUGGESTIONS';
export const ADD_BOOK_SELECT_BOOK = 'ADD_BOOK_SELECT_BOOK';
export const ADD_BOOK_ADD_SELECTED_BOOK = 'ADD_BOOK_ADD_SELECTED_BOOK';
export const ADD_BOOK_CLEAR_SELECTED = 'ADD_BOOK_CLEAR_SELECTED';

export const addBook = book =>
    makeAction(ADD_BOOK, {book});

export const addNewBook = book =>
    makeAction(ADD_BOOK_ADD_NEW_BOOK, {book});

export const searchBooks = query =>
    makeAction(ADD_BOOK_SEARCH, {query});

export const addAutocompleteSuggestions = suggestions =>
    makeAction(ADD_BOOK_AUTOCOMPLETE_SUGGESTIONS, {suggestions});

export const selectBook = book =>
    makeAction(ADD_BOOK_SELECT_BOOK, {book});

export const clearSelected = () =>
    makeAction(ADD_BOOK_CLEAR_SELECTED);