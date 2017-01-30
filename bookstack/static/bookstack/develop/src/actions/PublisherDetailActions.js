import reqwest from 'reqwest';

export function loadPublisher(apiUrl, id) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/publisher/${id}/`,
            contentType: 'application/json',
            type: 'json',
        }).then(publisher =>
            dispatch({
                type: 'PUBLISHER_LOAD',
                publisher
            })
        )
}