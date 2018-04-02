import Immutable from 'immutable';

import { makeAction, createRequestTypes, SET } from '../utils/moduleUtils';

// Actions

export const SET_EDITING = createRequestTypes('BOOKSTACK', 'EDITING', [SET]);
export const SET_REMOVE_CONFIRM = createRequestTypes('BOOKSTACK', 'REMOVE_CONFIRM', [SET]);
export const SET_ADDING_CATEGORY = createRequestTypes('BOOKSTACK', 'ADDING_CATEGORY', [SET]);
export const SET_NEW_POSITION = createRequestTypes('BOOKSTACK', 'NEW_POSITION', [SET]);

export const setEditing = editing => makeAction(SET_EDITING.SET, { editing });

export const setRemoveConfig = removeConfig => makeAction(SET_REMOVE_CONFIRM.SET, { removeConfig });

export const setAddingCategory = addingCategory => makeAction(SET_ADDING_CATEGORY.SET, { addingCategory });

export const setNewPosition = newPosition => makeAction(SET_NEW_POSITION.SET, { newPosition });

export const defaultState = new Immutable.Map({
    editing: null,
    newPosition: null,
    removeConfirm: false,
    addingCategory: false,
});

export default (state = defaultState, action) => {
    switch (action.type) {
    case SET_EDITING.SET:
        if (Number.isInteger(action.editing) || action.editing === null) {
            return state.set('editing', action.editing);
        }
        return state;
    case SET_REMOVE_CONFIRM.SET:
        return state.set('removeConfirm', Boolean(action.removeConfirm));
    case SET_ADDING_CATEGORY.SET:
        return state.set('addingCategory', Boolean(action.addingCategory));
    case SET_NEW_POSITION.SET:
        if (Number.isInteger(action.newPosition) || action.newPosition === null) {
            return state.set('newPosition', action.newPosition);
        }
        return state;
    default:
        return state;
    }
};
