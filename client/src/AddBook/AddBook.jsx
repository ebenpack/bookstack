import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';
import Autocomplete from '../Autocomplete/Autocomplete';

import * as addBookActions from './addBookModule';
import * as stackDetailActions from '../StackDetail/stackDetailModule';

export const AddBook = (props) => {
    const {
        booksAutocomplete,
        getBook,
        clearSelected,
        selectedBook,
        addBook,
        searchBooks,
        title,
        stackId,
    } = props;
    let autocompleteResults = '';
    if (booksAutocomplete.size > 0) {
        autocompleteResults = (
            <Autocomplete
                suggestions={booksAutocomplete}
                displayProperty="title"
                onClick={bookId => getBook(bookId)}
            />
        );
    }
    const bookId = selectedBook.get('id');
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
                        <Book className="" book={selectedBook} />
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

AddBook.propTypes = {
    booksAutocomplete: immutablePropTypes.list.isRequired,
    getBook: propTypes.func.isRequired,
    clearSelected: propTypes.func.isRequired,
    selectedBook: immutablePropTypes.map.isRequired,
    addBook: propTypes.func.isRequired,
    searchBooks: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    stackId: propTypes.number.isRequired,
};

const mapStateToProps = state => ({
    state: state.addBookStore.get('state'),
    booksAutocomplete: state.addBookStore.get('booksAutocomplete'),
    selectedBook: state.addBookStore.get('selectedBook'),
});

const mapDispatchToProps = {
    addBook: stackDetailActions.addBook.request,
    searchBooks: addBookActions.searchBooks.request,
    getBook: addBookActions.getBook.request,
    clearSelected: addBookActions.selectBook.clear,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AddBook);
