import { fromJS, List } from 'immutable';
import { StackDetailRecord } from '../StackDetail/stackDetailModule';

// Actions
export const STACK_REQUEST = 'STACK_REQUEST';
export const STACK_SUCCESS = 'STACK_SUCCESS';
export const STACK_FAILURE = 'STACK_FAILURE';
export const STACK_CLEAR = 'STACK_CLEAR';
export const STACK_INITIALIZE = 'STACK_INITIALIZE';

export interface StackRequestAction {
    type: typeof STACK_REQUEST;
}

export interface StackSuccessAction {
    type: typeof STACK_SUCCESS;
    stack: List<StackDetailRecord>;
}

export interface StackFailureAction {
    type: typeof STACK_FAILURE;
    error: string;
}

export interface StackClearAction {
    type: typeof STACK_CLEAR;
}

export const stackRequest: () => StackRequestAction = () => ({
    type: STACK_REQUEST,
});

export const stackSuccess: (
    stack: List<StackDetailRecord>
) => StackSuccessAction = stack => ({ type: STACK_SUCCESS, stack });

export const stackFailure: (error: string) => StackFailureAction = error => ({
    type: STACK_FAILURE,
    error,
});

export const stackClear: () => StackClearAction = () => ({ type: STACK_CLEAR });

export const initializeStack = () => ({ type: STACK_INITIALIZE });

export type StackActionTypes = StackSuccessAction | StackClearAction;

const initialState: List<StackDetailRecord> = List();

// State
export default function stackListReducer(
    state = initialState,
    action: StackActionTypes
) {
    switch (action.type) {
        case STACK_SUCCESS:
            return fromJS(action.stack);
        case STACK_CLEAR:
            return List();
        default:
            return state;
    }
}
