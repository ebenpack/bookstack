import { render } from 'react-dom';
import React from 'react';
import 'babel-polyfill';
import initializeStore from './store';
import AppRouter from './router';

const runApp = async ({ el, staticPath, apiUrl }) => {
    const { store, history } = initializeStore({ apiUrl, staticPath });
    render(<AppRouter store={store} history={history} />, document.querySelector(el));
};

window.MyApp = {
    init: runApp,
};
