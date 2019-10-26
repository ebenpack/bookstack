import { List, Record } from 'immutable';

import { IBook } from '../Book/types';

export interface IAuthor {
    id: number,
    name: string,
    books: List<IBook>
}

export interface IAuthorRecord extends Record<IAuthor>, IAuthor {}

