import {makeAction} from './utils';

export const AUTHOR_LOAD = 'AUTHOR_LOAD';
export const AUTHOR_SET = 'AUTHOR_SET';

export const setAuthor = author =>
    makeAction(AUTHOR_SET, {author});

export const loadAuthor = id =>
    makeAction(AUTHOR_LOAD, {id});