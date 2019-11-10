import { List } from 'immutable';

import { ICategory } from '../Category/types';
import { BookRecord } from '../Book/bookModule';

export interface IBookStack {
    id: number;
    editing: boolean;
    removeConfirm: boolean;
    addingCategory: boolean;
    newPosition: number;
    position: number;
    read: boolean;
    size: number;
    book: BookRecord;
    categories: List<ICategory>;
}
