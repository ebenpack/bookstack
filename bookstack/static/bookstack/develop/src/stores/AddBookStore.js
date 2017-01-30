import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    title: '',
    booksAutocomplete: [],
    selectedBook: {
        "title": "",
        "pages": "",
        "isbn": "",
        "img": "",
        "authors": [],
        "publishers": [],
        "id": ""
    },
});

export default function addBookReducer(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_BOOK_SELECT_BOOK':
            return state.set('selectedBook', Immutable.fromJS(action.selectedBook));
        case 'ADD_BOOK_AUTOCOMPLETE_SUGGESTIONS':
            return state.set('booksAutocomplete', Immutable.fromJS(action.booksAutocomplete));
        case 'ADD_BOOK_CLEAR_SELECTED':
            return state.set('selectedBook', Immutable.fromJS({
                "title": "",
                "pages": "",
                "isbn": "",
                "img": "",
                "authors": [],
                "publishers": [],
                "id": ""
            }));
        default:
            return state;
    }
}