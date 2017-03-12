import reqwest from 'reqwest';

export function searchBooks(apiUrl, query) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/book/?search=${query}`,
            contentType: 'application/json',
            type: 'json',
        }).then(resp =>
            dispatch({
                type: 'ADD_BOOK_AUTOCOMPLETE_SUGGESTIONS',
                booksAutocomplete: resp
            })
        );
}

export function selectBook(apiUrl, id) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/book/${id}/`,
            contentType: 'application/json',
            type: 'json',
        }).then(
            resp =>
                dispatch({
                    type: 'ADD_BOOK_SELECT_BOOK',
                    selectedBook: resp
                })
        );
}

export function addBook(apiUrl, token, bookId, stackId) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/bookset/`,
            contentType: 'application/json',
            type: 'json',
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            data: JSON.stringify({
                bookId: bookId,
                categories: [],
                stack: stackId
            })
        }).then(resp => {
                dispatch({
                    type: 'STACK_DETAIL_ADD_BOOK',
                    book: resp
                });
                dispatch({
                    type: 'ADD_BOOK_CLEAR_SELECTED'
                });
                dispatch({
                    type: 'STACK_DETAIL_TOGGLE_EDITING'
                });
            }
        );


}

export function clearSelected() {
    return dispatch =>
        dispatch({
            type: 'ADD_BOOK_CLEAR_SELECTED'
        });
}

export function addNewBook(apiUrl, token) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/bookset/`,
            contentType: 'application/json',
            type: 'json',
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
            },
            data: JSON.stringify(book.toJS())
        }).then(() =>
            // TODO: WHAT DO????
            // Probably need to dispatch(addBook(...))
            // But posting new book needs to be fixed on server-side first
            console.log('fetch complete')
        );
}