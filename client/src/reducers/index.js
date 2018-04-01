import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import publisherDetailStore from './PublisherDetail';
import bookSearchStore from './BookSearch';
import addBookStore from './AddBook';
import addCategoryStore from './AddCategory';
import authorDetailStore from './AuthorDetail';
import stackDetailStore from './StackDetail';
import stackListStore from './StackList';
import appStore from './App';

export default combineReducers({
    appStore,
    stackListStore,
    stackDetailStore,
    authorDetailStore,
    publisherDetailStore,
    bookSearchStore,
    addBookStore,
    addCategoryStore,
    routing: routerReducer,
});
