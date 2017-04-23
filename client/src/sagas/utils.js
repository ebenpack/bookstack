
export const getCredentials = store => ({
    apiUrl: store.appStore.get('apiUrl'),
    token: store.appStore.get('token'),
});