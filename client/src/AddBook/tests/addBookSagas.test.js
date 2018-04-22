import { fromJS } from 'immutable';
import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import {
    watchBookSearch,
    watchGetBook,
    watchAddBook,
} from '../addBookSagas';
import {
    initialState,
    addBook,
    getBook,
    searchBooks,
    selectBook,
    ADD_BOOK,
    SELECT_BOOK,
    SEARCH_BOOK,
} from '../addBookModule';

jest.mock('axios');

describe('bookSearch', () => {
    let sagaTester = null;
    beforeEach(() => {
        jest.resetAllMocks();
        sagaTester = new SagaTester({
            initialState: {
                appStore: fromJS({
                    apiUrl: 'http://foo.bar.baz',
                    token: 'token',
                }),
                addBookStore: initialState,
            },
        });
        sagaTester.start(watchBookSearch);
    });

    it('should retrieve data from the server and send a SUCCESS action', async () => {
        axios.mockReturnValue(Promise.resolve({ data: 'foo' }));
        sagaTester.dispatch(searchBooks.request('foobarbaz'));
        await sagaTester.waitFor(SEARCH_BOOK.SUCCESS);
        expect(axios).toBeCalledWith({
            method: 'GET',
            url: 'http://foo.bar.baz/api/book/?search=foobarbaz',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(searchBooks.success('foo'));
    });
    it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
        axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
        sagaTester.dispatch(searchBooks.request('foobarbaz'));
        await sagaTester.waitFor(SEARCH_BOOK.FAILURE);
        expect(axios).toBeCalledWith({
            method: 'GET',
            url: 'http://foo.bar.baz/api/book/?search=foobarbaz',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(searchBooks.failure('Error message'));
    });
});

describe('getBook', () => {
    let sagaTester = null;
    beforeEach(() => {
        jest.resetAllMocks();
        sagaTester = new SagaTester({
            initialState: {
                appStore: fromJS({
                    apiUrl: 'http://foo.bar.baz',
                    token: 'token',
                }),
                addBookStore: initialState,
            },
        });
        sagaTester.start(watchGetBook);
    });

    it('should retrieve data from the server and send a SUCCESS action', async () => {
        axios.mockReturnValue(Promise.resolve({ data: 'foo' }));
        sagaTester.dispatch(getBook.request('foobarbaz'));
        await sagaTester.waitFor(SELECT_BOOK.SUCCESS);
        expect(axios).toBeCalledWith({
            method: 'GET',
            url: 'http://foo.bar.baz/api/book/foobarbaz/',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(selectBook.success('foo'));
    });
    it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
        axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
        sagaTester.dispatch(getBook.request('foobarbaz'));
        await sagaTester.waitFor(SELECT_BOOK.FAILURE);
        expect(axios).toBeCalledWith({
            method: 'GET',
            url: 'http://foo.bar.baz/api/book/foobarbaz/',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(selectBook.failure('Error message'));
    });
});

describe('addBook', () => {
    let sagaTester = null;
    beforeEach(() => {
        jest.resetAllMocks();
        sagaTester = new SagaTester({
            initialState: {
                appStore: fromJS({
                    apiUrl: 'http://foo.bar.baz',
                    token: 'token',
                }),
                addBookStore: initialState,
            },
        });
        sagaTester.start(watchAddBook);
    });

    it('should retrieve data from the server and send a SUCCESS action', async () => {
        axios.mockReturnValue(Promise.resolve({ data: 'foo' }));
        sagaTester.dispatch(addBook.request(fromJS({ title: 'foo' })));
        await sagaTester.waitFor(ADD_BOOK.SUCCESS);
        expect(axios).toBeCalledWith({
            method: 'POST',
            url: 'http://foo.bar.baz/api/book/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token token',
            },
            data: { title: 'foo' },
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(addBook.success('foo'));
    });
    it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
        axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
        sagaTester.dispatch(addBook.request(fromJS({ title: 'foo' })));
        await sagaTester.waitFor(ADD_BOOK.FAILURE);
        expect(axios).toBeCalledWith({
            method: 'POST',
            url: 'http://foo.bar.baz/api/book/',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token token',
            },
            data: { title: 'foo' },
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(addBook.failure('Error message'));
    });
});
