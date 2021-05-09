import { fromJS } from "immutable";
// eslint-disable-next-line import/no-extraneous-dependencies
import SagaTester, { SagaFunction } from "redux-saga-tester";
import axios from "axios";
import { AnyAction } from "redux";
import { AppRecord } from "../App/appModule";

jest.mock("axios");

const mockedAxios = (axios as unknown) as jest.Mock<typeof axios>;

// eslint-disable-next-line import/prefer-default-export
export const sagaTest = <T extends object = {}>(
    initialState: T,
    saga: SagaFunction,
    request: {},
    response: {},
    requestAction: AnyAction,
    successAction: AnyAction,
    failureAction: AnyAction,
    SUCCESS: string,
    FAILURE: string
) => {
    let sagaTester: SagaTester<T> = new SagaTester({
        initialState: {
            appStore: fromJS({
                apiUrl: "http://foo.bar.baz",
                token: "token",
            }),
            ...initialState,
        },
    });
    beforeEach(() => {
        jest.resetAllMocks();
        sagaTester = new SagaTester({
            initialState: {
                appStore: new AppRecord({
                    apiUrl: "http://foo.bar.baz",
                    token: "token",
                }),
                ...initialState,
            },
        });
        sagaTester.start(saga);
    });

    it("should retrieve data from the server and send a SUCCESS action", async () => {
        // @ts-ignore
        mockedAxios.mockResolvedValue(response);
        sagaTester.dispatch(requestAction);
        await sagaTester.waitFor(SUCCESS);
        expect(mockedAxios).toBeCalledWith(request);
        expect(sagaTester.getLatestCalledAction()).toEqual(successAction);
    });
    it("should send a FAILURE action when there is an error retrieving data from the server", async () => {
        // @ts-ignore
        mockedAxios.mockRejectedValue({ response: { data: "Error message" } });
        sagaTester.dispatch(requestAction);
        await sagaTester.waitFor(FAILURE);
        expect(mockedAxios).toBeCalledWith(request);
        expect(sagaTester.getLatestCalledAction()).toEqual(failureAction);
    });
};
