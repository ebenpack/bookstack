import reqwest from 'reqwest';

export function loadAuthor(apiUrl, id) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/author/${id}/`,
            contentType: 'application/json',
            type: 'json',
        }).then(resp =>
            dispatch({
                type: 'AUTHOR_LOAD',
                author: resp
            })
        )
}