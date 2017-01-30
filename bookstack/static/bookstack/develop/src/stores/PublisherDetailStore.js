import Immutable from 'immutable';

export default function PublisherDetailReducer(state = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
}), action) {
    switch (action.type) {
        case 'PUBLISHER_LOAD':
            return Immutable.fromJS(action.publisher);
        default:
            return state;
    }
}