import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import { Router, Route } from 'react-router';

import '../sass/react.scss';

import App from './App/App';
import StackList from './StackList/StackList';
import StackDetail from './StackDetail/StackDetail';
import AuthorDetail from './AuthorDetail/AuthorDetail';
import PublisherDetail from './PublisherDetail/PublisherDetail';
import BookSearch from './BookSearch/BookSearch';
import Login from './Login/Login';

const AppRouter = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="list" component={StackList} />
                <Route path="list/:id" component={StackDetail} />
                <Route path="login" component={Login} />
                <Route path="author/:id" component={AuthorDetail} />
                <Route path="publisher/:id" component={PublisherDetail} />
                <Route path="booksearch" component={BookSearch} />
            </Route>
        </Router>
    </Provider>
);

AppRouter.propTypes = {
    store: propTypes.object.isRequired,
    history: propTypes.object.isRequired,
};

export default AppRouter;
