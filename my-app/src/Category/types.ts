import { Record } from 'immutable';

export interface ICategoryDetail {
    category: string
}

export interface ICategoryDetailRecord extends Record<ICategoryDetail>, ICategoryDetail {}

export interface ICategory {
    id: number,
    detail: ICategoryDetailRecord,
}
  
export interface ICategoryRecord extends Record<ICategory>, ICategory {}
