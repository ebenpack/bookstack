import {makeAction, createRequestTypes} from './utils';

export const AUTHOR = createRequestTypes('AUTHOR', 'AUTHOR');

export const author = {
    request: id => makeAction(AUTHOR.REQUEST, {id}),
    success: author => makeAction(AUTHOR.SUCCESS, {author}),
};