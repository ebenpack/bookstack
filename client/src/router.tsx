import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { History } from "history";

import ConnectedApp from "./App/App";
import AuthorDetailRoute from "./AuthorDetail/AuthorDetailRoute";
import BookSearchRoute from "./BookSearch/BookSearchRoute";
import LoginRoute from "./Login/LoginRoute";
import PublisherDetailRoute from "./PublisherDetail/PublisherDetailRoute";
import StackListRoute from "./StackList/StackListRoute";
import StackDetailRoute from "./StackDetail/StackDetailRoute";
import { AppStore } from "./store";

interface AppRouterProps {
    store: AppStore;
    // tslint:disable-next-line: no-any
    history: History<any>;
}

const AppRouter = ({ store, history }: AppRouterProps) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConnectedApp>
                <StackDetailRoute />
                <StackListRoute />
                <LoginRoute />
                <AuthorDetailRoute />
                <PublisherDetailRoute />
                <BookSearchRoute />
            </ConnectedApp>
        </ConnectedRouter>
    </Provider>
);

export default AppRouter;
