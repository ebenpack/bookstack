import Immutable from 'immutable';

import {
    STACK_DETAIL,
    POSITION,
    READ_STATE,
    ADD_BOOK,
    REMOVE_BOOK,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
} from '../actions/StackDetail';


const bookLocation = Immutable.List(['stackDetail', 'books']);

const defaultState = Immutable.fromJS({
    stackDetail: {
        books: [],
    },
    error: false,
    loading: false,
    editing: false,
});

// TODO: This is probably too big, should be broken up
export default function stackDetailReducer(state = defaultState, action) {
    switch (action.type) {
    case STACK_DETAIL.SUCCESS:
        return state.set('stackDetail', Immutable.fromJS(action.stack));
    case STACK_DETAIL.CLEAR:
        return state.set('stackDetail', Immutable.fromJS({ books: [] }));
    case ADD_BOOK.SUCCESS:
        return state.updateIn(
            bookLocation,
            books => books.push(Immutable.fromJS(action.book)),
        );
    case STACK_DETAIL.EDITING:
        return state.set('editing', !state.get('editing'));
    case READ_STATE.SUCCESS:
        return state.setIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.id),
                'read',
            ],
            action.read,
        );
    case REMOVE_BOOK.SUCCESS:
        return state.updateIn(
            bookLocation,
            books =>
                books.remove(books.findIndex(book => book.get('id') === action.id)),
        );
    case ADD_CATEGORY.SUCCESS:
        return state.updateIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.bookstackId),
                'categories',
            ],
            categories =>
                categories.push(Immutable.fromJS(action.category)),
        );
    case REMOVE_CATEGORY.SUCCESS:
        return state.updateIn(
            [
                'stackDetail',
                'books',
                state.getIn(bookLocation)
                    .findIndex(book => book.get('id') === action.bookstackId),
                'categories',
            ],
            categories =>
                categories.remove(categories.findIndex(book => book.get('id') === action.categoryId)),
        );
    case POSITION.SUCCESS: {
        const from = action.from - 1; // Damn this inconsistent indexing
        const to = action.to - 1;
        // TODO: Profile, possibly find a more
        // efficient / less icky way of doing this
        const books = state.getIn(bookLocation).toJS();
        const moved = books[from];
        books.splice(from, 1);
        books.splice(to, 0, moved);

        return state.setIn(
            bookLocation,
            Immutable.fromJS(books).map((book, index) => book.set('position', index + 1)),
        );
    }
    default:
        return state;
    }
}
