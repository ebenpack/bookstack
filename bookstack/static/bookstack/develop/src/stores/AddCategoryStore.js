import Immutable from 'immutable';

export default function categoryReducer(state = Immutable.fromJS({
    autoSuggestCategories: []
}), action) {
    switch (action.type) {
        case 'ADD_CATAGORY_AUTOCOMPLETE_SUGGESTIONS':
            return state.set('autoSuggestCategories', Immutable.fromJS(action.autoSuggestCategories));
        case 'ADD_CATAGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS':
            return state.set('autoSuggestCategories', Immutable.List());
        default:
            return state;
    }
}