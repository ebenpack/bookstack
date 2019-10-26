import { Record, List } from 'immutable';

import { IBookRecord } from '../Book/types';
import { ICategoryRecord } from '../Category/types';

export interface IBookStack {
    id: number,
    editing: boolean,
    removeConfirm: boolean,
    addingCategory: boolean,
    newPosition: number,
    position: number,
    read: boolean
    size: number,
    book: IBookRecord,
    categories: List<ICategoryRecord>
}

export interface IBookStackRecord extends Record<IBookStack>, IBookStack {}
