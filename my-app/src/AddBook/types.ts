import { List } from 'immutable';

import { IBook } from '../Book/types';


export interface IAddBook {
    selectedBook: IBook;
    booksAutocomplete: List<IBook>;
}
