import { List } from 'immutable';
import { ICategory } from '../Category/types';

export interface IAddCategory {
    autoSuggestCategories: List<ICategory>
}