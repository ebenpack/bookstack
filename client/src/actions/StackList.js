import {makeAction, createRequestTypes, REQUEST, SUCCESS, FAILURE, CLEAR} from './utils';

export const STACK = createRequestTypes('STACK', 'STACK', [REQUEST, SUCCESS, FAILURE, CLEAR]);

export const stack = {
    request: () => makeAction(STACK.REQUEST),
    success: stack => makeAction(STACK.SUCCESS, {stack}),
    clear: () => makeAction(STACK.CLEAR),
};