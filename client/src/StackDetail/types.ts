import { List } from "immutable";

import { IBook } from "../Book/types";
import { IStack } from "../Stack/types";

export interface IStackDetail extends IStack {
    id: number;
    name: string;
    private: boolean;
    user: string;
    creation_date: Date;
    books: List<IBook>;
}

export interface IFullStackDetail {
    stackDetail: IStackDetail;
    error: boolean;
    loading: boolean;
    editing: boolean;
}
