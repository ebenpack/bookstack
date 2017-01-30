import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book.jsx';
import Autocomplete from '../components/Autocomplete.jsx';

import {addBook, searchBooks, selectBook, clearSelected} from '../actions/AddBookActions';


function mapStateToProps(state) {
    return {
        apiUrl: state.appStore.get('apiUrl'),
        token: state.appStore.get('token'),
        state: state.addBookStore.get('state'),
        booksAutocomplete: state.addBookStore.get('booksAutocomplete'),
        selectedBook: state.addBookStore.get('selectedBook'),

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addBook: (apiUrl, token, bookId, stackId) => dispatch(addBook(apiUrl, token, bookId, stackId)),
        searchBooks: (apiUrl, query) => dispatch(searchBooks(apiUrl, query)),
        selectBook: (apiUrl, bookId) => dispatch(selectBook(apiUrl, bookId)),
        clearSelected: () => dispatch(clearSelected())
    };
}

class AddBook extends React.Component {

    handleChange(e) {
        let query = e.target.value;
        if (query) {
            this.props.searchBooks(this.props.apiUrl, query);
        } else {
            this.setState({
                booksAutocomplete: []
            });
        }
    }

    render() {
        let autocompleteResults = "";
        let selectedBook = "";
        if (this.props.booksAutocomplete.size > 0) {
            autocompleteResults = (
                <Autocomplete
                    suggestions={this.props.booksAutocomplete}
                    displayProperty={'title'}
                    onClick={bookId => this.props.selectBook(this.props.apiUrl, bookId)}
                />
            );
        }
        if (this.props.selectedBook.get('id')) {
            autocompleteResults = (
                <div className="select">
                    <div>
                        <a title="Close" className="close" onClick={(e) => this.props.clearSelected()}>X</a>
                        <Book className="" book={this.props.selectedBook}/>
                        <button onClick={e => this.props.addBook(
                            this.props.apiUrl,
                            this.props.token,
                            this.props.selectedBook.get('id'),
                            this.props.stackId
                        )}>
                            Add Book
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <input type="text" value={this.props.title} onChange={e=>this.handleChange(e)}/>
                {autocompleteResults}
                {selectedBook}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddBook);