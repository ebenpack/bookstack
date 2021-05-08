import { List } from 'immutable';
import { delay } from 'redux-saga/effects';
import { put, call, take, fork, cancel } from 'redux-saga/effects';

import { axiosCall } from '../utils/sagasUtils';
import {
    BOOK_SEARCH_REQUEST,
    bookSearchSuccess,
    bookSearchFailure,
    bookSearchClear,
} from './bookSearchModule';
import { BookRecord } from '../Book/bookModule';
import { AuthorRecord } from '../AuthorDetail/authorDetailModule';
import { PublisherRecord } from '../PublisherDetail/publisherDetailModule';
import { IBook } from '../Book/types';
import {SagaIterator} from "redux-saga";

interface GoogleBook {
    volumeInfo: {
        title: string;
        pageCount: number;
        industryIdentifiers: Array<{ type: string; identifier: string }>;
        authors: string[];
        imageLinks: {
            smallThumbnail: string;
        };
        publisher: string[];
    };
}

function formatBook(book: GoogleBook) {
    // TODO: Revisit this... this transformation is ugly, and probably misses a
    // lot of edge-cases
    const authors = book.volumeInfo.authors
        ? List(
              book.volumeInfo.authors.map(
                  author =>
                      new AuthorRecord({
                          name: author,
                      })
              )
          )
        : List();
    const publishers = List(
        Array.isArray(book.volumeInfo.publisher)
            ? book.volumeInfo.publisher
            : [book.volumeInfo.publisher]
    )
        .filter(publisher => publisher)
        .map(publisher => new PublisherRecord({ name: publisher }));

    const formattedBook = {
        title: book.volumeInfo.title,
        pages: book.volumeInfo.pageCount || 0,
        isbn: book.volumeInfo.industryIdentifiers
            ? book.volumeInfo.industryIdentifiers.reduce((prev, ident) => {
                  if (ident.type === 'ISBN_10') {
                      return ident.identifier;
                  } else if (!prev && ident.type === 'ISBN_13') {
                      return ident.identifier;
                  }
                  return prev;
              }, '')
            : undefined,
        authors,
        img:
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.smallThumbnail
                ? book.volumeInfo.imageLinks.smallThumbnail
                : undefined,
        publishers,
    };
    return new BookRecord(formattedBook);
}

export function* bookSearch(query: string): SagaIterator {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    try {
        const response = yield call(axiosCall, {
            method: 'GET',
            url: googleBooksUrl,
        });
        const results = response.data;
        const books: List<IBook> = List(
            results.totalItems ? results.items.map(formatBook) : []
        );
        yield put(bookSearchSuccess(books));
    } catch (err) {
        const error =
            err && err.response && err.response.data
                ? err.response.data
                : { error: 'Add category request failed' };
        yield put(bookSearchFailure(error));
    }
}

export function* watchBookSearch(): SagaIterator {
    let search;
    while (true) {
        // In order to prevent making a lot of unecessary requests,
        // calls to bookSearch are debounced
        const { query } = yield take(BOOK_SEARCH_REQUEST);
        if (search) {
            yield cancel(search);
        }
        if (query) {
            search = yield fork(function* delayedSearch() {
                yield delay(500);
                yield call(bookSearch, query);
            });
        } else {
            yield put(bookSearchClear());
        }
    }
}

export default [watchBookSearch];
