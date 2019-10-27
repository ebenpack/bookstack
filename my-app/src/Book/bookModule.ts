import { Record, List }  from 'immutable';

import { IBook } from './types';
import { IPublisher } from '../PublisherDetail/types';
import { IAuthor } from '../AuthorDetail/types';

export const defaultBookRecordValue = {
    id: 0,
    img: '',
    authors: List(),
    publishers: List(),
    title: '',
    pages: 0,
    isbn: '',
};

export type BookParams = {
    id?: number;
    img?: string;
    authors?: List<IAuthor>;
    publishers?: List<IPublisher>;
    title?: string;
    pages?: number;
    isbn?: string;
}

export class BookRecord extends Record(defaultBookRecordValue) implements IBook {
    constructor(params?: BookParams) {
        params ? super(params) : super();
    }
}
