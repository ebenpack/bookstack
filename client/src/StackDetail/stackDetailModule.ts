import { fromJS, List, Record } from "immutable";
import { IStackDetail, IFullStackDetail } from "./types";
import { IBook } from "../Book/types";
import { BookStackRecord, makeBookstack } from "../BookStack/bookstackModule";
import { ICategory } from "../Category/types";

// Actions
export const STACK_DETAIL_INITIALIZE = "STACK_DETAIL_INITIALIZE";

export const STACK_DETAIL_REQUEST = "STACK_DETAIL_REQUEST";
export const STACK_DETAIL_SUCCESS = "STACK_DETAIL_SUCCESS";
export const STACK_DETAIL_FAILURE = "STACK_DETAIL_FAILURE";
export const STACK_DETAIL_CLEAR = "STACK_DETAIL_CLEAR";
export const STACK_DETAIL_EDITING = "STACK_DETAIL_EDITING";

export const STACK_DETAIL_POSITION_REQUEST = "STACK_DETAIL_POSITION_REQUEST";
export const STACK_DETAIL_POSITION_SUCCESS = "STACK_DETAIL_POSITION_SUCCESS";
export const STACK_DETAIL_POSITION_FAILURE = "STACK_DETAIL_POSITION_FAILURE";

export const STACK_DETAIL_READ_STATE_REQUEST =
    "STACK_DETAIL_READ_STATE_REQUEST";
export const STACK_DETAIL_READ_STATE_SUCCESS =
    "STACK_DETAIL_READ_STATE_SUCCESS";
export const STACK_DETAIL_READ_STATE_FAILURE =
    "STACK_DETAIL_READ_STATE_FAILURE";

export const STACK_DETAIL_ADD_BOOK_REQUEST = "STACK_DETAIL_ADD_BOOK_REQUEST";
export const STACK_DETAIL_ADD_BOOK_SUCCESS = "STACK_DETAIL_ADD_BOOK_SUCCESS";
export const STACK_DETAIL_ADD_BOOK_FAILURE = "STACK_DETAIL_ADD_BOOK_FAILURE";

export const STACK_DETAIL_REMOVE_BOOK_REQUEST =
    "STACK_DETAIL_REMOVE_BOOK_REQUEST";
export const STACK_DETAIL_REMOVE_BOOK_SUCCESS =
    "STACK_DETAIL_REMOVE_BOOK_SUCCESS";
export const STACK_DETAIL_REMOVE_BOOK_FAILURE =
    "STACK_DETAIL_REMOVE_BOOK_FAILURE";

export const STACK_DETAIL_ADD_CATEGORY_REQUEST =
    "STACK_DETAIL_ADD_CATEGORY_REQUEST";
export const STACK_DETAIL_ADD_CATEGORY_SUCCESS =
    "STACK_DETAIL_ADD_CATEGORY_SUCCESS";
export const STACK_DETAIL_ADD_CATEGORY_FAILURE =
    "STACK_DETAIL_ADD_CATEGORY_FAILURE";

export const STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST =
    "STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST";
export const STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS =
    "STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS";
export const STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE =
    "STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE";

export const STACK_DETAIL_REMOVE_CATEGORY_REQUEST =
    "STACK_DETAIL_REMOVE_CATEGORY_REQUEST";
export const STACK_DETAIL_REMOVE_CATEGORY_SUCCESS =
    "STACK_DETAIL_REMOVE_CATEGORY_SUCCESS";
export const STACK_DETAIL_REMOVE_CATEGORY_FAILURE =
    "STACK_DETAIL_REMOVE_CATEGORY_FAILURE";

// TODO: HOOOOOOKS?1!!?
export const SET_EDITING = "SET_EDITING";
export const SET_REMOVE_CONFIRM = "SET_REMOVE_CONFIRM";
export const SET_ADDING_CATEGORY = "SET_ADDING_CATEGORY";
export const SET_NEW_POSITION = "SET_NEW_POSITION";

export const stackDetailInitialize = (id: number) => ({
    type: STACK_DETAIL_INITIALIZE,
    id,
});

/*****************
 ** Stack Detail **
 ******************/
export interface StackDetailRequestAction {
    type: typeof STACK_DETAIL_REQUEST;
    id: string;
}

