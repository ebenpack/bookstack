import { List } from 'immutable';

import { IAuthor } from '../AuthorDetail/types';
import { IPublisher } from '../PublisherDetail/types';

export interface IBook {
    id: number,
    img: string,
    authors: List<IAuthor>,
    publishers: List<IPublisher>,
    title: string,
    pages: number,
    isbn: string,
    toJS: () => object;
}
