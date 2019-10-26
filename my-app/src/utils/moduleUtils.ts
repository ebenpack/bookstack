export const REQUEST = 'REQUEST';
export const LOADING = 'LOADING';
export const EDITING = 'EDITING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CLEAR = 'CLEAR';
export const SET = 'SET';

type RequestTypes = { [key: string]: string };

export const createRequestTypes = (namespace: string, action: string, types = [REQUEST, SUCCESS, FAILURE]): RequestTypes =>
    types.reduce((acc: object, type: string): RequestTypes => {
        acc[type] = `${namespace}_${action}_${type}`;
        return acc;
    }, {});

export const makeAction = (type: string, args = {}): object => ({
    type,
    ...args,
});