export interface StackDetailSuccessAction {
    type: typeof STACK_DETAIL_SUCCESS;
    stack: StackDetailRecord;
}

export interface StackDetailFailureAction {
    type: typeof STACK_DETAIL_FAILURE;
    error: string;
}

export interface StackDetailClearAction {
    type: typeof STACK_DETAIL_CLEAR;
}

export interface StackEditingClearAction {
    type: typeof STACK_DETAIL_EDITING;
}

export const stackDetailRequest: (id: string) => StackDetailRequestAction = (
    id
) => ({ type: STACK_DETAIL_REQUEST, id });

export const stackDetailSuccess: (
    stack: StackDetailRecord
) => StackDetailSuccessAction = (stack) => ({
    type: STACK_DETAIL_SUCCESS,
    stack,
});

export const stackDetailFailure: (error: string) => StackDetailFailureAction = (
    error
) => ({
    type: STACK_DETAIL_FAILURE,
    error,
});

export const stackDetailClear: () => StackDetailClearAction = () => ({
    type: STACK_DETAIL_CLEAR,
});

export const stackDetailEditing: () => StackEditingClearAction = () => ({
    type: STACK_DETAIL_EDITING,
});

/*******************
 ** Stack Position **
 ********************/
export interface StackDetailPositionRequestAction {
    type: typeof STACK_DETAIL_POSITION_REQUEST;
    id: number;
    from: number;
    to: number;
}

export interface StackDetailPositionSuccessAction {
    type: typeof STACK_DETAIL_POSITION_SUCCESS;
    id: number;
    from: number;
    to: number;
}

export interface StackDetailPositionFailureAction {
    type: typeof STACK_DETAIL_POSITION_FAILURE;
    error: string;
}

export const stackDetailPositionRequest: (
    id: number,
    from: number,
    to: number
) => StackDetailPositionRequestAction = (id, from, to) => ({
    type: STACK_DETAIL_POSITION_REQUEST,
    id,
    from,
    to,
});

export const stackDetailPositionSuccess: (
    id: number,
    from: number,
    to: number
) => StackDetailPositionSuccessAction = (id, from, to) => ({
    type: STACK_DETAIL_POSITION_SUCCESS,
    id,
    from,
    to,
});

export const stackDetailPositionFailure: (
    error: string
) => StackDetailPositionFailureAction = (error) => ({
    type: STACK_DETAIL_POSITION_FAILURE,
    error,
});

/***************
 ** Read State **
 ****************/

export interface StackDetailReadStateRequestAction {
    type: typeof STACK_DETAIL_READ_STATE_REQUEST;
    bookId: number;
    newReadState: boolean;
}

export interface StackDetailReadStateSuccessAction {
    type: typeof STACK_DETAIL_READ_STATE_SUCCESS;
    bookId: number;
    readState: boolean;
}

export interface StackDetailReadStateFailureAction {
    type: typeof STACK_DETAIL_READ_STATE_FAILURE;
    error: string;
}

export const stackDetailReadStateRequest: (
    bookId: number,
    newReadState: boolean
) => StackDetailReadStateRequestAction = (bookId, newReadState) => ({
    type: STACK_DETAIL_READ_STATE_REQUEST,
    bookId,
    newReadState,
});

export const stackDetailReadStateSuccess: (
    bookId: number,
    readState: boolean
) => StackDetailReadStateSuccessAction = (bookId, readState) => ({
    type: STACK_DETAIL_READ_STATE_SUCCESS,
    bookId,
    readState,
});

export const stackDetailReadStateFailure: (
    error: string
) => StackDetailReadStateFailureAction = (error) => ({
    type: STACK_DETAIL_READ_STATE_FAILURE,
    error,
});

/*************
 ** Add Book **
 **************/
export interface StackDetailAddBookRequestAction {
    type: typeof STACK_DETAIL_ADD_BOOK_REQUEST;
    bookId: number;
    stackId: number;
}

export interface StackDetailAddBookSuccessAction {
    type: typeof STACK_DETAIL_ADD_BOOK_SUCCESS;
    book: BookStackRecord;
}

export interface StackDetailAddBookFailureAction {
    type: typeof STACK_DETAIL_ADD_BOOK_FAILURE;
    error: string;
}

export const stackDetailAddBookRequest: (
    bookId: number,
    stackId: number
) => StackDetailAddBookRequestAction = (bookId, stackId) => ({
    type: STACK_DETAIL_ADD_BOOK_REQUEST,
    bookId,
    stackId,
});

