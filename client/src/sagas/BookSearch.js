import axios from 'axios';

import {delay} from 'redux-saga';
import {put, call, take} from 'redux-saga/effects';

import {getCredentials} from './utils';

import * as bookSearchActions from '../actions/BookSearch';

function formatBook(book) {
    // TODO: Revisit this...
    return {
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount,
        isbn: (book.volumeInfo.industryIdentifiers) ?
            book.volumeInfo.industryIdentifiers.reduce(function (prev, ident) {
                if (ident.type === "ISBN_10") {
                    return ident.identifier;
                } else if (!prev && ident.type === "ISBN_13") {
                    return ident.identifier;
                } else {
                    return prev;
                }
            }, '') : undefined,
        authors: book.volumeInfo.authors ? book.volumeInfo.authors.map(function (author) {
            return {
                name: author,
            };
        }) : [],
        img: (
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.smallThumbnail
        ) ?
            book.volumeInfo.imageLinks.smallThumbnail : undefined,
        publishers: (
            Array.isArray(book.volumeInfo.publisher) ?
                book.volumeInfo.publisher :
                [book.volumeInfo.publisher]
        ).map(function (publisher) {
            return {name: publisher}
        }),
    };
}

export function* bookSearch({query}) {
    yield call(delay, 500);
    let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    let response = yield call(axios, {
        method: 'GET',
        url: googleBooksUrl,
        contentType: 'application/json',
        type: 'json',
    });
    let results = response.data;
    let books = results.totalItems ? resp.items.map(formatBook) : [];
    yield put(bookSearchActions.bookSearchSetResults(books));
}

function* watchBookSearch() {
    let search;
    while (true) {
        let {query} = yield take(bookSearchActions.BOOK_SEARCH);
        if (search) {
            yield cancel(search);
        }
        search = yield fork(bookSearch, query);
    }
}

export default [
        watchBookSearch,
    ];