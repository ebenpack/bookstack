import axios from 'axios';
import Immutable from 'immutable';
import { delay } from 'redux-saga';
import { put, call, take, fork, cancel } from 'redux-saga/effects';

import { BOOK_SEARCH, bookSearch as bookSearchActions } from './bookSearchModule';

function formatBook(book) {
    // TODO: Revisit this... this transformation is ugly, and probably misses a
    // lot of edge-cases
    return {
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount || 0,
        isbn: (book.volumeInfo.industryIdentifiers) ?
            book.volumeInfo.industryIdentifiers.reduce((prev, ident) => {
                if (ident.type === 'ISBN_10') {
                    return ident.identifier;
                } else if (!prev && ident.type === 'ISBN_13') {
                    return ident.identifier;
                }
                return prev;
            }, '') : undefined,
        authors: book.volumeInfo.authors ?
            book.volumeInfo.authors.map(author => ({
                name: author,
            })) : [],
        img: (
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.smallThumbnail
        ) ? book.volumeInfo.imageLinks.smallThumbnail : undefined,
        publishers: (
            Array.isArray(book.volumeInfo.publisher) ?
                book.volumeInfo.publisher :
                [book.volumeInfo.publisher]
        ).filter(publisher => publisher).map(publisher => ({ name: publisher })),
    };
}

export function* bookSearch(query) {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    try {
        const response = yield call(axios, {
            method: 'GET',
            url: googleBooksUrl,
        });
        const results = response.data;
        const books = results.totalItems ?
            results.items.map(formatBook) : [];
        yield put(bookSearchActions.success(Immutable.fromJS(books)));
    } catch (error) {
        yield put(bookSearchActions.failure(error));
    }
}

export function* watchBookSearch() {
    let search;
    while (true) {
        // In order to prevent making a lot of unecessary requests,
        // calls to bookSearch are debounced
        const { query } = yield take(BOOK_SEARCH.REQUEST);
        if (search) {
            yield cancel(search);
        }
        if (query) {
            search = yield fork(function* delayedSearch() {
                yield call(delay, 500);
                yield call(bookSearch, query);
            });
        } else {
            yield put(bookSearchActions.clear());
        }
    }
}

export default [
    watchBookSearch,
];
