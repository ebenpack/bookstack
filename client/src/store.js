import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import Immutable from 'immutable';

import reducers from './reducers/index';
import sagas from './sagas/index';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const initializeStore = ({ apiUrl, staticPath }) => {
    const store = createStore(
        reducers,
        {
            appStore: Immutable.Map({
                apiUrl,
                token: '',
                staticPath,
            }),
        },
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
    const history = syncHistoryWithStore(hashHistory, store);
    sagas.forEach(saga => sagaMiddleware.run(saga));
    return {
        store,
        history,
    };
};

export default initializeStore;
