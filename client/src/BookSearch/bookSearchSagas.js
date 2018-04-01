import axios from 'axios';

import { delay } from 'redux-saga';
import { put, call, take, fork, cancel } from 'redux-saga/effects';

import { BOOK_SEARCH, bookSearch as bookSearchActions } from './bookSearchModule';

function formatBook(book) {
    // TODO: Revisit this...
    return {
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount,
        isbn: (book.volumeInfo.industryIdentifiers) ?
            book.volumeInfo.industryIdentifiers.reduce((prev, ident) => {
                if (ident.type === 'ISBN_10') {
                    return ident.identifier;
                } else if (!prev && ident.type === 'ISBN_13') {
                    return ident.identifier;
                }
                return prev;
            }, '') : undefined,
        authors: book.volumeInfo.authors ? book.volumeInfo.authors.map(author => ({
            name: author,
        })) : [],
        img: (
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.smallThumbnail
        ) ?
            book.volumeInfo.imageLinks.smallThumbnail : undefined,
        publishers: (
            Array.isArray(book.volumeInfo.publisher) ?
                book.volumeInfo.publisher :
                [book.volumeInfo.publisher]
        ).map(publisher => ({ name: publisher })),
    };
}

export function* bookSearch(query) {
    yield call(delay, 500);
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    const response = yield call(axios, {
        method: 'GET',
        url: googleBooksUrl,
    });
    const results = response.data;
    const books = results.totalItems ? results.items.map(formatBook) : [];
    yield put(bookSearchActions.success(books));
}

function* watchBookSearch() {
    let search;
    while (true) {
        const { query } = yield take(BOOK_SEARCH.REQUEST);
        if (search) {
            yield cancel(search);
        }
        if (query) {
            search = yield fork(bookSearch, query);
        } else {
            yield put(bookSearchActions.clear());
        }
    }
}

export default [
    watchBookSearch,
];