import Immutable from 'immutable';

import * as stackDetailActions from '../actions/StackDetail';

const bookLocation = Immutable.List(['stackDetail', 'books']);

const defaultState = Immutable.fromJS({
    stackDetail: {
        books: []
    },
    error: false,
    loading: false,
    editing: false,
});

// TODO: This is probably too big, should be broken up
export default function stackDetailReducer(state = defaultState, action) {
    switch (action.type) {
        case stackDetailActions.STACK_DETAIL_SET:
            return state.set('stackDetail', Immutable.fromJS(action.stack));
        case stackDetailActions.STACK_DETAIL_UNLOAD:
            return state.set('stackDetail', Immutable.fromJS({books: []}));
        case stackDetailActions.STACK_DETAIL_SET_BOOK:
            return state.updateIn(
                bookLocation,
                books => books.push(Immutable.fromJS(action.book))
            );
        case stackDetailActions.STACK_DETAIL_SET_EDITING_STATE:
            return state.set('editing', !state.get('editing'));
        case stackDetailActions.STACK_DETAIL_SET_READ_STATE:
            return state.setIn(
                [
                    'stackDetail',
                    'books',
                    state.getIn(bookLocation)
                        .findIndex(book => book.get('id') === action.id),
                    'read'
                ],
                action.read
            );
        case stackDetailActions.STACK_DETAIL_REMOVE_BOOK:
            return state.updateIn(
                bookLocation,
                books =>
                    books.remove(
                        books.findIndex(book => book.get('id') === action.id)
                    )
            );
        case stackDetailActions.STACK_DETAIL_SET_CATEGORY:
            return state.updateIn(
                [
                    'stackDetail',
                    'books',
                    state.getIn(bookLocation)
                        .findIndex(book => book.get('id') === action.category.bookstack),
                    'categories'
                ],
                categories =>
                    categories.push(Immutable.fromJS(action.category))
            );
        case stackDetailActions.STACK_DETAIL_REMOVE_CATEGORY:
            return state.updateIn(
                [
                    'stackDetail',
                    'books',
                    state.getIn(bookLocation)
                        .findIndex(book => book.get('id') === action.bookstackId),
                    'categories'
                ],
                categories =>
                    categories.remove(
                        categories.findIndex(book => book.get('id') === action.categoryId),
                    )
            );
        case stackDetailActions.STACK_DETAIL_SET_POSITION:
            let from = action.from - 1; // Damn this inconsistent indexing
            let to = action.to - 1;
            // TODO: Profile, possibly find a more
            // efficient / less icky way of doing this
            let books = state.getIn(bookLocation).toJS();
            let moved = books[from];
            books.splice(from, 1);
            books.splice(to, 0, moved);
            books.forEach(((book, index)=>book.position = index+1));
            return state.setIn(
                bookLocation,
                Immutable.fromJS(
                    books
                )
            );
        default:
            return state;
    }
}