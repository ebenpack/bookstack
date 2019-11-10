import * as React from 'react';
import { connect } from 'react-redux';

import Book from '../Book/Book';

import {
    bookSearchRequest,
    bookSearchQuerySet,
} from '../BookSearch/bookSearchModule';
import { addBookRequest } from '../AddBook/addBookModule';
import { AppState } from '../store';
import { List } from 'immutable';
import { IBook } from '../Book/types';

interface PropsFromDispatch {
    setQuery: typeof bookSearchQuerySet;
    bookSearch: typeof bookSearchRequest;
    addBook: typeof addBookRequest;
}

interface PropsFromState {
    books: List<IBook>;
    query: string;
    staticPath: string;
}

type BookSearchProps = PropsFromDispatch & PropsFromState;

export class BookSearch extends React.Component<BookSearchProps> {
    render() {
        const {
            books,
            query,
            setQuery,
            bookSearch,
            addBook,
            staticPath,
        } = this.props;
        return (
            <div className="bookSearch">
                <div className="columns">
                    <div className="column">
                        <label>
                            Search
                            <input
                                className="input"
                                type="text"
                                value={query}
                                onChange={e => {
                                    const queryValue = e.target.value;
                                    setQuery(queryValue);
                                    bookSearch(queryValue);
                                }}
                            />
                        </label>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {books.map((book, idx) => {
                        const key = book.isbn || idx;
                        return (
                            <div
                                key={key}
                                className="column is-half search-result"
                            >
                                <div className="box">
                                    <Book book={book} staticPath={staticPath} />
                                    <button
                                        className="button"
                                        onClick={() => addBook(book)}
                                    >
                                        Add Book
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    books: state.bookSearchStore.get('books'),
    query: state.bookSearchStore.get('query'),
    staticPath: state.appStore.staticPath,
});

const mapDispatchToProps = {
    setQuery: bookSearchQuerySet,
    bookSearch: bookSearchRequest,
    addBook: addBookRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookSearch);
