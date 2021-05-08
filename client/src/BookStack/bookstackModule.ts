import { Record, List } from "immutable";

import { ICategory } from "../Category/types";
import {
    CategoryRecord,
    CategoryDetailRecord,
} from "../Category/categoryModule";
import { BookRecord, BookParams } from "../Book/bookModule";
import { AuthorRecord } from "../AuthorDetail/authorDetailModule";
import { PublisherRecord } from "../PublisherDetail/publisherDetailModule";
import { IBookStack } from "./types";

export const defaultBookStackRecordValue = {
    id: 0,
    editing: false,
    removeConfirm: false,
    addingCategory: false,
    newPosition: 0,
    position: 0,
    read: false,
    size: 0,
    book: new BookRecord(),
    categories: List(),
};

export interface BookStackParams {
    id?: number;
    editing?: boolean;
    removeConfirm?: boolean;
    addingCategory?: boolean;
    newPosition?: number;
    position?: number;
    read?: boolean;
    size?: number;
    book?: BookRecord;
    categories?: List<ICategory>;
}

export class BookStackRecord
    extends Record(defaultBookStackRecordValue)
    implements IBookStack {
    constructor(params?: BookStackParams) {
        params ? super(params) : super();
    }
}

export const makeCategory = (category: ICategory): CategoryRecord =>
    new CategoryRecord({
        ...category,
        detail: new CategoryDetailRecord(category.detail),
    });

export const makeBook = (book: BookParams): BookRecord =>
    new BookRecord({
        ...book,
        authors: List(
            book.authors
                ? book.authors.map((author) => new AuthorRecord(author))
                : []
        ),
        publishers: List(
            book.publishers
                ? book.publishers.map(
                      (publisher) => new PublisherRecord(publisher)
                  )
                : []
        ),
    });

export const makeBookstack = (bookStack: BookStackParams): BookStackRecord =>
    new BookStackRecord({
        ...bookStack,
        book: bookStack.book ? makeBook(bookStack.book) : new BookRecord(),
        categories: List(
            bookStack.categories ? bookStack.categories.map(makeCategory) : []
        ),
    });
