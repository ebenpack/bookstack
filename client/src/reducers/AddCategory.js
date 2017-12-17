import Immutable from 'immutable';

import {SEARCH} from '../actions/AddCategory';

const defaultState = Immutable.fromJS({
    autoSuggestCategories: []
});

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case SEARCH.SUCCESS:
            return state.set('autoSuggestCategories', Immutable.fromJS(action.suggestions));
        case SEARCH.CLEAR:
            return state.set('autoSuggestCategories', Immutable.List());
        default:
            return state;
    }
}