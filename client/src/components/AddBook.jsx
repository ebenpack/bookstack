import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book.jsx';
import Autocomplete from '../components/Autocomplete.jsx';

import {addBook, searchBooks, selectBook, clearSelected} from '../actions/AddBook';


function mapStateToProps(state) {
    return {
        state: state.addBookStore.get('state'),
        booksAutocomplete: state.addBookStore.get('booksAutocomplete'),
        selectedBook: state.addBookStore.get('selectedBook'),

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addBook: (bookId, stackId) => dispatch(addBook(bookId, stackId)),
        searchBooks: query => dispatch(searchBooks(query)),
        selectBook: bookId => dispatch(selectBook(bookId)),
        clearSelected: () => dispatch(clearSelected())
    };
}

const AddBook = ({booksAutocomplete, selectBook, clearSelected, selectedBook, addBook, searchBooks, title, stackId}) => {
    let autocompleteResults = "";
    if (booksAutocomplete.size > 0) {
        autocompleteResults = (
            <Autocomplete
                suggestions={booksAutocomplete}
                displayProperty={'title'}
                onClick={bookId => selectBook(bookId)}
            />
        );
    }
    if (selectedBook.get('id')) {
        autocompleteResults = (
            <div className="select">
                <div>
                    <a title="Close" className="close" onClick={clearSelected}>X</a>
                    <Book className="" book={selectedBook}/>
                    <button onClick={e => addBook(
                        selectedBook.get('id'),
                        stackId
                    )}>
                        Add Book
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <input type="text"
                   value={title}
                   onChange={e => searchBooks(e.target.value)}
            />
            {autocompleteResults}
            {selectedBook}
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBook);