import {makeAction} from './utils';

export const BOOK_SEARCH = 'BOOK_SEARCH';
export const BOOK_SEARCH_SET_BOOKS = 'BOOK_SEARCH_SET_BOOKS';

export const bookSearch = query =>
    makeAction(BOOK_SEARCH, {query});

export const bookSearchSetResults = books =>
    makeAction(BOOK_SEARCH_SET_BOOKS, {books});