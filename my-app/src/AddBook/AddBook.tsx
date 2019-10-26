import * as React from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import Book from '../Book/Book';
import Autocomplete from '../Autocomplete/Autocomplete';
import { AppState } from '../store';
 
import {
    searchBooksRequest,
    getBookRequest,
    selectBookClear
} from './addBookModule';
import { stackDetailAddBookRequest } from '../StackDetail/stackDetailModule';
import { IBook } from '../Book/types';
import { BookRecord } from '../Book/bookModule';

interface PropsFromState {
    booksAutocomplete: List<any>;
    selectedBook: BookRecord;
}

interface PropsFromDispatch {
    addBook: typeof stackDetailAddBookRequest;
    searchBooks: typeof searchBooksRequest;
    getBook: typeof getBookRequest;
    clearSelected: typeof selectBookClear;
}

interface OwnProps {
    title: number;
    stackId: string;
}

type StackDetailProps = PropsFromState & PropsFromDispatch & OwnProps;

class AddBook extends React.Component<StackDetailProps> {
    render() {
        const {
            booksAutocomplete,
            getBook,
            clearSelected,
            selectedBook,
            addBook,
            searchBooks,
            title,
            stackId,
        } = this.props;
        let autocompleteResults = null;
        if (booksAutocomplete.size > 0) {
            autocompleteResults = (
                <Autocomplete
                    suggestions={booksAutocomplete}
                    displayProperty="title"
                    onClick={bookId => getBook(bookId)}
                />
            );
        }
        const bookId = selectedBook.id;
        if (bookId && bookId !== '') {
            autocompleteResults = (
                <div className="modal is-active">
                    <div className="modal-background" />
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <button
                                className="delete"
                                aria-label="close"
                                onClick={clearSelected}
                            />
                        </header>
                        <div className="modal-card-body">
                            <Book book={selectedBook} />
                        </div>
                        <footer className="modal-card-foot">
                            <button className="button" onClick={() => addBook(bookId, stackId)}>
                                Add Book
                            </button>
                        </footer>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <label>
                    <input
                        className="input"
                        type="text"
                        value={title}
                        onChange={e => searchBooks(e.target.value)}
                    />
                    {autocompleteResults}
                </label>
            </div>
        );
    };
}

const mapStateToProps = (state: AppState) => ({
    booksAutocomplete: state.addBookStore.booksAutocomplete,
    selectedBook: state.addBookStore.selectedBook,
});

const mapDispatchToProps = {
    addBook: stackDetailAddBookRequest,
    searchBooks: searchBooksRequest,
    getBook: getBookRequest,
    clearSelected: selectBookClear,
};

export const ConnectedAddBook = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddBook);

export default ConnectedAddBook;