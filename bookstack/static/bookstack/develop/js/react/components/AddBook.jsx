var React = require('react');
var Reflux = require('reflux');

var Book = require('../components/Book.jsx');

var AddBookActions = require('../actions/AddBookActions');
var AddBookStore = require('../stores/AddBookStore');

var AddBook = React.createClass({
    mixins: [Reflux.connect(AddBookStore)],
    getInitialState: function() {
        return {
            title: '',
            booksAutocomplete: [],
            selectedBook: {
                "title": "",
                "pages": "",
                "isbn": "",
                "img": "",
                "authors": [],
                "publishers": [],
                "id": ""
            },
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
    selectBook: function(bookId, e) {
        this.setState({
            booksAutocomplete: []
        });
        AddBookActions.selectBook(bookId);
    },
    clearSelected: function(){
        this.setState({
            selectedBook: {
                "title": "",
                "pages": "",
                "isbn": "",
                "img": "",
                "authors": [],
                "publishers": [],
                "id": ""
            },
        });
    },
    addBook: function(e) {
        var stackId = parseInt(this.props.stackId, 10);
        AddBookActions.addBook(this.state.selectedBook.id, stackId);
    },
    render: function() {
        var autocompleteResults = "";
        var selectedBook= "";
        if (this.state.booksAutocomplete.length > 0) {
            autocompleteResults = (
                <ul className="autocomplete">
                    {this.state.booksAutocomplete.map(function(suggestion){
                        return (<li key={suggestion.id} onClick={this.selectBook.bind(this, suggestion.id)}>{suggestion.title}</li>);
                    }, this)}
                </ul>
            );
        }
        if (this.state.selectedBook.id) {
            autocompleteResults = (
                <div className="select">
                    <div>
                        <a title="Close" className="close" onClick={this.clearSelected}>X</a>
                        <Book className="" book={this.state.selectedBook} />
                        <button onClick={this.addBook}>Add Book</button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <input type="text" title={this.state.title} onChange={this.handleChange} />
                {autocompleteResults}
                {selectedBook}
            </div>
        );
    }
});

module.exports = AddBook;