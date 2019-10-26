// eslint-disable-next-line import/prefer-default-export
export const pathNameSelector = state => (
    state.router && state.router.location && state.router.location.pathname
);
