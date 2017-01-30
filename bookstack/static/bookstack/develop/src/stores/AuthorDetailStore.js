import Immutable from 'immutable';

defaultState = Immutable.fromJS({
    books: [],
    name: ''
});

export default function AuthorDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case 'AUTHOR_LOAD':
            return Immutable.fromJS(action.author);
        default:
            return state;
    }
}