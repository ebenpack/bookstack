var React = require('react');
var Reflux = require('reflux');

var AddBookActions = require('../actions/AddBookActions');
var AddBookStore = require('../stores/AddBookStore');

var AddBook = React.createClass({
    mixins: [Reflux.connect(AddBookStore)],
    getInitialState: function() {
        return {
            title: '',
            booksAutocomplete: [],
        };
    },
    handleChange: function(e) {
        var search = e.target.value;
        if (search) {
            AddBookActions.searchBooks(search);
        } else {
            this.setState({
                booksAutocomplete: []
            });
        }
    },
    selectBook: function(id, e){
        // TODO: Do something here
        // Get this book, and autofill the form fields
    },
    render: function() {
        var autocompleteResults = "";
        if (this.state.booksAutocomplete.length > 0) {
            autocompleteResults = (
                <ul className="autocomplete">
                    {this.state.booksAutocomplete.map(function(suggestion){
                        return (<li key={suggestion.id} onClick={this.selectBook.bind(this, suggestion.id)}>{suggestion.title}</li>);
                    }, this)}
                </ul>
            );
        }
        return (
            <div>
            <input type="text" title={this.state.title} onChange={this.handleChange} />
            {autocompleteResults}
            </div>
        );
    }
// read (boolean),
// position (integer),
// book (BookSerializer),
// categories (array[string]),
// stack (string),
// id (integer)

// title (string),
// pages (integer),
// isbn (string),
// img (string),
// authors (array[AuthorSerializer]),
// publishers (array[PublisherSerializer]),
// id (integer)
// AuthorSerializer
// PublisherSerializer
});

module.exports = AddBook;