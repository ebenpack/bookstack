import { List } from 'immutable';

import { IBook } from '../Book/types';

export interface IAuthor {
    id: number,
    name: string,
    books: List<IBook>
}
