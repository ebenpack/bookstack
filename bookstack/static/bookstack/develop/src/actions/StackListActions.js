import reqwest from 'reqwest';

export function loadStackList(apiUrl) {
    return dispatch =>
        reqwest({
            url: apiUrl + '/api/stack/',
            contentType: 'application/json',
            type: 'json'
        }).then(resp => dispatch({type: 'LOAD_STACK', value: resp}))
}
export const unloadStackList = {
    type: 'UNLOAD_STACK'
};