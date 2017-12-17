import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book.jsx';
import Autocomplete from '../components/Autocomplete.jsx';

import {searchBooks, getBook, selectBook} from '../actions/AddBook';
import {addBook} from '../actions/StackDetail';


function mapStateToProps(state) {
    return {
        state: state.addBookStore.get('state'),
        booksAutocomplete: state.addBookStore.get('booksAutocomplete'),
        selectedBook: state.addBookStore.get('selectedBook'),

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addBook: (bookId, stackId) => dispatch(addBook.request(bookId, stackId)),
        searchBooks: query => dispatch(searchBooks.request(query)),
        getBook: bookId => dispatch(getBook.request(bookId)),
        clearSelected: () => dispatch(selectBook.clear())
    };
}

const AddBook = ({booksAutocomplete, getBook, clearSelected, selectedBook, addBook, searchBooks, title, stackId}) => {
    let autocompleteResults = "";
    if (booksAutocomplete.size > 0) {
        autocompleteResults = (
            <Autocomplete
                suggestions={booksAutocomplete}
                displayProperty={'title'}
                onClick={bookId => getBook(bookId)}
            />
        );
    }
    let bookId = selectedBook.get('id');
    if (bookId && bookId !== '') {
        autocompleteResults = (
            <div className="select">
                <div>
                    <a title="Close" className="close" onClick={clearSelected}>X</a>
                    <Book className="" book={selectedBook}/>
                    <button onClick={e => addBook(
                        bookId,
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