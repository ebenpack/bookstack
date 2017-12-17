import {makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR, EDITING} from './utils';

export const STACK_DETAIL = createRequestTypes('STACK_DETAIL', 'STACK_DETAIL',
    [REQUEST, SUCCESS, FAILURE, CLEAR, EDITING]);


export const POSITION = createRequestTypes('STACK_DETAIL', 'POSITION');

export const READ_STATE = createRequestTypes('STACK_DETAIL', 'READ_STATE');

export const ADD_BOOK = createRequestTypes('STACK_DETAIL', 'ADD_BOOK');

export const REMOVE_BOOK = createRequestTypes('STACK_DETAIL', 'REMOVE_BOOK');

export const ADD_CATEGORY = createRequestTypes('STACK_DETAIL', 'ADD_CATEGORY');

export const ADD_NEW_CATEGORY = createRequestTypes('STACK_DETAIL', 'ADD_NEW_CATEGORY');

export const REMOVE_CATEGORY = createRequestTypes('STACK_DETAIL', 'REMOVE_CATEGORY');

export const stackDetail = {
    request: id => makeAction(STACK_DETAIL.REQUEST, {id}),
    success: stack => makeAction(STACK_DETAIL.SUCCESS, {stack}),
    clear: () => makeAction(STACK_DETAIL.CLEAR),
    editing: () => makeAction(STACK_DETAIL.EDITING),
};


export const position = {
    request: (id, from, to) => makeAction(POSITION.REQUEST, {id, from, to}),
    success: (id, from, to) => makeAction(POSITION.SUCCESS, {id, from, to}),
};

export const readState = {
    request: (bookId, readState) => makeAction(READ_STATE.REQUEST, {bookId, readState}),
    success: (bookId, readState) => makeAction(READ_STATE.SUCCESS, {bookId, readState}),
};

export const addBook = {
    request: (bookId, stackId) => makeAction(ADD_BOOK.REQUEST, {bookId, stackId}),
    success: () => {/*TODO*/
    },
};

export const removeBook = {
    request: id => makeAction(REMOVE_BOOK.REQUEST, {id}),
    success: id => makeAction(REMOVE_BOOK.SUCCESS, {id}),
};

export const addCategory = {
    request: (bookstackId, categoryId) => makeAction(ADD_CATEGORY.REQUEST, {bookstackId, categoryId}),
    success: (bookstackId, category) => makeAction(ADD_CATEGORY.SUCCESS, {bookstackId, category}),
};

export const addNewCategory = {
    request: (bookstackId, category) => makeAction(ADD_NEW_CATEGORY.REQUEST, {bookstackId, category})
};

export const removeCategory = {
    request: (bookstackId, categoryId) => makeAction(REMOVE_CATEGORY.REQUEST, {bookstackId, categoryId}),
    success: (bookstackId, categoryId) => makeAction(REMOVE_CATEGORY.SUCCESS, {bookstackId, categoryId}),
};