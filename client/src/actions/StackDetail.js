import {makeAction} from './utils';

export const STACK_DETAIL_LOAD = 'STACK_DETAIL_LOAD';
export const STACK_DETAIL_UNLOAD = 'STACK_DETAIL_UNLOAD';
export const STACK_DETAIL_SET = 'STACK_DETAIL_SET';
export const STACK_DETAIL_SET_EDITING_STATE = 'STACK_DETAIL_SET_EDITING_STATE';
export const STACK_DETAIL_SET_POSITION = 'STACK_DETAIL_SET_POSITION';
export const STACK_DETAIL_UPDATE_POSITION = 'STACK_DETAIL_UPDATE_POSITION';
export const STACK_DETAIL_SET_READ_STATE = 'STACK_DETAIL_SET_READ_STATE';
export const STACK_DETAIL_UPDATE_READ_STATE = 'STACK_DETAIL_UPDATE_READ_STATE';
export const STACK_DETAIL_REMOVE_BOOK = 'STACK_DETAIL_REMOVE_BOOK';
export const STACK_DETAIL_DELETE_BOOK = 'STACK_DETAIL_DELETE_BOOK';
export const STACK_DETAIL_SET_BOOK = 'STACK_DETAIL_SET_BOOK';
export const STACK_DETAIL_UPDATE_BOOK = 'STACK_DETAIL_UPDATE_BOOK';
export const STACK_DETAIL_SET_CATEGORY = 'STACK_DETAIL_SET_CATEGORY';
export const STACK_DETAIL_UPDATE_CATEGORY = 'STACK_DETAIL_UPDATE_CATEGORY';
export const STACK_DETAIL_REMOVE_CATEGORY = 'STACK_DETAIL_REMOVE_CATEGORY';
export const STACK_DETAIL_DELETE_CATEGORY = 'STACK_DETAIL_DELETE_CATEGORY';

export const loadStack = id =>
    makeAction(STACK_DETAIL_LOAD, {id});

export const setStack = stack =>
    makeAction(STACK_DETAIL_SET, {stack});

export const unloadStack = () =>
    makeAction(STACK_DETAIL_UNLOAD);

export const toggleEditing = () =>
    makeAction(STACK_DETAIL_SET_EDITING_STATE);

export const updateReadState = (bookId, readState) =>
    makeAction(STACK_DETAIL_UPDATE_READ_STATE, {bookId, readState});

export const setReadState = (bookId, readState) =>
    makeAction(STACK_DETAIL_SET_READ_STATE, {bookId, readState});

export const updatePosition = (id, from, to) =>
    makeAction(STACK_DETAIL_UPDATE_POSITION, {id, from, to});

export const setPosition = (id, from, to) =>
    makeAction(STACK_DETAIL_SET_POSITION, {id, from, to});

export const setBook = (bookId, stackId) =>
    makeAction(STACK_DETAIL_SET_BOOK, {bookId, stackId});

export const updateBook = (bookId, stackId) =>
    makeAction(STACK_DETAIL_UPDATE_BOOK, {bookId, stackId});

export const deleteBook = id =>
    makeAction(STACK_DETAIL_DELETE_BOOK, {id});

export const removeBook = id =>
    makeAction(STACK_DETAIL_REMOVE_BOOK, {id});

export const updateCategory = (bookstackId, categoryId) =>
    makeAction(STACK_DETAIL_UPDATE_CATEGORY, {bookstackId, categoryId});

export const setCategory = category =>
    makeAction(STACK_DETAIL_SET_CATEGORY, {category});

export const removeCategory = (bookstackId, categoryId) =>
    makeAction(STACK_DETAIL_REMOVE_CATEGORY, {bookstackId, categoryId});

export const deleteCategory = (bookstackId, categoryId) =>
    makeAction(STACK_DETAIL_DELETE_CATEGORY, {bookstackId, categoryId});