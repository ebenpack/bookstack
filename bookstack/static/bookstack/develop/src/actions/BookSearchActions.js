import reqwest from 'reqwest';

export function addBook(apiUrl, token, book) {
    return dispatch =>
        reqwest({
            url: `${apiUrl}/api/book/`,
            contentType: 'application/json',
            type: 'json',
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + token,
            },
            data: JSON.stringify(book.toJS()),
        }).then(resp => {/*???*/});
}

export function bookSearch(query) {
    return dispatch => {
        let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        reqwest({
            url: googleBooksUrl,
            contentType: 'application/json',
            type: 'json',
        }).then(resp => {
            let books = [];
            if (resp.totalItems) {
                books = resp.items.map(function (book) {
                    return {
                        title: book.volumeInfo.title,
                        pages: book.volumeInfo.pageCount,
                        isbn: (book.volumeInfo.industryIdentifiers) ?
                            book.volumeInfo.industryIdentifiers.reduce(function (prev, ident) {
                                if (ident.type === "ISBN_10") {
                                    return ident.identifier;
                                } else if (!prev && ident.type === "ISBN_13") {
                                    return ident.identifier;
                                } else {
                                    return prev;
                                }
                            }, '') : undefined,
                        authors: book.volumeInfo.authors ? book.volumeInfo.authors.map(function (author) {
                            return {
                                name: author,
                            };
                        }): [],
                        img: (
                            book.volumeInfo.imageLinks &&
                            book.volumeInfo.imageLinks.smallThumbnail
                        ) ?
                            book.volumeInfo.imageLinks.smallThumbnail : undefined,
                        publishers: (
                            Array.isArray(book.volumeInfo.publisher) ?
                                book.volumeInfo.publisher :
                                [book.volumeInfo.publisher]
                        ).map(function (publisher) {
                            return {name: publisher}
                        }),
                    };
                });
            }
            dispatch({type: 'BOOKSEARCH_SET_BOOKS', books});
        });
    }
}