import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function PublisherDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case 'PUBLISHER_LOAD':
            return Immutable.fromJS(action.publisher);
        default:
            return state;
    }
}