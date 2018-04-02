import Immutable from 'immutable';

import {
    makeAction,
    createRequestTypes,
    SET,
    REQUEST,
    SUCCESS,
    FAILURE,
    CLEAR,
    EDITING,
} from '../utils/moduleUtils';

// Actions

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
export const SET_EDITING = createRequestTypes('STACK_DETAIL', 'EDITING', [SET]);
export const SET_REMOVE_CONFIRM = createRequestTypes('STACK_DETAIL', 'REMOVE_CONFIRM', [SET]);
export const SET_ADDING_CATEGORY = createRequestTypes('STACK_DETAIL', 'ADDING_CATEGORY', [SET]);
export const SET_NEW_POSITION = createRequestTypes('STACK_DETAIL', 'NEW_POSITION', [SET]);

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
    request: (bookId, rdState) =>
        makeAction(READ_STATE.REQUEST, { bookId, readState: rdState }),
    success: (bookId, rdState) =>
        makeAction(READ_STATE.SUCCESS, { bookId, readState: rdState }),
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
    request: (bookstackId, categoryId) =>
        makeAction(ADD_CATEGORY.REQUEST, { bookstackId, categoryId }),
    success: (bookstackId, category) =>
        makeAction(ADD_CATEGORY.SUCCESS, { bookstackId, category }),
};

export const addNewCategory = {
    request: (bookstackId, category) =>
        makeAction(ADD_NEW_CATEGORY.REQUEST, { bookstackId, category }),
};

export const removeCategory = {
    request: (bookstackId, categoryId) =>
        makeAction(REMOVE_CATEGORY.REQUEST, { bookstackId, categoryId }),
    success: (bookstackId, categoryId) =>
        makeAction(REMOVE_CATEGORY.SUCCESS, { bookstackId, categoryId }),
};

export const setEditing = (bookId, editing) =>
    makeAction(SET_EDITING.SET, { editing, bookId });

export const setRemoveConfig = (bookId, removeConfig) =>
    makeAction(SET_REMOVE_CONFIRM.SET, { removeConfig, bookId });

export const setAddingCategory = (bookId, addingCategory) =>
    makeAction(SET_ADDING_CATEGORY.SET, { addingCategory, bookId });

export const setNewPosition = (bookId, newPosition) =>
    makeAction(SET_NEW_POSITION.SET, { newPosition, bookId });


// State

const bookLocation = Immutable.List(['stackDetail', 'books']);

const setInBook = (state, bookId, path, value) => state.setIn(
    [
        'stackDetail',
        'books',
        state.getIn(bookLocation)
            .findIndex(book => book.get('id') === bookId),
        ...path,
    ],
    value,
);

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
        return state.set('stackDetail', Immutable.fromJS(action.stack)
            .update('books', books => books.map(book => book.merge({
                editing: false,
                newPosition: null,
                removeConfirm: false,
                addingCategory: false,
            }))));
    case STACK_DETAIL.CLEAR:
        return state.set('stackDetail', Immutable.fromJS({ books: [] }));
    case ADD_BOOK.SUCCESS:
        return state.updateIn(
            bookLocation,
            books => books.push(Immutable.fromJS(action.book).merge({
                editing: false,
                newPosition: null,
                removeConfirm: false,
                addingCategory: false,
            })),
        );
    case STACK_DETAIL.EDITING:
        return state.set('editing', !state.get('editing'));
    case READ_STATE.SUCCESS:
        return setInBook(state, action.bookId, ['read'], action.readState);
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
    case SET_EDITING.SET:
        return setInBook(state, action.bookId, ['editing'], Boolean(action.editing));
    case SET_REMOVE_CONFIRM.SET:
        return setInBook(state, action.bookId, ['removeConfirm'], Boolean(action.removeConfirm));
    case SET_ADDING_CATEGORY.SET:
        return setInBook(state, action.bookId, ['addingCategory'], Boolean(action.addingCategory));
    case SET_NEW_POSITION.SET:
        if (Number.isInteger(action.newPosition) || action.newPosition === null) {
            return setInBook(state, action.bookId, ['newPosition'], action.newPosition);
        }
        return state;
    default:
        return state;
    }
}
