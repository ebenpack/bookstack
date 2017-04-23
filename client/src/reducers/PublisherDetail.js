import Immutable from 'immutable';

import * as publisherDetailActions from '../actions/PublisherDetail';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function PublisherDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case publisherDetailActions.PUBLISHER_SET:
            return Immutable.fromJS(action.publisher);
        default:
            return state;
    }
}