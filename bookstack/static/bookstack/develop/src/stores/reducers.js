import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import publisherDetailStore from './PublisherDetailStore';
import bookSearchStore from './BookSearchStore';
import addBookStore from './AddBookStore';
import addCategoryStore from './AddCategoryStore';
import authorDetailStore from './AuthorDetailStore';
import stackDetailStore from './StackDetailStore'
import stackListStore from './StackListStore'
import appStore from './AppStore';

export default combineReducers({
    appStore,
    stackListStore,
    stackDetailStore,
    authorDetailStore,
    publisherDetailStore,
    bookSearchStore,
    addBookStore,
    addCategoryStore,
    routing: routerReducer
});