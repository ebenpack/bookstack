import { AppState } from "../store";

// eslint-disable-next-line import/prefer-default-export
export const pathNameSelector = (state: AppState) => (
    state.router && state.router.location && state.router.location.pathname
);
