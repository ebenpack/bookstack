import * as React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

import {
    bookSearch as bookSearchActions,
    query as queryActions,
} from '../BookSearch/bookSearchModule';
import { addBook as addBookAction } from '../AddBook/addBookModule';

export const BookSearch = ({
    books,
    query,
    setQuery,
    bookSearch,
    addBook,
}) => (
    <div className="bookSearch">
        <div className="columns">
            <div className="column">
                <label>Search
                    <input
                        className="input"
                        type="text"
                        value={query}
                        onChange={(e) => {
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
                const key = book.get('isbn') || idx;
                return (
                    <div key={key} className="column is-half search-result">
                        <div className="box">
                            <Book book={book} className="" />
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

BookSearch.propTypes = {
    query: propTypes.string.isRequired,
    setQuery: propTypes.func.isRequired,
    books: immutablePropTypes.list.isRequired,
    bookSearch: propTypes.func.isRequired,
    addBook: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
    books: state.bookSearchStore.get('books'),
    query: state.bookSearchStore.get('query'),
});

const mapDispatchToProps = {
    setQuery: queryActions.set,
    bookSearch: bookSearchActions.request,
    addBook: addBookAction.request,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookSearch);
