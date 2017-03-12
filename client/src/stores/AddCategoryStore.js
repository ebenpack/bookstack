import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    autoSuggestCategories: []
});

export default function categoryReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_CATAGORY_AUTOCOMPLETE_SUGGESTIONS':
            return state.set('autoSuggestCategories', Immutable.fromJS(action.autoSuggestCategories));
        case 'ADD_CATAGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS':
            return state.set('autoSuggestCategories', Immutable.List());
        default:
            return state;
    }
}