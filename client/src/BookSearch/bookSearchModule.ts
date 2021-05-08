import { List, Record } from "immutable";

import { IBook } from "../Book/types";
import { IBookSearch } from "./types";

// Actions

// TODO: CONSOLIDATE ALL BOOK STUFF?
export const BOOK_SEARCH_REQUEST = "BOOK_SEARCH_REQUEST";
export const BOOK_SEARCH_SUCCESS = "BOOK_SEARCH_SUCCESS";
export const BOOK_SEARCH_FAILURE = "BOOK_SEARCH_FAILURE";
export const BOOK_SEARCH_CLEAR = "BOOK_SEARCH_CLEAR";

export const BOOK_SEARCH_QUERY_SET = "BOOK_SEARCH_QUERY_SET";
export const BOOK_SEARCH_QUERY_CLEAR = "BOOK_SEARCH_QUERY_CLEAR";

export interface BookSearchRequestAction {
    type: typeof BOOK_SEARCH_REQUEST;
    query: string;
}

export interface BookSearchSuccessAction {
    type: typeof BOOK_SEARCH_SUCCESS;
    books: List<IBook>;
}

export interface BookSearchFailureAction {
    type: typeof BOOK_SEARCH_FAILURE;
    error: string;
}

export interface BookSearchClearAction {
    type: typeof BOOK_SEARCH_CLEAR;
}

export const bookSearchRequest: (query: string) => BookSearchRequestAction = (
    query
) => ({ type: BOOK_SEARCH_REQUEST, query });

export const bookSearchSuccess: (
    books: List<IBook>
) => BookSearchSuccessAction = (books) => ({
    type: BOOK_SEARCH_SUCCESS,
    books,
});

export const bookSearchFailure: (error: string) => BookSearchFailureAction = (
    error
) => ({ type: BOOK_SEARCH_FAILURE, error });

export const bookSearchClear: () => BookSearchClearAction = () => ({
    type: BOOK_SEARCH_CLEAR,
});

export interface BookSearchQuerySetAction {
    type: typeof BOOK_SEARCH_QUERY_SET;
    query: string;
}

export interface BookSearchQueryClearAction {
    type: typeof BOOK_SEARCH_QUERY_CLEAR;
}

export const bookSearchQuerySet: (query: string) => BookSearchQuerySetAction = (
    query
) => ({
    type: BOOK_SEARCH_QUERY_SET,
    query,
});

export const bookSearchQueryClear: () => BookSearchQueryClearAction = () => ({
    type: BOOK_SEARCH_QUERY_CLEAR,
});

// State

export const defaultBookSearchRecordValue = {
    query: "",
    books: List(),
};

interface BookSearchParams {
    query?: string;
    books?: List<IBook>;
}

export class BookSearchRecord
    extends Record(defaultBookSearchRecordValue)
    implements IBookSearch {
    constructor(params?: BookSearchParams) {
        params ? super(params) : super();
    }
    with(values: BookSearchParams) {
        return this.merge(values) as this;
    }
}

export const initialState = new BookSearchRecord();

export type BookSearchActions =
    | BookSearchSuccessAction
    | BookSearchClearAction
    | BookSearchQuerySetAction
    | BookSearchQueryClearAction;

export default function BookSearchReducer(
    state = initialState,
    action: BookSearchActions
) {
    switch (action.type) {
        case BOOK_SEARCH_SUCCESS:
            return state.with({ books: action.books });
        case BOOK_SEARCH_CLEAR:
            return state.with({ books: List() });
        case BOOK_SEARCH_QUERY_SET:
            return state.with({ query: action.query });
        case BOOK_SEARCH_QUERY_CLEAR:
            return state.with({ query: "" });
        default:
            return state;
    }
}
