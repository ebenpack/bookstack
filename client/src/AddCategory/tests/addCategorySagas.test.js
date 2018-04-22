import { fromJS } from 'immutable';
import SagaTester from 'redux-saga-tester';
import axios from 'axios';
import {
    watchAddCategory,
    watchSetAutoSuggestCategories,
} from '../addCategorySagas';
import {
    initialState,
    addCategory,
    categorySearch,
    ADD,
    SEARCH,
} from '../addCategoryModule';

jest.mock('axios');

describe('addCategory', () => {
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
        sagaTester.start(watchAddCategory);
    });

    it('should retrieve data from the server and send a SUCCESS action', async () => {
        axios.mockReturnValue(Promise.resolve({ data: 'foo' }));
        sagaTester.dispatch(addCategory.request('foobarbaz'));
        await sagaTester.waitFor(ADD.SUCCESS);
        expect(axios).toBeCalledWith({
            url: 'http://foo.bar.baz/api/category/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token token',
            },
            data: { category: 'foobarbaz' },
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(addCategory.success('foo'));
    });
    it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
        axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
        sagaTester.dispatch(addCategory.request('foobarbaz'));
        await sagaTester.waitFor(ADD.FAILURE);
        expect(axios).toBeCalledWith({
            url: 'http://foo.bar.baz/api/category/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Token token',
            },
            data: { category: 'foobarbaz' },
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(addCategory.failure('Error message'));
    });
});

describe('setAutoSuggestCategories', () => {
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
        sagaTester.start(watchSetAutoSuggestCategories);
    });

    it('should retrieve data from the server and send a SUCCESS action', async () => {
        axios.mockReturnValue(Promise.resolve({ data: 'foo' }));
        sagaTester.dispatch(categorySearch.request('foobarbaz'));
        await sagaTester.waitFor(SEARCH.SUCCESS);
        expect(axios).toBeCalledWith({
            url: 'http://foo.bar.baz/api/category/?search=foobarbaz',
            method: 'GET',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(categorySearch.success('foo'));
    });
    it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
        axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
        sagaTester.dispatch(categorySearch.request('foobarbaz'));
        await sagaTester.waitFor(SEARCH.FAILURE);
        expect(axios).toBeCalledWith({
            url: 'http://foo.bar.baz/api/category/?search=foobarbaz',
            method: 'GET',
        });
        expect(sagaTester.getLatestCalledAction())
            .toEqual(categorySearch.failure('Error message'));
    });
});
