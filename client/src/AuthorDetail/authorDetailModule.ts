import { Record, List } from "immutable";

import { IAuthor } from "../AuthorDetail/types";
import { IBook } from "../Book/types";

const defaultAuthorProps: IAuthor = {
    id: 0,
    name: "",
    books: List(),
};

interface AuthorParams {
    id?: number;
    name?: string;
    books?: List<IBook>;
}

export class AuthorRecord
    extends Record(defaultAuthorProps)
    implements IAuthor {
    constructor(params?: AuthorParams) {
        params ? super(params) : super();
    }
    with(values: AuthorParams) {
        return this.merge(values) as this;
    }
}

export const AUTHOR_INITIALIZE = "AUTHOR_INITIALIZE";

export const AUTHOR_REQUEST = "AUTHOR_REQUEST";
export const AUTHOR_SUCCESS = "AUTHOR_SUCCESS";
export const AUTHOR_FAILURE = "AUTHOR_FAILURE";

// Actions

export const initializeAuthor = () => ({ type: AUTHOR_INITIALIZE });

export interface AuthorRequestAction {
    type: typeof AUTHOR_REQUEST;
    id: string;
}

export interface AuthorSuccessAction {
    type: typeof AUTHOR_SUCCESS;
    author: IAuthor;
}

export interface AuthorFailureAction {
    type: typeof AUTHOR_FAILURE;
    error: string;
}

// Action Creators
export const authorRequest: (id: string) => AuthorRequestAction = (id) => ({
    type: AUTHOR_REQUEST,
    id,
});

export const authorSuccess: (author: IAuthor) => AuthorSuccessAction = (
    author
) => ({ type: AUTHOR_SUCCESS, author });

export const authorFailure: (error: string) => AuthorFailureAction = (
    error
) => ({
    type: AUTHOR_FAILURE,
    error,
});

export type AuthorAction =
    | AuthorRequestAction
    | AuthorSuccessAction
    | AuthorFailureAction;

// State
export const initialState = new AuthorRecord({
    books: List(),
    name: "",
});

export default function AuthorDetailReducer(
    state = initialState,
    action: AuthorAction
) {
    switch (action.type) {
        case AUTHOR_SUCCESS:
            return new AuthorRecord(action.author);
        default:
            return state;
    }
}