export const stackDetailAddBookSuccess: (
    book: BookStackRecord
) => StackDetailAddBookSuccessAction = (book) => ({
    type: STACK_DETAIL_ADD_BOOK_SUCCESS,
    book,
});

export const stackDetailAddBookFailure: (
    error: string
) => StackDetailAddBookFailureAction = (error) => ({
    type: STACK_DETAIL_ADD_BOOK_FAILURE,
    error,
});

/****************
 ** Remove Book **
 *****************/
export interface StackDetailRemoveBookRequestAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_REQUEST;
    id: number;
}

export interface StackDetailRemoveBookSuccessAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_SUCCESS;
    id: number;
}

export interface StackDetailRemoveBookFailureAction {
    type: typeof STACK_DETAIL_REMOVE_BOOK_FAILURE;
    error: string;
}

export const stackDetailRemoveBookRequest: (
    id: number
) => StackDetailRemoveBookRequestAction = (id) => ({
    type: STACK_DETAIL_REMOVE_BOOK_REQUEST,
    id,
});

export const stackDetailRemoveBookSuccess: (
    id: number
) => StackDetailRemoveBookSuccessAction = (id) => ({
    type: STACK_DETAIL_REMOVE_BOOK_SUCCESS,
    id,
});

export const stackDetailRemoveBookFailure: (
    error: string
) => StackDetailRemoveBookFailureAction = (error) => ({
    type: STACK_DETAIL_REMOVE_BOOK_FAILURE,
    error,
});

/*****************
 ** Add Category **
 ******************/
export interface StackDetailAddCategoryRequestAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_REQUEST;
    bookstackId: number;
    categoryId: number;
}

export interface StackDetailAddCategorySuccessAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_SUCCESS;
    bookstackId: string;
    category: ICategory;
}

export interface StackDetailAddCategoryFailureAction {
    type: typeof STACK_DETAIL_ADD_CATEGORY_FAILURE;
    error: string;
}

export const stackDetailAddCategoryRequest: (
    bookstackId: number,
    categoryId: number
) => StackDetailAddCategoryRequestAction = (bookstackId, categoryId) => ({
    type: STACK_DETAIL_ADD_CATEGORY_REQUEST,
    bookstackId,
    categoryId,
});

export const stackDetailAddCategorySuccess: (
    bookstackId: string,
    category: ICategory
) => StackDetailAddCategorySuccessAction = (bookstackId, category) => ({
    type: STACK_DETAIL_ADD_CATEGORY_SUCCESS,
    bookstackId,
    category,
});

export const stackDetailAddCategoryFailure: (
    error: string
) => StackDetailAddCategoryFailureAction = (error) => ({
    type: STACK_DETAIL_ADD_CATEGORY_FAILURE,
    error,
});

/*********************
 ** Add New Category **
 **********************/
export interface StackDetailAddNewCategoryRequestAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST;
    bookstackId: number;
    category: string;
}

export interface StackDetailAddNewCategorySuccessAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS;
}

export interface StackDetailAddNewCategoryFailureAction {
    type: typeof STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE;
    error: string;
}

export const stackDetailAddNewCategoryRequest: (
    bookstackId: number,
    category: string
) => StackDetailAddNewCategoryRequestAction = (bookstackId, category) => ({
    type: STACK_DETAIL_ADD_NEW_CATEGORY_REQUEST,
    bookstackId,
    category,
});

export const stackDetailAddNewCategorySuccess: () => StackDetailAddNewCategorySuccessAction = () => ({
    type: STACK_DETAIL_ADD_NEW_CATEGORY_SUCCESS,
});

export const stackDetailAddNewCategoryFailure: (
    error: string
) => StackDetailAddNewCategoryFailureAction = (error) => ({
    type: STACK_DETAIL_ADD_NEW_CATEGORY_FAILURE,
    error,
});

/********************
 ** Remove Category **
 *********************/
export interface StackDetailRemoveCategoryRequestAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_REQUEST;
    bookstackId: number;
    categoryId: number;
}

export interface StackDetailRemoveCategorySuccessAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_SUCCESS;
    bookstackId: number;
    categoryId: number;
}

