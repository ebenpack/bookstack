export const REQUEST = 'REQUEST';
export const LOADING = 'LOADING';
export const EDITING = 'EDITING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';
export const CLEAR = 'CLEAR';
export const SET = 'SET';

export const createRequestTypes = (namespace, action, types = [REQUEST, SUCCESS, FAILURE]) =>
    types.reduce((acc, type) => {
        acc[type] = `${namespace}_${action}_${type}`;
        return acc;
    }, {});

export const makeAction = (type, args = {}) => ({
    type,
    ...args,
});
