import Immutable from 'immutable';

export default function AuthorDetailReducer(state = Immutable.fromJS({
    books: [],
    name: ''
}), action) {
    switch (action.type) {
        case 'AUTHOR_LOAD':
            return Immutable.fromJS(action.author);
        default:
            return state;
    }
}