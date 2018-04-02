import Immutable from 'immutable';

import { makeAction, createRequestTypes } from '../utils/moduleUtils';

// Actions

export const PUBLISHER = createRequestTypes('PUBLISHER', 'PUBLISHER');

export const publisher = {
    request: id =>
        makeAction(PUBLISHER.REQUEST, { id }),
    success: pub =>
        makeAction(PUBLISHER.SUCCESS, { publisher: pub }),
    failure: error =>
        makeAction(PUBLISHER.FAILURE, { error }),
};

// State

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0,
});

export default function PublisherDetailReducer(state = defaultState, action) {
    switch (action.type) {
    case PUBLISHER.SUCCESS:
        return Immutable.fromJS(action.publisher);
    default:
        return state;
    }
}
