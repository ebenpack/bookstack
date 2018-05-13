import { sagaTest } from '../../utils/testUtils';
import {
    watchLoadStack,
    watchUpdateReadState,
    watchUpdatePosition,
    watchDeleteBook,
    watchAddCategory,
    watchDeleteCategory,
    watchAddBook,
} from '../stackDetailSagas';
import {
    STACK_DETAIL,
    POSITION,
    READ_STATE,
    ADD_BOOK,
    REMOVE_BOOK,
    ADD_CATEGORY,
    REMOVE_CATEGORY,
    addBook as addBookAction,
    addCategory as addCategoryAction,
    readState,
    stackDetail,
    position,
    removeBook,
    removeCategory,
    initialState,
} from '../stackDetailModule';
import { fromJS } from 'immutable';

sagaTest(
    'loadStack',
    { addBookStore: initialState },
    watchLoadStack,
    {
        method: 'GET',
        url: 'http://foo.bar.baz/api/stack/foobarbaz/',
    },
    { data: 'foo' },
    stackDetail.request('foobarbaz'),
    stackDetail.success('foo'),
    stackDetail.failure('Error message'),
    STACK_DETAIL.SUCCESS,
    STACK_DETAIL.FAILURE,
);

sagaTest(
    'updateReadState',
    { addBookStore: initialState },
    watchUpdateReadState,
    {
        method: 'PATCH',
        url: 'http://foo.bar.baz/api/bookstack/foobarbaz/',
        data: {
            read: true,
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
    },
    { data: { read: true } },
    readState.request('foobarbaz', true),
    readState.success('foobarbaz', true),
    readState.failure('Error message'),
    READ_STATE.SUCCESS,
    READ_STATE.FAILURE,
);

sagaTest(
    'updatePosition',
    {
        stackDetailStore: initialState.setIn(
            ['stackDetail', 'books'],
            fromJS([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]),
        ),
    },
    watchUpdatePosition,
    {
        method: 'PATCH',
        url: 'http://foo.bar.baz/api/bookstack/foobarbaz/renumber/',
        data: {
            position: 3,
        },
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
    },
    { data: 'foo' },
    position.request('foobarbaz', 1, 3),
    position.success('foobarbaz', 1, 3),
    position.failure('Error message'),
    POSITION.SUCCESS,
    POSITION.FAILURE,
);

sagaTest(
    'deleteBook',
    { addBookStore: initialState },
    watchDeleteBook,
    {
        method: 'DELETE',
        url: 'http://foo.bar.baz/api/bookstack/foobarbaz/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
    },
    { data: 'foo' },
    removeBook.request('foobarbaz'),
    removeBook.success('foobarbaz'),
    removeBook.failure('Error message'),
    REMOVE_BOOK.SUCCESS,
    REMOVE_BOOK.FAILURE,
);

// TODO: addNewCategory

sagaTest(
    'addCategory',
    { addBookStore: initialState },
    watchAddCategory,
    {
        method: 'POST',
        url: 'http://foo.bar.baz/api/bookstackcategory/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
        data: {
            bookstack: 'foobar',
            category: 'bazqux',
        },
    },
    { data: { bookstack: 'foobar', category: 'bazqux' } },
    addCategoryAction.request('foobar', 'bazqux'),
    addCategoryAction.success('foobar', 'bazqux'),
    addCategoryAction.failure('Error message'),
    ADD_CATEGORY.SUCCESS,
    ADD_CATEGORY.FAILURE,
);

sagaTest(
    'deleteCategory',
    { addBookStore: initialState },
    watchDeleteCategory,
    {
        method: 'DELETE',
        url: 'http://foo.bar.baz/api/bookstackcategory/bazqux/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
    },
    { data: 'foo' },
    removeCategory.request('foobar', 'bazqux'),
    removeCategory.success('foobar', 'bazqux'),
    removeCategory.failure('Error message'),
    REMOVE_CATEGORY.SUCCESS,
    REMOVE_CATEGORY.FAILURE,
);

sagaTest(
    'addBook',
    { addBookStore: initialState },
    watchAddBook,
    {
        method: 'POST',
        url: 'http://foo.bar.baz/api/bookstack/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token',
        },
        data: {
            categories: [],
            book_id: 'foobar',
            stack_id: 'bazqux',
        },
    },
    { data: 'foo' },
    addBookAction.request('foobar', 'bazqux'),
    addBookAction.success('foo'),
    addBookAction.failure('Error message'),
    ADD_BOOK.SUCCESS,
    ADD_BOOK.FAILURE,
);
