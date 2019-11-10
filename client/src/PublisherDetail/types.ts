import { IBook } from '../Book/types';
import { List } from 'immutable';

export interface IPublisher {
    id: number,
    name: string,
    books: List<IBook>
}
