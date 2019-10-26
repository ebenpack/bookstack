import { fromJS, List, Record } from 'immutable';
import { IStackDetail, IFullStackDetail } from './types';
import { IBook } from '../Book/types';
import { BookRecord } from '../Book/bookModule';

// Actions
export const STACK_DETAIL_INITIALIZE = 'STACK_DETAIL_INITIALIZE';

export const STACK_DETAIL_REQUEST = 'STACK_DETAIL_REQUEST';
export const STACK_DETAIL_SUCCESS = 'STACK_DETAIL_SUCCESS';
export const STACK_DETAIL_FAILURE = 'STACK_DETAIL_FAILURE';
export const STACK_DETAIL_CLEAR = 'STACK_DETAIL_CLEAR';
export const STACK_DETAIL_EDITING = 'STACK_DETAIL_EDITING';

export const STACK_DETAIL_POSITION_REQUEST = 'STACK_DETAIL_POSITION_REQUEST';
export const STACK_DETAIL_POSITION_SUCCESS = 'STACK_DETAIL_POSITION_SUCCESS';
export const STACK_DETAIL_POSITION_FAILURE = 'STACK_DETAIL_POSITION_FAILURE';

export const STACK_DETAIL_READ_STATE_REQUEST = 'STACK_DETAIL_READ_STATE_REQUEST';
export const STACK_DETAIL_READ_STATE_SUCCESS = 'STACK_DETAIL_READ_STATE_SUCCESS';
export const STACK_DETAIL_READ_STATE_FAILURE = 'STACK_DETAIL_READ_STATE_FAILURE';

export const STACK_DETAIL_ADD_BOOK_REQUEST = 'STACK_DETAIL_ADD_BOOK_REQUEST';
export const STACK_DETAIL_ADD_BOOK_SUCCESS = 'STACK_DETAIL_ADD_BOOK_SUCCESS';
export const STACK_DETAIL_ADD_BOOK_FAILURE = 'STACK_DETAIL_ADD_BOOK_FAILURE';

export const STACK_DETAIL_REMOVE_BOOK_REQUEST = 'STACK_DETAIL_REMOVE_BOOK_REQUEST';
export const STACK_DETAIL_REMOVE_BOOK_SUCCESS = 'STACK_DETAIL_REMOVE_BOOK_SUCCESS';
export const STACK_DETAIL_REMOVE_BOOK_FAILURE = 'STACK_DETAIL_REMOVE_BOOK_FAILURE';

export const STACK_DETAIL_ADD_CATEGORY_REQUEST = 'STACK_DETAIL_ADD_CATEGORY_REQUEST';
export const STACK_DETAIL_ADD_CATEGORY_SUCCESS = 'STACK_DETAIL_ADD_CATEGORY_SUCCESS';
export const STACK_DETAIL_ADD_CATEGORY_FAILURE = 'STACK_DETAIL_ADD_CATEGORY_FAILURE';

export const STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST = 'STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST';
export const STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS = 'STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS';
export const STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE = 'STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE';

export const STACK_DETAIL_REMOVE_CATEGORY_REQUEST = 'STACK_DETAIL_REMOVE_CATEGORY_REQUEST';
export const STACK_DETAIL_REMOVE_CATEGORY_SUCCESS = 'STACK_DETAIL_REMOVE_CATEGORY_SUCCESS';
export const STACK_DETAIL_REMOVE_CATEGORY_FAILURE = 'STACK_DETAIL_REMOVE_CATEGORY_FAILURE';


// TODO: HOOOOOOKS?1!!?
export const SET_EDITING = 'SET_EDITING';
export const SET_REMOVE_CONFIRM = 'SET_REMOVE_CONFIRM';
export const SET_ADDING_CATEGORY = 'SET_ADDING_CATEGORY';
export const SET_NEW_POSITION = 'SET_NEW_POSITION';

export const stackDetailInitialize = () => ({ type: STACK_DETAIL_INITIALIZE });

/*****************
** Stack Detail **
******************/
export interface StackDetailRequestAction {
    type: typeof STACK_DETAIL_REQUEST,
    id: string
}

export interface StackDetailSuccessAction {
    type: typeof STACK_DETAIL_SUCCESS
    stack: StackDetailRecord
}

export interface StackDetailFailureAction {
    type: typeof STACK_DETAIL_FAILURE
    error: string
}

export interface StackDetailClearAction {
    type: typeof STACK_DETAIL_CLEAR
}

export interface StackEditingClearAction {
    type: typeof STACK_DETAIL_EDITING
}

export const stackDetailRequest: (id: string) => StackDetailRequestAction =
    (id) => ({ type: STACK_DETAIL_REQUEST, id });

