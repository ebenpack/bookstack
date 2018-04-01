import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

import { bookSearch as bookSearchActions } from '../BookSearch/bookSearchModule';
import { addBook } from '../AddBook/addBookModule';

function mapDispatchToProps(dispatch) {
    return {
        bookSearch: query => dispatch(bookSearchActions.request(query)),
        addBook: book => dispatch(addBook.request(book)),
    };
}

function mapStateToProps(state) {
    return {
        books: state.bookSearchStore.get('books'),
    };
}

class BookSearch extends React.Component {
    constructor() {
        super();
        this.state = {
            query: '',
        };
    }

    componentWillMount() {
        if (this.props.location && this.props.location.search) {
            const match = this.props.location.search.match(/\?search=([^&]*)/);
            const query = match && match[1] ? match[1] : '';
            if (query) {
                this.setState({
                    query,
                });
                this.props.bookSearch(query);
            }
        }
    }

    handleSearchChange(e) {
        const query = e.target.value;
        this.setState({
            query,
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
                        onChange={e => this.handleSearchChange(e)}
                    />
                </label>
                {this.props.books.map((book, idx) => {
                    const key = book.get('isbn') || idx;
                    return (
                        <div key={key} className="four columns">
                            <Book book={book} className="" />
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

BookSearch.defaultProps = {
    location: {
        search: '',
    },
};

BookSearch.propTypes = {
    books: immutablePropTypes.list.isRequired,
    bookSearch: propTypes.func.isRequired,
    addBook: propTypes.func.isRequired,
    location: propTypes.shape({
        search: propTypes.string,
    }),
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookSearch);
