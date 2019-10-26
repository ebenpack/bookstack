import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer, routerMiddleware, RouterState } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createBrowserHistory from 'history/createBrowserHistory';
import { History } from 'history';

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
import appStore, { initialize, setApiUrl, setStaticPath } from './App/appModule';

import { IAuthor } from './AuthorDetail/types';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void }
}

export const rootReducer = combineReducers({
    appStore,
    stackListStore,
    stackDetailStore,
    authorDetailStore,
    publisherDetailStore,
    bookSearchStore,
    addBookStore,
    addCategoryStore,
    router: routerReducer,
});

const initializeStore = ({ apiUrl, staticPath }: { apiUrl: string, staticPath: string }) => {
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
    const sagaMiddleware = createSagaMiddleware();
    const history = createBrowserHistory({ basename: '/app' });
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), sagaMiddleware)),
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

export type AppState = ReturnType<typeof rootReducer>

export default initializeStore;
