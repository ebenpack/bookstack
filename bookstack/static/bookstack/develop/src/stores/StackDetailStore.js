import Immutable from 'immutable';

export default function stackDetailReducer(state = Immutable.fromJS({
    stackDetail: {
        books: []
    },
    error: false,
    loading: false,
    editing: false,
}), action) {
    switch (action.type) {
        case 'STACK_DETAIL_LOAD':
            return state.set('stackDetail', Immutable.fromJS(action.value));
        case 'STACK_DETAIL_UNLOAD':
            return state.set('stackDetail', Immutable.fromJS({
                books: []
            }));
        case 'STACK_DETAIL_ADD_BOOK':
            return state.updateIn(
                ['stackDetail', 'books'],
                books => books.push(action.book)
            );
        case 'STACK_DETAIL_TOGGLE_EDITING':
            return state.set('editing', !state.get('editing'));
        case 'STACK_DETAIL_SET_LOADING_STATE':
            return state.set('loading', action.state);
        case 'STACK_DETAIL_SET_READ_STATE':
            return state.setIn(
                [
                    'stackDetail',
                    'books',
                    state.getIn(['stackDetail', 'books']).findIndex(book => book.get('id') === action.id),
                    'read'
                ],
                action.read
            );
        case 'STACK_DETAIL_REMOVE_BOOK':
            return state.updateIn(
                ['stackDetail', 'books'],
                books =>
                    books.remove(
                        books.findIndex(book => book.get('id') === action.id)
                    )
            );
        default:
            return state;
    }
}