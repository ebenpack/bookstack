import { render } from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';

import '../sass/react.scss';

import App from './components/App';
import StackList from './components/StackList';
import StackDetail from './components/StackDetail';
import AuthorDetail from './components/AuthorDetail';
import PublisherDetail from './components/PublisherDetail';
import BookSearch from './components/BookSearch';
import Login from './components/Login';

import reducers from './reducers/index';
import sagas from './sagas/index';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

function initializeStore(apiUrl) {
    const store = createStore(
        reducers,
        {
            appStore: Immutable.Map({ apiUrl, token: '' }),
        },
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
    const history = syncHistoryWithStore(hashHistory, store);
    sagaMiddleware.run(sagas);
    return {
        store,
        history,
    };
}

const AppRouter = ({ apiUrl }) => {
    const { store, history } = initializeStore(apiUrl);
    return (
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
};

AppRouter.propTypes = {
    apiUrl: propTypes.string.isRequired,
};

const start = (el, apiUrl) => render(<AppRouter apiUrl={apiUrl} />, document.querySelector(el));

export default start;
