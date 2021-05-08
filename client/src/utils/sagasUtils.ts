import axios, { AxiosRequestConfig } from "axios";

import { AppState } from "../store";

export const getCredentials = (store: AppState) => ({
    apiUrl: store.appStore.apiUrl,
    token: store.appStore.token,
});

export const getCurrentTime = () => Date.now();

export function axiosCall(args: AxiosRequestConfig) {
    return axios(args);
}
