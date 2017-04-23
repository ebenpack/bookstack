import Immutable from 'immutable';

import * as authorDetailActions from '../actions/AuthorDetail';

const defaultState = Immutable.fromJS({
    books: [],
    name: ''
});

export default function AuthorDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case authorDetailActions.AUTHOR_SET:
            return Immutable.fromJS(action.author);
        default:
            return state;
    }
}