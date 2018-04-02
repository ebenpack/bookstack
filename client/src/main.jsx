import { render } from 'react-dom';
import React from 'react';
import 'babel-polyfill';
import initializeStore from './store';
import AppRouter from './router';
import '../sass/react.scss';

const runApp = async ({ el, staticPath, apiUrl }) => {
    const { store, history } = initializeStore({ apiUrl, staticPath });
    render(<AppRouter store={store} history={history} />, document.querySelector(el));
};

runApp(window.BOOTSTRAP_DATA);
