import { Record } from 'immutable';
import { ICategory, ICategoryDetail } from './types';

export const defaultCategoryDetailRecordValue = {
    id: 0,
    category: '',
};


export type CategoryDetailParams = {
    id?: number;
    category?: string;
};

export class CategoryDetailRecord extends Record(defaultCategoryDetailRecordValue) implements ICategoryDetail {
    constructor(params?: CategoryDetailParams) {
        params ? super(params) : super();
    }
    with(values: CategoryDetailParams) {
        return this.merge(values) as this;
    }
}

export const defaultCategoryRecordValue = {
    id: 0,
    detail: new CategoryDetailRecord()
};


export type CategoryParams = {
    id?: number;
    detail?: CategoryDetailRecord;
};

export class CategoryRecord extends Record(defaultCategoryRecordValue) implements ICategory {
    constructor(params?: CategoryParams) {
        params ? super(params) : super();
    }
    with(values: CategoryParams) {
        return this.merge(values) as this;
    }
}