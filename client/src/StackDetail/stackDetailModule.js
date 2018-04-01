import Immutable from 'immutable';


// Actions

import {
    makeAction,
    createRequestTypes,
    REQUEST,
    SUCCESS,
    FAILURE,
    CLEAR,
    EDITING,
} from '../utils/moduleUtils';

export const STACK_DETAIL = createRequestTypes(
    'STACK_DETAIL', 'STACK_DETAIL',
    [REQUEST, SUCCESS, FAILURE, CLEAR, EDITING],
);


export const POSITION = createRequestTypes('STACK_DETAIL', 'POSITION');

export const READ_STATE = createRequestTypes('STACK_DETAIL', 'READ_STATE');

export const ADD_BOOK = createRequestTypes('STACK_DETAIL', 'ADD_BOOK');

export const REMOVE_BOOK = createRequestTypes('STACK_DETAIL', 'REMOVE_BOOK');

export const ADD_CATEGORY = createRequestTypes('STACK_DETAIL', 'ADD_CATEGORY');

export const ADD_NEW_CATEGORY = createRequestTypes('STACK_DETAIL', 'ADD_NEW_CATEGORY');

export const REMOVE_CATEGORY = createRequestTypes('STACK_DETAIL', 'REMOVE_CATEGORY');

export const stackDetail = {
    request: id => makeAction(STACK_DETAIL.REQUEST, { id }),
    success: stack => makeAction(STACK_DETAIL.SUCCESS, { stack }),
    clear: () => makeAction(STACK_DETAIL.CLEAR),
    editing: () => makeAction(STACK_DETAIL.EDITING),
};


export const position = {
    request: (id, from, to) => makeAction(POSITION.REQUEST, { id, from, to }),
    success: (id, from, to) => makeAction(POSITION.SUCCESS, { id, from, to }),
};

export const readState = {
    request: (bookId, rdState) => makeAction(READ_STATE.REQUEST, { bookId, readState: rdState }),
    success: (bookId, rdState) => makeAction(READ_STATE.SUCCESS, { bookId, readState: rdState }),
};

export const addBook = {
    request: (bookId, stackId) => makeAction(ADD_BOOK.REQUEST, { bookId, stackId }),
    success: () => { /* TODO */
    },
};

export const removeBook = {
    request: id => makeAction(REMOVE_BOOK.REQUEST, { id }),
    success: id => makeAction(REMOVE_BOOK.SUCCESS, { id }),
};

export const addCategory = {
    request: (bookstackId, categoryId) => makeAction(ADD_CATEGORY.REQUEST, { bookstackId, categoryId }),
    success: (bookstackId, category) => makeAction(ADD_CATEGORY.SUCCESS, { bookstackId, category }),
};

export const addNewCategory = {
    request: (bookstackId, category) => makeAction(ADD_NEW_CATEGORY.REQUEST, { bookstackId, category }),
};

export const removeCategory = {
    request: (bookstackId, categoryId) => makeAction(REMOVE_CATEGORY.REQUEST, { bookstackId, categoryId }),
    success: (bookstackId, categoryId) => makeAction(REMOVE_CATEGORY.SUCCESS, { bookstackId, categoryId }),
};

// State

const bookLocation = Immutable.List(['stackDetail', 'books']);

const defaultState = Immutable.fromJS({
    stackDetail: {
        books: [],
    },
    error: false,
    loading: false,
    editing: false,
});

// TODO: This is probably too big, should be broken up
export default function stackDetailReducer(state = defaultState, action) {
    switch (action.type) {
    case STACK_DETAIL.SUCCESS:
        return state.set('stackDetail', Immutable.fromJS(action.stack));
    case STACK_DETAIL.CLEAR:
        return state.set('stackDetail', Immutable.fromJS({ books: [] }));
    case ADD_BOOK.SUCCESS:
        return state.updateIn(
            bookLocation,
            books => books.push(Immutable.fromJS(action.book)),
        );
    case STACK_DETAIL.EDITING:
        return state.set('editing', !state.get('editing'));
    case READ_STATE.SUCCESS:
        return state.setIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.id),
                'read',
            ],
            action.read,
        );
    case REMOVE_BOOK.SUCCESS:
        return state.updateIn(
            bookLocation,
            books =>
                books.remove(books.findIndex(book => book.get('id') === action.id)),
        );
    case ADD_CATEGORY.SUCCESS:
        return state.updateIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.bookstackId),
                'categories',
            ],
            categories =>
                categories.push(Immutable.fromJS(action.category)),
        );
    case REMOVE_CATEGORY.SUCCESS:
        return state.updateIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.bookstackId),
                'categories',
            ],
            categories =>
                categories.remove(categories.findIndex(book => book.get('id') === action.categoryId)),
        );
    case POSITION.SUCCESS: {
        const from = action.from - 1; // Damn this inconsistent indexing
        const to = action.to - 1;
        // TODO: Profile, possibly find a more
        // efficient / less icky way of doing this
        const books = state.getIn(bookLocation).toJS();
        const moved = books[from];
        books.splice(from, 1);
        books.splice(to, 0, moved);

        return state.setIn(
            bookLocation,
            Immutable.fromJS(books).map((book, index) => book.set('position', index + 1)),
        );
    }
    default:
        return state;
    }
}
