import {makeAction} from './utils';

export const STACK_LOAD = 'STACK_LOAD';
export const STACK_UNLOAD = 'STACK_UNLOAD';
export const STACK_SET = 'STACK_SET';

export const loadStackList = () =>
    makeAction(STACK_LOAD);

export const unloadStackList = () =>
    makeAction(STACK_UNLOAD);

export const setStack = stack =>
    makeAction(STACK_SET, {stack});