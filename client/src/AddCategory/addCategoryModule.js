import Immutable from 'immutable';

import { makeAction, createRequestTypes, SET, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

// Actions

export const ADD = createRequestTypes('CATEGORY', 'ADD');
export const SEARCH = createRequestTypes('CATEGORY', 'SEARCH', [REQUEST, SUCCESS, FAILURE, CLEAR]);
export const INPUT = createRequestTypes('CATEGORY', 'INPUT', [SET, CLEAR]);

export const addCategory = {
    request: category => makeAction(ADD.REQUEST, { category }),
    success: category => makeAction(ADD.SUCCESS, { category }),
};

export const categorySearch = {
    request: query => makeAction(SEARCH.REQUEST, { query }),
    success: suggestions => makeAction(SEARCH.SUCCESS, { suggestions }),
    clear: () => makeAction(SEARCH.CLEAR),
};

export const categoryInput = {
    set: query => makeAction(INPUT.SET, { query }),
    clear: () => makeAction(INPUT.CLEAR, {}),
};

// State

const defaultState = Immutable.fromJS({
    autoSuggestCategories: [],
    category: '',
});

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
    case SEARCH.SUCCESS:
        return state.set('autoSuggestCategories', Immutable.fromJS(action.suggestions));
    case SEARCH.CLEAR:
        return state.set('autoSuggestCategories', Immutable.List());
    case INPUT.SET:
        return state.set('category', action.query);
    case INPUT.CLEAR:
        return state.set('category', '');
    default:
        return state;
    }
}
