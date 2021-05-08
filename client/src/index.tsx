import { render } from "react-dom";
import * as React from "react";
import initializeStore from "./store";
import AppRouter from "./router";
import "./sass/react.scss";

export interface BootstrapData {
    el: string;
    staticPath: string;
    apiUrl: string;
}

declare global {
    interface Window {
        BOOTSTRAP_DATA: BootstrapData;
    }
}

const runApp = async ({ el, staticPath, apiUrl }: BootstrapData) => {
    const { store, history } = initializeStore({ apiUrl, staticPath });
    render(
        <React.Suspense fallback={<div>Loading...</div>}>
            <AppRouter store={store} history={history} />
        </React.Suspense>,
        document.querySelector(el)
    );
};

runApp(window.BOOTSTRAP_DATA);
