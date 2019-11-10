import { List } from 'immutable';

import { IBook } from '../Book/types';

export interface IBookSearch {
    query: string;
    books: List<IBook>;
}
