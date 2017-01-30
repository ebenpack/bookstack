import Immutable from 'immutable';

export default function BookSearchReducer(state = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
}), action) {
    switch (action.type) {
        case 'BOOKSEARCH_SET_BOOKS':
            return Immutable.fromJS({books: action.books});
        default:
            return state;
    }
}