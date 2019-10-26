import Immutable, { Record, List } from 'immutable';

import { IAuthor, IAuthorRecord } from '../AuthorDetail/types'; 
import { IBook } from '../Book/types'; 

const defaultAuthorProps: IAuthor = {
    id: 0,
    name: '',
    books: List(),
}

export class AuthorRecord extends Record(defaultAuthorProps) implements IAuthorRecord {
    public readonly id!: number
    public readonly name!: string
    public readonly books!: List<IBook>
}

const AUTHOR_REQUEST = 'AUTHOR_REQUEST';
const AUTHOR_SUCCESS = 'AUTHOR_SUCCESS';
const AUTHOR_FAILURE = 'AUTHOR_FAILURE';

// Actions
export type FetchAuthor = {
    type: 'AUTHOR_REQUEST',
    id: number,
};
export type FetchAuthorSuccess = {
    type: 'AUTHOR_SUCCESS',
    author: IAuthor,
};
export type FetchAuthorFailure = {
    type: 'AUTHOR_FAILURE',
    error: Error
};

export type AuthorAction =
    | FetchAuthor
    | FetchAuthorSuccess
    | FetchAuthorFailure;

// Action Creators
export const authorRequest = (id: number): FetchAuthor => 
    ({ type: AUTHOR_REQUEST, id });

export const authorSuccess = (author: IAuthor): FetchAuthorSuccess =>
    ({ type: AUTHOR_SUCCESS, author });

export const authorFailure = (error: Error): FetchAuthorFailure =>
    ({ type: AUTHOR_FAILURE, error });

// State
export const initialState = new AuthorRecord({
    books: List(),
    name: '',
});

export default function AuthorDetailReducer(state = initialState, action: AuthorAction): IAuthorRecord {
    switch (action.type) {
    case AUTHOR_SUCCESS:
        return new AuthorRecord(action.author);
    default:
        return state;
    }
}