export interface StackDetailRemoveCategoryFailureAction {
    type: typeof STACK_DETAIL_REMOVE_CATEGORY_FAILURE;
    error: string;
}

export const stackDetailRemoveCategoryRequest: (
    bookstackId: number,
    categoryId: number
) => StackDetailRemoveCategoryRequestAction = (bookstackId, categoryId) => ({
    type: STACK_DETAIL_REMOVE_CATEGORY_REQUEST,
    bookstackId,
    categoryId,
});

export const stackDetailRemoveCategorySuccess: (
    bookstackId: number,
    categoryId: number
) => StackDetailRemoveCategorySuccessAction = (bookstackId, categoryId) => ({
    type: STACK_DETAIL_REMOVE_CATEGORY_SUCCESS,
    bookstackId,
    categoryId,
});

export const stackDetailRemoveCategoryFailure: (
    error: string
) => StackDetailRemoveCategoryFailureAction = (error) => ({
    type: STACK_DETAIL_REMOVE_CATEGORY_FAILURE,
    error,
});

/********************************************************************
 ** SET CRAP, PROBABLY WILL DO THIS WITH INTERNAL COMPONENT INSTEAD **
 *********************************************************************/

export interface StackDetailSetEditingAction {
    type: typeof SET_EDITING;
    bookId: number;
    editing: boolean;
}

export interface StackDetailSetRemoveConfigAction {
    type: typeof SET_REMOVE_CONFIRM;
    bookId: number;
    removeConfirm: boolean;
}

export interface StackDetailSetAddingCategoryAction {
    type: typeof SET_ADDING_CATEGORY;
    bookId: number;
    addingCategory: boolean;
}

export interface StackDetailSetANewPositionAction {
    type: typeof SET_NEW_POSITION;
    bookId: number;
    newPosition: number | null;
}

export const setEditing: (
    bookId: number,
    editing: boolean
) => StackDetailSetEditingAction = (bookId, editing) => ({
    type: SET_EDITING,
    bookId,
    editing,
});

export const setRemoveConfig: (
    bookId: number,
    removeConfirm: boolean
) => StackDetailSetRemoveConfigAction = (bookId, removeConfirm) => ({
    type: SET_REMOVE_CONFIRM,
    bookId,
    removeConfirm,
});

export const setAddingCategory: (
    bookId: number,
    addingCategory: boolean
) => StackDetailSetAddingCategoryAction = (bookId, addingCategory) => ({
    type: SET_ADDING_CATEGORY,
    bookId,
    addingCategory,
});

export const setNewPosition: (
    bookId: number,
    newPosition: number | null
) => StackDetailSetANewPositionAction = (bookId, newPosition) => ({
    type: SET_NEW_POSITION,
    bookId,
    newPosition,
});

// State

export const defaultStackDetailRecordValue = {
    id: 0,
    name: "",
    private: false,
    user: "",
    creation_date: new Date(),
    books: List(),
};

export interface StackDetailParams {
    id?: number;
    name?: string;
    private?: boolean;
    user?: string;
    creation_date?: Date;
    books?: List<IBook>;
}

