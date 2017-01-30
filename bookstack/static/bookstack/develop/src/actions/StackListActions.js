import reqwest from 'reqwest';

export function loadStackList(apiUrl) {
    return dispatch =>
        reqwest({
            url: apiUrl + '/api/stack/',
            contentType: 'application/json',
            type: 'json'
        }).then(stack =>
            dispatch({
                type: 'LOAD_STACK',
                stack
            }))
}
export function unloadStackList() {
    return dispatch =>
        dispatch({
            type: 'UNLOAD_STACK'
        });
}