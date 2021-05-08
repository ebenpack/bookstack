import { List } from "immutable";

import { BookRecord } from "../Book/bookModule";
import { IBook } from "../Book/types";

export interface IAddBook {
    selectedBook: BookRecord;
    booksAutocomplete: List<IBook>;
}
