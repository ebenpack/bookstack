var React = require('react');
var Reflux = require('reflux');

var Book = require('./Book.jsx');

var BookSearchActions = require('../actions/BookSearchActions');
var BookSearchStore = require('../stores/BookSearchStore');

var BookSearch = React.createClass({
    mixins: [Reflux.connect(BookSearchStore)],
    getInitialState: function() {
        return {
            search: '',
            books: [],
        };
    },
    componentDidMount: function() {
        if (this.props.location && this.props.location.search) {
            var match = this.props.location.search.match(/\?search\=([^&]*)/);
            var search = match && match[1] ? match[1] : '';
            if (search) {
                this.setState({
                    search: search,
                });
                BookSearchActions.searchBooks(search);
            }
        }
    },
    handleSearchChange: function(e){
        var search = e.target.value;
        this.setState({
            search: search
        });
        BookSearchActions.searchBooks(search);
    },
    render: function() {
        return (
            <div>
                <label>Search
                    <input
                        type="text"
                        value={this.state.search}
                        onChange={this.handleSearchChange} />
                </label>
                {this.state.books.map(function(book, idx){
                    var key = book.isbn || idx;
                    return <Book key={key} book={book} />;
                }, this)}
            </div>
        );
    }
});

module.exports = BookSearch;