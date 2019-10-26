import { Record, List, fromJS } from 'immutable';

import { IBook } from '../Book/types';
import { ICategory } from '../Category/types';
import { BookRecord } from '../Book/bookModule';

export interface IBookStack {
    id: number,
    editing: boolean,
    removeConfirm: boolean,
    addingCategory: boolean,
    newPosition: number,
    position: number,
    read: boolean
    size: number,
    book: BookRecord,
    categories: List<ICategory>
}

export const defaultBookStackRecordValue = {
    id: 0,
    editing: false,
    removeConfirm: false,
    addingCategory: false,
    newPosition: 0,
    position: 0,
    read: false,
    size: 0,
    book: new BookRecord(),
    categories: List()
};

type BookStackParams = {
    id?: number;
    editing?: boolean;
    removeConfirm?: boolean;
    addingCategory?: boolean;
    newPosition?: number;
    position?: number;
    read?: boolean;
    size?: number;
    book?: BookRecord;
    categories?: List<ICategory>;
}

export class BookStackRecord extends Record(defaultBookStackRecordValue) implements IBookStack {
    constructor(params?: BookStackParams) {
        params ? super(params) : super();
    }
}
