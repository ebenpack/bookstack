import {
    combineReducers,
    createStore,
    applyMiddleware,
    AnyAction,
    Store,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    connectRouter,
    routerMiddleware,
    RouterState,
} from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";

// Sagas
import AddBookSaga from "./AddBook/addBookSagas";
import AddCategorySaga from "./AddCategory/addCategorySagas";
import AppSaga from "./App/appSagas";
import AuthorDetailSaga from "./AuthorDetail/authorDetailSagas";
import BookSearchSaga from "./BookSearch/bookSearchSagas";
import PublisherDetailSaga from "./PublisherDetail/publisherDetailSagas";
import StackDetailSaga from "./StackDetail/stackDetailSagas";
import StackListSaga from "./StackList/stackListSagas";

// Reducers
import publisherDetailStore, {
    PublisherRecord,
} from "./PublisherDetail/publisherDetailModule";
import bookSearchStore, {
    BookSearchRecord,
} from "./BookSearch/bookSearchModule";
import addBookStore, { AddBookRecord } from "./AddBook/addBookModule";
import addCategoryStore, {
    AddCategoryRecord,
} from "./AddCategory/addCategoryModule";
import authorDetailStore, {
    AuthorRecord,
} from "./AuthorDetail/authorDetailModule";
import stackDetailStore, {
    FullStackDetailRecord,
    StackDetailRecord,
} from "./StackDetail/stackDetailModule";
import stackListStore from "./StackList/stackListModule";
import appStore, {
    initialize,
    setApiUrl,
    setStaticPath,
    AppRecord,
} from "./App/appModule";
import { List } from "immutable";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void;
    }
}

const initializeStore = ({
    apiUrl,
    staticPath,
}: {
    apiUrl: string;
    staticPath: string;
}) => {
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
    const history = createBrowserHistory({ basename: "/app" });
    const rootReducer = combineReducers({
        appStore,
        stackListStore,
        stackDetailStore,
        authorDetailStore,
        publisherDetailStore,
        bookSearchStore,
        addBookStore,
        addCategoryStore,
        router: connectRouter(history),
    });
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(routerMiddleware(history), sagaMiddleware)
        )
    );
    store.dispatch(setApiUrl(apiUrl));
    store.dispatch(setStaticPath(staticPath));
    sagas.forEach((saga) => sagaMiddleware.run(saga));
    store.dispatch(initialize());
    return {
        store,
        history,
    };
};

export interface AppState {
    appStore: AppRecord;
    stackListStore: List<StackDetailRecord>;
    stackDetailStore: FullStackDetailRecord;
    authorDetailStore: AuthorRecord;
    publisherDetailStore: PublisherRecord;
    bookSearchStore: BookSearchRecord;
    addBookStore: AddBookRecord;
    addCategoryStore: AddCategoryRecord;
    router: RouterState;
}

export type AppStore = Store<AppState, AnyAction>;

export default initializeStore;
