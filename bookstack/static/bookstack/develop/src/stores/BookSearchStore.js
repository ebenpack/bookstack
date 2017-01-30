import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
    id: 0
});

export default function BookSearchReducer(state = defaultState, action) {
    switch (action.type) {
        case 'BOOKSEARCH_SET_BOOKS':
            return Immutable.fromJS({books: action.books});
        default:
            return state;
    }
}