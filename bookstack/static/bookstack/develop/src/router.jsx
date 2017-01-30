import {render} from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';

import '../sass/react.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import appStore from './stores/AppStore';
import App from './components/App.jsx';

import stackListStore from './stores/StackListStore'
import StackList from './components/StackList.jsx';

import stackDetailStore from './stores/StackDetailStore'
import StackDetail from './components/StackDetail.jsx';

import AuthorDetail from './components/AuthorDetail.jsx';
import authorDetailStore from './stores/AuthorDetailStore';

import PublisherDetail from './components/PublisherDetail.jsx';
import publisherDetailStore from './stores/PublisherDetailStore';

import BookSearch from './components/BookSearch.jsx';
import bookSearchStore from './stores/BookSearchStore';

import addBookStore from './stores/AddBookStore';

import Login from './components/Login.jsx';


function initializeStore(apiUrl) {
    const reducers = combineReducers({
        appStore,
        stackListStore,
        stackDetailStore,
        authorDetailStore,
        publisherDetailStore,
        bookSearchStore,
        addBookStore,
    });
    return createStore(
        reducers,
        {
            appStore: Immutable.Map({apiUrl: apiUrl, token: ''})
        },
        composeEnhancers(
            applyMiddleware(thunkMiddleware)
        ),
    );
}

const AppRouter = (props) => (
    <Provider store={initializeStore(props.apiUrl)}>
        <Router history={browserHistory}>
            <Route
                path="/"
                component={App}
            >
                <Route
                    path="list"
                    component={StackList}
                />
                <Route
                    path="list/:id"
                    component={StackDetail}
                />
                <Route
                    path="login"
                    component={Login}
                />
                <Route
                    path="author/:id"
                    component={AuthorDetail}
                />
                <Route
                    path="publisher/:id"
                    component={PublisherDetail}
                />
                <Route
                    path="booksearch"
                    component={BookSearch}
                />
            </Route>
        </Router>
    </Provider>
);

const start = function (el, apiUrl) {
    render(
        <AppRouter apiUrl={apiUrl}/>,
        document.querySelector(el)
    );
};

export {start};