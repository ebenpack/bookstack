import {makeAction, createRequestTypes} from './utils';

export const PUBLISHER = createRequestTypes('PUBLISHER', 'PUBLISHER');

export const publisher = {
    request: id => makeAction(PUBLISHER.REQUEST, {id}),
    success: publisher => makeAction(PUBLISHER.SUCCESS, {publisher})
};