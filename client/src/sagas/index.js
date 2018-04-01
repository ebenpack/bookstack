import { fork } from 'redux-saga/effects';
import AddBookSaga from './AddBook';
import AddCategorySaga from './AddCategory';
import AppSaga from './App';
import AuthorDetailSaga from './AuthorDetail';
import BookSearchSaga from './BookSearch';
import PublisherDetailSaga from './PublisherDetail';
import StackDetailSaga from './StackDetail';
import StackListSaga from './StackList';


export default [
    ...AddBookSaga,
    ...AddCategorySaga,
    ...AppSaga,
    ...AuthorDetailSaga,
    ...BookSearchSaga,
    ...PublisherDetailSaga,
    ...StackDetailSaga,
    ...StackListSaga,
];