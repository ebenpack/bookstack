import reqwest from 'reqwest';

export function addCategory(apiUrl, token, bookstackId, categoryId) {
    return dispatch => reqwest({
        url: `${apiUrl}/api/booksetcategory/`,
        type: 'json',
        contentType: 'application/json',
        method: "POST",
        headers: {
            'Authorization': `Token ${token}`,
        },
        data: JSON.stringify({
            bookstack: bookstackId,
            category: categoryId,
        })
    }).then(resp =>
        dispatch({
            type: 'STACK_DETAIL_ADD_CATAGORY',
            category: resp
        })
    );
}

export function addNewCategory(apiUrl, token, category, bookstackId) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/category/`,
            type: 'json',
            contentType: 'application/json',
            method: "POST",
            headers: {
                'Authorization': `Token ${token}`,
            },
            data: JSON.stringify({
                category: category
            })
        }).then(category =>
            dispatch(addCategory(apiUrl, token, bookstackId, category.id))
        );
}

export function setAutoSuggestCategories(apiUrl, query) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/category/?search=${query}`,
            type: 'json',
            contentType: 'application/json'
        }).then(resp =>
            dispatch({
                type: 'ADD_CATAGORY_AUTOCOMPLETE_SUGGESTIONS',
                autoSuggestCategories: resp
            })
        );
}

export function clearAutoSuggestCategories(){
    return dispatch =>
        dispatch({
            type: 'ADD_CATAGORY_CLEAR_AUTOCOMPLETE_SUGGESTIONS',
        });
}