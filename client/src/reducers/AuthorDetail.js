import Immutable from 'immutable';

import { AUTHOR } from '../actions/AuthorDetail';

const defaultState = Immutable.fromJS({
    books: [],
    name: '',
});

export default function AuthorDetailReducer(state = defaultState, action) {
    switch (action.type) {
    case AUTHOR.SUCCESS:
        return Immutable.fromJS(action.author);
    default:
        return state;
    }
}
