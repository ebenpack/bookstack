import React from 'react';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';
import { Router, Route } from 'react-router';

import '../sass/react.scss';

import App from './components/App';
import StackList from './components/StackList';
import StackDetail from './components/StackDetail';
import AuthorDetail from './components/AuthorDetail';
import PublisherDetail from './components/PublisherDetail';
import BookSearch from './components/BookSearch';
import Login from './components/Login';

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
