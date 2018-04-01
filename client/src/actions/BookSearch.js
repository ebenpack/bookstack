import { makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR } from './utils';

// TODO: CONSOLIDATE ALL BOOK STUFF?
export const BOOK_SEARCH = createRequestTypes('BOOK_SEARCH', 'SEARCH', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const bookSearch = {
    request: query => makeAction(BOOK_SEARCH.REQUEST, { query }),
    success: books => makeAction(BOOK_SEARCH.SUCCESS, { books }),
    clear: () => makeAction(BOOK_SEARCH.CLEAR),
};
