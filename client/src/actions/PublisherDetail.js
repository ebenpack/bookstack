import {makeAction} from './utils';

export const PUBLISHER_LOAD = 'PUBLISHER_LOAD';
export const PUBLISHER_SET = 'PUBLISHER_SET';

export const setPublisher = publisher =>
    makeAction(PUBLISHER_SET, {publisher});

export const loadPublisher = id =>
    makeAction(PUBLISHER_LOAD, {id});