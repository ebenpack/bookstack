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
            <div className="select">
                <div>
                    <a title="Close" className="close" onClick={clearSelected}>X</a>
                    <Book className="" book={selectedBook} />
                    <button onClick={() => addBook(bookId, stackId)}>
                        Add Book
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={e => searchBooks(e.target.value)}
            />
            {autocompleteResults}
            {selectedBook}
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
