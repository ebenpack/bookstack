import { List, Record } from 'immutable';

import { IAuthor } from '../AuthorDetail/types';
import { IPublisher } from '../PublisherDetail/types';
import { IBook } from '../Book/types';

export interface IStackDetail {
    id: string;
    name: string;
    private: boolean;
    user: string;
    creation_date: Date;
    books: List<IBook>
};

export interface IFullStackDetail {
    stackDetail: IStackDetail;
    error: boolean;
    loading: boolean;
    editing: boolean;
}
