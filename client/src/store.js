import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import Immutable from 'immutable';

// Sagas
import AddBookSaga from './AddBook/addBookSagas';
import AddCategorySaga from './AddCategory/addCategorySagas';
import AppSaga from './App/appSagas';
import AuthorDetailSaga from './AuthorDetail/authorDetailSagas';
import BookSearchSaga from './BookSearch/bookSearchSagas';
import PublisherDetailSaga from './PublisherDetail/publisherDetailSagas';
import StackDetailSaga from './StackDetail/stackDetailSagas';
import StackListSaga from './StackList/stackListSagas';

// Reducers
import publisherDetailStore from './PublisherDetail/publisherDetailModule';
import bookSearchStore from './BookSearch/bookSearchModule';
import addBookStore from './AddBook/addBookModule';
import addCategoryStore from './AddCategory/addCategoryModule';
import authorDetailStore from './AuthorDetail/authorDetailModule';
import stackDetailStore from './StackDetail/stackDetailModule';
import stackListStore from './StackList/stackListModule';
import appStore from './App/appModule';

const initializeStore = ({ apiUrl, staticPath }) => {
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
    const reducers = combineReducers({
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
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        {
            appStore: Immutable.Map({
                apiUrl,
                token: '',
                staticPath,
            }),
        },
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
    const history = syncHistoryWithStore(hashHistory, store);
    sagas.forEach(saga => sagaMiddleware.run(saga));
    return {
        store,
        history,
    };
};

export default initializeStore;