export const stackDetailSuccess: (stack: StackDetailRecord) => StackDetailSuccessAction =
    (stack) => ({ type: STACK_DETAIL_SUCCESS, stack });

export const stackDetailFailure: (error: string) => StackDetailFailureAction =
    (error) => ({ type: STACK_DETAIL_FAILURE, error });

export const stackDetailClear: () => StackDetailClearAction =
    () => ({ type: STACK_DETAIL_CLEAR });

export const stackDetailEditing: () => StackEditingClearAction =
    () => ({ type: STACK_DETAIL_EDITING });

/*******************
** Stack Position **
********************/
export interface StackDetailPositionRequestAction {
    type: typeof STACK_DETAIL_POSITION_REQUEST,
    id: string,
    from: number,
    to: number
}

export interface StackDetailPositionSuccessAction {
    type: typeof STACK_DETAIL_POSITION_SUCCESS
    id: string,
    from: number,
    to: number
}

export interface StackDetailPositionFailureAction {
    type: typeof STACK_DETAIL_POSITION_FAILURE
    error: string
}

export const stackDetailPositionRequest: (id: string, from: number, to: number) => StackDetailPositionRequestAction =
    (id: string, from: number, to: number) => ({ type: STACK_DETAIL_POSITION_REQUEST, id, from, to });

export const stackDetailPositionSuccess: (id: string, from: number, to: number) => StackDetailPositionSuccessAction =
    (id: string, from: number, to: number) => ({ type: STACK_DETAIL_POSITION_SUCCESS, id, from, to });

export const stackDetailPositionFailure: (error: string) => StackDetailPositionFailureAction =
    (error) => ({ type: STACK_DETAIL_POSITION_FAILURE, error });


/***************
** Read State **
****************/

export interface StackDetailReadStateRequestAction {
    type: typeof STACK_DETAIL_READ_STATE_REQUEST,
    bookId: string,
    newReadState: boolean,
}

export interface StackDetailReadStateSuccessAction {
    type: typeof STACK_DETAIL_READ_STATE_SUCCESS,
    bookId: string,
    readState: boolean,
}

export interface StackDetailReadStateFailureAction {
    type: typeof STACK_DETAIL_READ_STATE_FAILURE
    error: string
}


export const stackDetailReadStateRequest: (bookId: string, newReadState: boolean) => StackDetailReadStateRequestAction =
    (bookId, newReadState) => ({ type: STACK_DETAIL_READ_STATE_REQUEST, bookId, newReadState });

export const stackDetailReadStateSuccess: (bookId: string, readState: boolean) => StackDetailReadStateSuccessAction =
    (bookId, readState) => ({ type: STACK_DETAIL_READ_STATE_SUCCESS, bookId, readState });

export const stackDetailReadStateFailure: (error: string) => StackDetailReadStateFailureAction =
    (error) => ({ type: STACK_DETAIL_READ_STATE_FAILURE, error });


/*************
** Add Book **
**************/
export interface StackDetailAddBookRequestAction {
    type: typeof STACK_DETAIL_ADD_BOOK_REQUEST,
    bookId: string,
    stackId: string,
}

export interface StackDetailAddBookSuccessAction {
    type: typeof STACK_DETAIL_ADD_BOOK_SUCCESS,
    book: BookRecord
}

export interface StackDetailAddBookFailureAction {
    type: typeof STACK_DETAIL_ADD_BOOK_FAILURE
    error: string
}

export const stackDetailAddBookRequest: (bookId: string, stackId: string) => StackDetailAddBookRequestAction =
    (bookId, stackId) => ({ type: STACK_DETAIL_ADD_BOOK_REQUEST, bookId, stackId });

export const stackDetailAddBookSuccess: (book: BookRecord) => StackDetailAddBookSuccessAction =
    (book) => ({ type: STACK_DETAIL_ADD_BOOK_SUCCESS, book });

export const stackDetailAddBookFailure: (error: string) => StackDetailAddBookFailureAction =
    (error) => ({ type: STACK_DETAIL_ADD_BOOK_FAILURE, error });

/****************
** Remove Book **
*****************/
export interface StackDetailRemoveBookRequestAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_REQUEST,
    id: string,
}

export interface StackDetailRemoveBookSuccessAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_SUCCESS,
    id: string,
}

export interface StackDetailRemoveBookFailureAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_FAILURE
    error: string
}

export const stackDetailRemoveBookRequest: (id: string) => StackDetailRemoveBookRequestAction =
    (id) => ({ type: STACK_DETAIL_REMOVE_BOOK_REQUEST, id });

export const stackDetailRemoveBookSuccess: (id: string) => StackDetailRemoveBookSuccessAction =
    (id) => ({ type: STACK_DETAIL_REMOVE_BOOK_SUCCESS, id });