export class StackDetailRecord
    extends Record(defaultStackDetailRecordValue)
    implements IStackDetail {
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

interface FullStackDetailParams {
    stackDetail?: StackDetailRecord;
    error?: boolean;
    loading?: boolean;
    editing?: boolean;
}

export class FullStackDetailRecord
    extends Record(defaultFullStackDetailRecordValue)
    implements IFullStackDetail {
    constructor(params?: FullStackDetailParams) {
        params ? super(params) : super();
    }
    with(values: FullStackDetailParams) {
        return this.merge(values) as this;
    }
}

export const initialState = new FullStackDetailRecord();

const setInBook = (
    state: FullStackDetailRecord,
    bookId: number,
    path: string[],
    // tslint:disable-next-line no-any
    value: any
) =>
    state.setIn(
        [
            "stackDetail",
            "books",
            state.stackDetail.books.findIndex(
                (book) => book.get("id") === bookId
            ),
            ...path,
        ],
        value
    );

type StackDetailActionTypes =
    | StackDetailRequestAction
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
    | StackDetailRemoveCategoryFailureAction
    | StackDetailSetEditingAction
    | StackDetailSetRemoveConfigAction
    | StackDetailSetAddingCategoryAction
    | StackDetailSetANewPositionAction;

// TODO: This is probably too big, should be broken up
export default function stackDetailReducer(
    state = initialState,
    action: StackDetailActionTypes
) {
    let fullStackDetailRecord: FullStackDetailRecord;
    let stackDetail: StackDetailRecord = state.stackDetail;
    let books: List<IBook> = state.stackDetail.books;
    switch (action.type) {
        case STACK_DETAIL_SUCCESS:
            const newStack = action.stack;
            fullStackDetailRecord = state.with({ stackDetail: newStack });
            return fullStackDetailRecord;
        case STACK_DETAIL_CLEAR:
            fullStackDetailRecord = state.set(
                "stackDetail",
                fromJS({ books: [] })
            );
            return fullStackDetailRecord;
        case STACK_DETAIL_ADD_BOOK_SUCCESS:
            books = state.stackDetail.books.push(
                fromJS(action.book).merge({
                    editing: false,
                    newPosition: null,
                    removeConfirm: false,
                    addingCategory: false,
                })
            );
            stackDetail = state.stackDetail;
            fullStackDetailRecord = state.with({
                stackDetail: stackDetail.set("books", books),
            });
            return fullStackDetailRecord;
        case STACK_DETAIL_EDITING:
            fullStackDetailRecord = state.set("editing", !state.get("editing"));
            return fullStackDetailRecord;
        case STACK_DETAIL_READ_STATE_SUCCESS:
            fullStackDetailRecord = setInBook(
                state,
                action.bookId,
                ["read"],
                action.readState
            );
            return fullStackDetailRecord;
        case STACK_DETAIL_REMOVE_BOOK_SUCCESS:
            books = state.stackDetail.books.remove(
                books.findIndex((book) => book.id === action.id)
            );
            stackDetail = state.stackDetail.set("books", books);
            fullStackDetailRecord = state.with({ stackDetail });
            return fullStackDetailRecord;
        case STACK_DETAIL_ADD_CATEGORY_SUCCESS:
            fullStackDetailRecord = state.updateIn(
                [
                    "stackDetail",
                    "books",
                    state.stackDetail.books.findIndex(
                        (book) => book.get("id") === action.bookstackId
                    ),
                    "categories",
                ],
                (categories) => categories.push(action.category)
            );
            return fullStackDetailRecord;
        case STACK_DETAIL_REMOVE_CATEGORY_SUCCESS:
            fullStackDetailRecord = state.updateIn(
                [
                    "stackDetail",
                    "books",
                    state.stackDetail.books.findIndex(
                        (book) => book.get("id") === action.bookstackId
                    ),
                    "categories",
                ],
                (categories) =>
                    categories.remove(
                        categories.findIndex(
                            (book: BookStackRecord) =>
                                book.id === action.categoryId
                        )
                    )
            );
            return fullStackDetailRecord;
        case STACK_DETAIL_POSITION_SUCCESS: {
            const from = action.from - 1; // Damn this inconsistent indexing
            const to = action.to - 1;
            // TODO: Profile, possibly find a more
            // efficient / less icky way of doing this
            const books = state.stackDetail.books.toJS();
            const moved = books[from];
            books.splice(from, 1);
            books.splice(to, 0, moved);

            stackDetail = state.stackDetail.set(
                "books",
                List(books).map((book, index: number) =>
                    makeBookstack(book).set("position", index + 1)
                )
            );
            fullStackDetailRecord = state.with({ stackDetail });
            return fullStackDetailRecord;
        }
        // TODO: component state?
        case SET_EDITING:
            fullStackDetailRecord = setInBook(
                state,
                action.bookId,
                ["editing"],
                Boolean(action.editing)
            );
            return fullStackDetailRecord;
        case SET_REMOVE_CONFIRM:
            fullStackDetailRecord = setInBook(
                state,
                action.bookId,
                ["removeConfirm"],
                Boolean(action.removeConfirm)
            );
            return fullStackDetailRecord;
        case SET_ADDING_CATEGORY:
            fullStackDetailRecord = setInBook(
                state,
                action.bookId,
                ["addingCategory"],
                Boolean(action.addingCategory)
            );
            return fullStackDetailRecord;
        case SET_NEW_POSITION:
            fullStackDetailRecord = setInBook(
                state,
                action.bookId,
                ["newPosition"],
                action.newPosition
            );
            return fullStackDetailRecord;
        default:
            return state;
    }
}
