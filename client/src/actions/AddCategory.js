import { makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR } from './utils';

export const ADD = createRequestTypes('CATEGORY', 'ADD');

export const SEARCH = createRequestTypes('CATEGORY', 'SEARCH', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const addCategory = {
    request: category => makeAction(ADD.REQUEST, { category }),
    success: category => makeAction(ADD.SUCCESS, { category }),
};

export const categorySearch = {
    request: query => makeAction(SEARCH.REQUEST, { query }),
    success: suggestions => makeAction(SEARCH.SUCCESS, { suggestions }),
    clear: () => makeAction(SEARCH.CLEAR),
};
