import { List, Record } from 'immutable';

import { IPublisher } from './types';
import { IBook } from '../Book/types';

// Actions
export const PUBLISHER_INITIALIZE = 'PUBLISHER_INITIALIZE';

export const PUBLISHER_REQUEST = 'PUBLISHER_REQUEST';
export const PUBLISHER_SUCCESS = 'PUBLISHER_SUCCESS';
export const PUBLISHER_FAILURE = 'PUBLISHER_FAILURE';

export const initializePublisher = () => ({ type: PUBLISHER_INITIALIZE });

export interface PublisherRequestAction {
    type: typeof PUBLISHER_REQUEST;
    id: string;
}

export interface PublisherSuccessAction {
    type: typeof PUBLISHER_SUCCESS;
    publisher: IPublisher;
}

export interface PublisherFailureAction {
    type: typeof PUBLISHER_FAILURE;
    error: string;
}

export const publisherRequest: (id: string) => PublisherRequestAction = id => ({
    type: PUBLISHER_REQUEST,
    id,
});

export const publisherSuccess: (
    publisher: IPublisher
) => PublisherSuccessAction = publisher => ({
    type: PUBLISHER_SUCCESS,
    publisher,
});

export const publisherFailure: (
    error: string
) => PublisherFailureAction = error => ({ type: PUBLISHER_FAILURE, error });

export type PublisherAction =
    | PublisherRequestAction
    | PublisherSuccessAction
    | PublisherFailureAction;

// State
const defaultValue = { id: 0, name: '', books: List() };

interface PublisherRecordParams {
    id?: number;
    name?: string;
    books?: List<IBook>;
}

export class PublisherRecord extends Record(defaultValue)
    implements IPublisher {
    constructor(params?: PublisherRecordParams) {
        params ? super(params) : super();
    }
}

export const initialState = new PublisherRecord();

export default function PublisherDetailReducer(
    state = initialState,
    action: PublisherAction
) {
    switch (action.type) {
        case PUBLISHER_SUCCESS:
            return new PublisherRecord(action.publisher);
        default:
            return state;
    }
}
