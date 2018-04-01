import { fork } from 'redux-saga/effects';
import AddBookSaga from './AddBook';
import AddCategorySaga from './AddCategory';
import AppSaga from './App';
import AuthorDetailSaga from './AuthorDetail';
import BookSearchSaga from './BookSearch';
import PublisherDetailSaga from './PublisherDetail';
import StackDetailSaga from './StackDetail';
import StackListSaga from './StackList';


const sagas = [
    ...AddBookSaga,
    ...AddCategorySaga,
    ...AppSaga,
    ...AuthorDetailSaga,
    ...BookSearchSaga,
    ...PublisherDetailSaga,
    ...StackDetailSaga,
    ...StackListSaga,
];

export default function* rootSaga() {
    yield sagas.map(saga => fork(saga));
}
