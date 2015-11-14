var React = require('react');
var Reflux = require('reflux');

var Publisher = require('./Publisher.jsx');
var Author = require('./Author.jsx');
var Autocomplete = require('./Autocomplete.jsx');

var AddNewBookActions = require('../actions/AddNewBookActions');
var AddNewBookStore = require('../stores/AddNewBookStore');

var AddNewBook = React.createClass({
    mixins: [Reflux.connect(AddNewBookStore)],
    getInitialState: function() {
        return {
            authorsAutocomplete: [],
            publishersAutocomplete: [],
            bookAutocomplete: [],
            search: '',
            title: '',
            pages: '',
            isbn: '',
            img: '',
            author: '',
            publisher: '',
            authors: [],
            publishers: [],
        };
    },
    handleSearchChange: function(e){
        var search = e.target.value;
        this.setState({
            search: search
        });
        AddNewBookActions.searchBooks(search);
    },
    render: function() {
        return (
            <div>
                <label>Search<input type="text" title={this.state.search} onChange={this.handleSearchChange} /></label>
            </div>
        );
    }
});

module.exports = AddNewBook;