import { Record } from 'immutable';

export interface IStack {
    id: number,
    name: string,
    user: string,
    creation_date: string
}

export interface IStackRecord extends Record<IStack>, IStack {}
