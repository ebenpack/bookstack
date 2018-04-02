import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router';

import { ConnectedRouter } from 'react-router-redux';

import App from './App/App';
import AuthorDetailRoute from './AuthorDetail/AuthorDetailRoute';
import BookSearchRoute from './BookSearch/BookSearchRoute';
import LoginRoute from './Login/LoginRoute';
import PublisherDetailRoute from './PublisherDetail/PublisherDetailRoute';
import StackListRoute from './StackList/StackListRoute';
import StackDetailRoute from './StackDetail/StackDetailRoute';

const AppWithRouter = withRouter(App);

const AppRouter = ({ store, history }) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppWithRouter>
                <StackDetailRoute />
                <StackListRoute />
                <LoginRoute />
                <AuthorDetailRoute />
                <PublisherDetailRoute />
                <BookSearchRoute />
            </AppWithRouter>
        </ConnectedRouter>
    </Provider>
);

AppRouter.propTypes = {
    store: propTypes.object.isRequired,
    history: propTypes.object.isRequired,
};

export default AppRouter;
