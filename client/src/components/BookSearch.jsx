import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book.jsx';

import {bookSearch as bookSearchActions} from '../actions/BookSearch';
import {addBook} from '../actions/AddBook';

function mapDispatchToProps(dispatch) {
    return {
        bookSearch: query => dispatch(bookSearchActions.request(query)),
        addBook: book => dispatch(addBook.request(book))
    };
}

function mapStateToProps(state) {
    return {
        books: state.bookSearchStore.get('books'),
    }
}

class BookSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
        };
    }

    componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let match = this.props.location.search.match(/\?search=([^&]*)/);
            let query = match && match[1] ? match[1] : '';
            if (query) {
                this.setState({
                    query: query,
                });
                this.props.bookSearch(query);
            }
        }
    }

    handleSearchChange(e) {
        let query = e.target.value;
        this.setState({
            query: query
        });
        this.props.bookSearch(query);
    }

    handleSubmit(book) {
        this.props.addBook(book);
    }

    render() {
        return (
            <div className="bookSearch">
                <label>Search
                    <input
                        type="text"
                        value={this.state.query}
                        onChange={e => this.handleSearchChange(e)}/>
                </label>
                {this.props.books.map(function (book, idx) {
                    let key = book.get('isbn') || idx;
                    return (
                        <div key={key} className="four columns">
                            <Book book={book} className=""/>
                            <button
                                onClick={() => this.handleSubmit(book)}
                            >
                                Add Book
                            </button>
                        </div>
                    );
                }, this)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookSearch);