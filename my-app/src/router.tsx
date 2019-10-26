import * as React from 'react';
import { Provider } from 'react-redux';
import * as propTypes from 'prop-types';
import { withRouter } from 'react-router';

import { ConnectedRouter } from 'react-router-redux';

import ConnectedApp from './App/App';
import AuthorDetailRoute from './AuthorDetail/AuthorDetailRoute';
import BookSearchRoute from './BookSearch/BookSearchRoute';
import LoginRoute from './Login/LoginRoute';
import PublisherDetailRoute from './PublisherDetail/PublisherDetailRoute';
import StackListRoute from './StackList/StackListRoute';
import StackDetailRoute from './StackDetail/StackDetailRoute';

const ConnectedAppWithRouter = withRouter(ConnectedApp);

const AppRouter = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ConnectedAppWithRouter>
                <StackDetailRoute />
                <StackListRoute />
                <LoginRoute />
                <AuthorDetailRoute />
                <PublisherDetailRoute />
                <BookSearchRoute />
            </ConnectedAppWithRouter>
        </ConnectedRouter>
    </Provider>
);

AppRouter.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    store: propTypes.object.isRequired,
    history: propTypes.object.isRequired,
    /* eslint-enable react/forbid-prop-types */
};

export default AppRouter;
