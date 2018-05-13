import { fromJS } from 'immutable';
// eslint-disable-next-line import/no-extraneous-dependencies
import SagaTester from 'redux-saga-tester';
import axios from 'axios';

jest.mock('axios');

// eslint-disable-next-line import/prefer-default-export
export const sagaTest = (testName, initialState, saga, request, response, requestAction, successAction, failureAction, SUCCESS, FAILURE) => {
    describe(testName, () => {
        let sagaTester = null;
        beforeEach(() => {
            jest.resetAllMocks();
            sagaTester = new SagaTester({
                initialState: {
                    appStore: fromJS({
                        apiUrl: 'http://foo.bar.baz',
                        token: 'token',
                    }),
                    ...initialState,
                },
            });
            sagaTester.start(saga);
        });

        it('should retrieve data from the server and send a SUCCESS action', async () => {
            axios.mockReturnValue(Promise.resolve(response));
            sagaTester.dispatch(requestAction);
            await sagaTester.waitFor(SUCCESS);
            expect(axios).toBeCalledWith(request);
            expect(sagaTester.getLatestCalledAction())
                .toEqual(successAction);
        });
        it('should send a FAILURE action when there is an error retrieving data from the server', async () => {
            // eslint-disable-next-line prefer-promise-reject-errors
            axios.mockReturnValue(Promise.reject({ response: { data: 'Error message' } }));
            sagaTester.dispatch(requestAction);
            await sagaTester.waitFor(FAILURE);
            expect(axios).toBeCalledWith(request);
            expect(sagaTester.getLatestCalledAction())
                .toEqual(failureAction);
        });
    });
};
