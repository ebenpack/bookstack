import {makeAction} from './utils';


export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_CATEGORY_ADD_NEW_CATEGORY = 'ADD_CATEGORY_ADD_NEW_CATEGORY';
export const ADD_CATEGORY_SET_AUTOCOMPLETE_SUGGESTIONS = 'ADD_CATEGORY_SET_AUTOCOMPLETE_SUGGESTIONS';
export const ADD_CATEGORY_ADD_AUTOCOMPLETE_SUGGESTIONS = 'ADD_CATEGORY_ADD_AUTOCOMPLETE_SUGGESTIONS';
export const ADD_CATEGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS = 'ADD_CATEGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS';

export const addCategory = (bookstackId, categoryId) =>
    makeAction(ADD_CATEGORY, {bookstackId, categoryId});

export const addNewCategory = category =>
    makeAction(ADD_CATEGORY_ADD_NEW_CATEGORY, {category});

export const setAutoSuggestCategories = query =>
    makeAction(ADD_CATEGORY_SET_AUTOCOMPLETE_SUGGESTIONS, {query});

export const addAutoSuggestCategories = suggestions =>
    makeAction(ADD_CATEGORY_ADD_AUTOCOMPLETE_SUGGESTIONS, {suggestions});

export const clearAutoSuggestCategories = () =>
    makeAction(ADD_CATEGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS);
