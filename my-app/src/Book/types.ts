import { List, Record } from 'immutable';

export interface IBook {
    id: number,
    img: string,
    authors: List<string>,
    title: string,
    pages: number,
    isbn: string,
}

export interface IBookRecord extends Record<IBook>, IBook {}
