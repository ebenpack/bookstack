import { fromJS, List, Record } from 'immutable';

import { makeAction, createRequestTypes, SET, REQUEST, SUCCESS, FAILURE, CLEAR } from '../utils/moduleUtils';

// Actions
export const ADD_CATEGORY_ADD_REQUEST = 'ADD_CATEGORY_ADD_REQUEST';
export const ADD_CATEGORY_ADD_SUCCESS = 'ADD_CATEGORY_ADD_SUCCESS';
export const ADD_CATEGORY_ADD_FAILURE = 'ADD_CATEGORY_ADD_FAILURE';

export const ADD_CATEGORY_SEARCH_REQUEST = 'ADD_CATEGORY_SEARCH_REQUEST';
export const ADD_CATEGORY_SEARCH_SUCCESS = 'ADD_CATEGORY_SEARCH_SUCCESS';
export const ADD_CATEGORY_SEARCH_FAILURE = 'ADD_CATEGORY_SEARCH_FAILURE';
export const ADD_CATEGORY_SEARCH_CLEAR = 'ADD_CATEGORY_SEARCH_CLEAR';

/*****************
** Add Category **
******************/
export interface AddCategoryRequestAction {
    type: typeof ADD_CATEGORY_ADD_REQUEST
    category: string
}

export interface AddCategorySuccessAction {
    type: typeof ADD_CATEGORY_ADD_SUCCESS
    category: string
}

export interface AddCategoryFailureAction {
    type: typeof ADD_CATEGORY_ADD_FAILURE
    error: string
}


export const addCategoryRequest: (category: string) => AddCategoryRequestAction =
        (category: string) => ({ type: ADD_CATEGORY_ADD_REQUEST, category });

export const addCategorySuccess: (category: string) => AddCategorySuccessAction =
        (category: string) => ({ type: ADD_CATEGORY_ADD_SUCCESS, category });

export const addCategoryFailure: (error: string) => AddCategoryFailureAction =
        (error: string) => ({ type: ADD_CATEGORY_ADD_FAILURE, error });


/********************
** Search Category **
*********************/

export interface SearchCategoryRequestAction {
    type: typeof ADD_CATEGORY_SEARCH_REQUEST
    query: string
}

export interface SearchCategorySuccessAction {
    type: typeof ADD_CATEGORY_SEARCH_SUCCESS
    suggestions: List<string>
}

export interface SearchCategoryFailureAction {
    type: typeof ADD_CATEGORY_SEARCH_FAILURE
    error: string
}

export interface SearchCategoryClearAction {
    type: typeof ADD_CATEGORY_SEARCH_CLEAR
}



export const searchCategoryRequest: (query: string) => SearchCategoryRequestAction =
    query => ({ type: ADD_CATEGORY_SEARCH_REQUEST, query });

export const searchCategorySuccess: (suggestions: List<string>) => SearchCategorySuccessAction =
    suggestions => ({ type: ADD_CATEGORY_SEARCH_SUCCESS, suggestions });

export const searchCategoryFailure: (error: string) => SearchCategoryFailureAction =
    error => ({ type: ADD_CATEGORY_SEARCH_FAILURE, error });

export const searchCategoryClear: () => SearchCategoryClearAction =
    () => ({ type: ADD_CATEGORY_SEARCH_CLEAR });

export type AddCategoryActionTypes
    = SearchCategorySuccessAction
    | SearchCategoryFailureAction;


// State
export const initialState = fromJS({
    autoSuggestCategories: []
});

// TODO: HOOK IT?
export default function categoryReducer(state = initialState, action: AddCategoryActionTypes) {
    switch (action.type) {
    case ADD_CATEGORY_SEARCH_SUCCESS:
        return state.set('autoSuggestCategories', fromJS(action.suggestions));
    case ADD_CATEGORY_SEARCH_FAILURE:
        return state.set('autoSuggestCategories', List());
    default:
        return state;
    }
}
