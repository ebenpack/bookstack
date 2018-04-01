import { makeAction, createRequestTypes } from './utils';

export const AUTHOR = createRequestTypes('AUTHOR', 'AUTHOR');

export const author = {
    request: id => makeAction(AUTHOR.REQUEST, { id }),
    success: auth => makeAction(AUTHOR.SUCCESS, { author: auth }),
};