export const stackDetailRemoveBookFailure: (error: string) => StackDetailRemoveBookFailureAction =
    (error) => ({ type: STACK_DETAIL_REMOVE_BOOK_FAILURE, error });

/*****************
** Add Category **
******************/
export interface StackDetailAddCategoryRequestAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_REQUEST,
    bookstackId: number,
    categoryId: number,
}

export interface StackDetailAddCategorySuccessAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_SUCCESS,
    bookstackId: string,
    category: string,
}

export interface StackDetailAddCategoryFailureAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_FAILURE
    error: string
}

export const stackDetailAddCategoryRequest: (bookstackId: number, categoryId: number) => StackDetailAddCategoryRequestAction =
    (bookstackId, categoryId) => ({ type: STACK_DETAIL_ADD_CATEGORY_REQUEST, bookstackId, categoryId });

export const stackDetailAddCategorySuccess: (bookstackId: string, category: string) => StackDetailAddCategorySuccessAction =
    (bookstackId, category) => ({ type: STACK_DETAIL_ADD_CATEGORY_SUCCESS, bookstackId, category });

export const stackDetailAddCategoryFailure: (error: string) => StackDetailAddCategoryFailureAction =
    (error) => ({ type: STACK_DETAIL_ADD_CATEGORY_FAILURE, error });


/*********************
** Add New Category **
**********************/
export interface StackDetailAddNewCategoryRequestAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST,
    bookstackId: number,
    category: string,
}

export interface StackDetailAddNewCategorySuccessAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS,
}

export interface StackDetailAddNewCategoryFailureAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE
    error: string
}

export const stackDetailAddNewCategoryRequest: (bookstackId: number, category: string) => StackDetailAddNewCategoryRequestAction =
    (bookstackId, category) => ({ type: STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST, bookstackId, category });

export const stackDetailAddNewCategorySuccess: () => StackDetailAddNewCategorySuccessAction =
    () => ({ type: STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS });

export const stackDetailAddNewCategoryFailure: (error: string) => StackDetailAddNewCategoryFailureAction =
    (error) => ({ type: STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE, error });



/********************
** Remove Category **
*********************/
export interface StackDetailRemoveCategoryRequestAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_REQUEST,
    bookstackId: string,
    categoryId: string,
}

export interface StackDetailRemoveCategorySuccessAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_SUCCESS,
    bookstackId: string,
    categoryId: string,
}

export interface StackDetailRemoveCategoryFailureAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_FAILURE
    error: string
}

export const stackDetailRemoveCategoryRequest: (bookstackId: string, categoryId: string) => StackDetailRemoveCategoryRequestAction = 
    (bookstackId, categoryId) => ({ type: STACK_DETAIL_REMOVE_CATEGORY_REQUEST, bookstackId, categoryId });

export const stackDetailRemoveCategorySuccess: (bookstackId: string, categoryId: string) => StackDetailRemoveCategorySuccessAction = 
    (bookstackId, categoryId) => ({ type: STACK_DETAIL_REMOVE_CATEGORY_SUCCESS, bookstackId, categoryId });

export const stackDetailRemoveCategoryFailure: (error: string) => StackDetailRemoveCategoryFailureAction = 
    (error) => ({ type: STACK_DETAIL_REMOVE_CATEGORY_FAILURE, error });



/*******************************************************
** SET CRAP, PROBABLY WILL DO THIS WITH HOOKS INSTEAD **
********************************************************/

export const setEditing = (bookId: string, editing: boolean) =>
    ({ type: SET_EDITING, editing, bookId });

export const setRemoveConfig = (bookId: string, removeConfig: boolean) =>
    ({ type: SET_REMOVE_CONFIRM, removeConfig, bookId });

export const setAddingCategory = (bookId: string, addingCategory: boolean) =>
    ({ type: SET_ADDING_CATEGORY, addingCategory, bookId });

export const setNewPosition = (bookId: string, newPosition: number) =>
    ({ type: SET_NEW_POSITION, newPosition, bookId });


// State

const bookLocation = List(['stackDetail', 'books']);

export const defaultStackDetailRecordValue = {
    id: '',
    name: '',
    private: false,
    user: '',
    creation_date: new Date(),
    books: List(),
};


type StackDetailParams = {
    id?: string;
    name?: string;
    private?: boolean;
    user?: string;
    creation_date?: Date;
    books?: List<IBook>
};


export class StackDetailRecord extends Record(defaultStackDetailRecordValue) implements IStackDetail {
    constructor(params?: StackDetailParams) {
        params ? super(params) : super();
    }
    with(values: StackDetailParams) {
        return this.merge(values) as this;
    }
}

