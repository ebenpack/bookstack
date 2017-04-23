import Immutable from 'immutable';

import * as addCategoryActions from '../actions/AddCategory';

const defaultState = Immutable.fromJS({
    autoSuggestCategories: []
});

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case addCategoryActions.ADD_CATEGORY_SET_AUTOCOMPLETE_SUGGESTIONS:
            return state.set('autoSuggestCategories', Immutable.fromJS(action.autoSuggestCategories));
        case addCategoryActions.ADD_CATEGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS:
            return state.set('autoSuggestCategories', Immutable.List());
        default:
            return state;
    }
}