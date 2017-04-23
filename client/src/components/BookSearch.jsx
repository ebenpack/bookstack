import React from 'react';
import {connect} from 'react-redux';

import Book from '../components/Book.jsx';

import {bookSearch, addBook} from '../actions/BookSearch';

function mapDispatchToProps(dispatch) {
    return {
        bookSearch: (apiUrl, query) => dispatch(bookSearch(apiUrl, query)),
        addBook: (apiUrl, token, book)=>dispatch(addBook(apiUrl, token, book))
    };
}

function mapStateToProps(state) {
    return {
        apiUrl: state.appStore.get('apiUrl'),
        token: state.appStore.get('token'),
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
            let match = this.props.location.search.match(/\?search\=([^&]*)/);
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

    handleSubmit(apiUrl, token, book) {
        this.props.addBook(apiUrl, token, book);
    }

    render() {
        let apiUrl = this.props.apiUrl;
        let token = this.props.token;
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
                        <div className="four columns">
                            <Book key={key} book={book} className="" />
                            <button
                                onClick={() => this.handleSubmit(apiUrl, token, book)}
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