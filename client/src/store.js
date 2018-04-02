import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';

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
import bookStackStore from './BookStack/bookStackModule';
import addBookStore from './AddBook/addBookModule';
import addCategoryStore from './AddCategory/addCategoryModule';
import authorDetailStore from './AuthorDetail/authorDetailModule';
import stackDetailStore from './StackDetail/stackDetailModule';
import stackListStore from './StackList/stackListModule';
import appStore, { initialize, setApiUrl, setStaticPath } from './App/appModule';

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
        bookStackStore,
        addBookStore,
        addCategoryStore,
        router: routerReducer,
    });
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const history = createBrowserHistory({ basename: '/app' });
    const middleware = [sagaMiddleware, routerMiddleware(history)];
    const store = createStore(
        reducers,
        composeEnhancers(applyMiddleware(...middleware)),
    );
    store.dispatch(setApiUrl(apiUrl));
    store.dispatch(setStaticPath(staticPath));
    sagas.forEach(saga => sagaMiddleware.run(saga));
    store.dispatch(initialize());
    return {
        store,
        history,
    };
};

export default initializeStore;
