import Immutable from 'immutable';

import {PUBLISHER} from '../actions/PublisherDetail';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function PublisherDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case PUBLISHER.SUCCESS:
            return Immutable.fromJS(action.publisher);
        default:
            return state;
    }
}