export const defaultFullStackDetailRecordValue = {
    stackDetail: new StackDetailRecord(),
    error: false,
    loading: false,
    editing: false,
};


type FullStackDetailParams = {
    stackDetail?: StackDetailRecord;
    error?: boolean;
    loading?: boolean;
    editing?: boolean;
}


export class FullStackDetailRecord extends Record(defaultFullStackDetailRecordValue) implements IFullStackDetail {
    constructor(params?: FullStackDetailParams) {
        params ? super(params) : super();
    }
    with(values: FullStackDetailParams) {
        return this.merge(values) as this;
    }
}

const initialState = new FullStackDetailRecord();

const setInBook = (state: FullStackDetailRecord, bookId: string, path, value) => state.setIn(
    [
        'stackDetail',
        'books',
        state.getIn(bookLocation)
            .findIndex(book => book.get('id') === bookId),
        ...path,
    ],
    value,
);

type StackDetailActionTypes 
    = StackDetailRequestAction
    | StackDetailSuccessAction
    | StackDetailFailureAction
    | StackDetailClearAction
    | StackEditingClearAction
    | StackDetailPositionRequestAction
    | StackDetailPositionSuccessAction
    | StackDetailPositionFailureAction
    | StackDetailReadStateRequestAction
    | StackDetailReadStateSuccessAction
    | StackDetailReadStateFailureAction
    | StackDetailAddBookRequestAction
    | StackDetailAddBookSuccessAction
    | StackDetailAddBookFailureAction
    | StackDetailRemoveBookRequestAction
    | StackDetailRemoveBookSuccessAction
    | StackDetailRemoveBookFailureAction
    | StackDetailAddCategoryRequestAction
    | StackDetailAddCategorySuccessAction
    | StackDetailAddCategoryFailureAction
    | StackDetailAddNewCategoryRequestAction
    | StackDetailAddNewCategorySuccessAction
    | StackDetailAddNewCategoryFailureAction
    | StackDetailRemoveCategoryRequestAction
    | StackDetailRemoveCategorySuccessAction
    | StackDetailRemoveCategoryFailureAction;

// TODO: This is probably too big, should be broken up
export default function stackDetailReducer(state = initialState, action: StackDetailActionTypes) {
    switch (action.type) {
    case STACK_DETAIL_SUCCESS:
        const books: List<IBook> = state.stackDetail.books.map(book => book.with({
            editing: false,
            newPosition: null,
            removeConfirm: false,
            addingCategory: false,
        }));
        const { id, name, user, creation_date } = action.stack;
        const newStack = new StackDetailRecord({
            id, 
            name, 
            user, 
            creation_date,
            books,
            private: action.stack.private,
        })
        return state.with({ stackDetail: newStack });
    case STACK_DETAIL_CLEAR:
        return state.set('stackDetail', fromJS({ books: [] }));
    case STACK_DETAIL_ADD_BOOK_SUCCESS:
        return state.updateIn(
            bookLocation,
            books => books.push(fromJS(action.book).merge({
                editing: false,
                newPosition: null,
                removeConfirm: false,
                addingCategory: false,
            })),
        );
    case STACK_DETAIL_EDITING:
        return state.set('editing', !state.get('editing'));
    case STACK_DETAIL_READ_STATE_SUCCESS:
        return setInBook(state, action.bookId, ['read'], action.readState);
    case STACK_DETAIL_REMOVE_BOOK_SUCCESS:
        return state.updateIn(
            bookLocation,
            books =>
                books.remove(books.findIndex(book => book.id === action.id)),
        );
    case STACK_DETAIL_ADD_CATEGORY_SUCCESS:
        return state.updateIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.bookstackId),
                'categories',
            ],
            categories =>
                categories.push(fromJS(action.category)),
        );
    case STACK_DETAIL_REMOVE_CATEGORY_SUCCESS:
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
    case STACK_DETAIL_POSITION_SUCCESS: {
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
            fromJS(books).map((book, index) => book.set('position', index + 1)),
        );
    }
    // TODO: HOOKS?
    case SET_EDITING:
        return setInBook(state, action.bookId, ['editing'], Boolean(action.editing));
    case SET_REMOVE_CONFIRM:
        return setInBook(state, action.bookId, ['removeConfirm'], Boolean(action.removeConfirm));
    case SET_ADDING_CATEGORY:
        return setInBook(state, action.bookId, ['addingCategory'], Boolean(action.addingCategory));
    case SET_NEW_POSITION:
        if (Number.isInteger(action.newPosition) || action.newPosition === null) {
            return setInBook(state, action.bookId, ['newPosition'], action.newPosition);
        }
        return state;
    default:
        return state;
    }
}
