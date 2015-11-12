var React = require('react');
var Reflux = require('reflux');

var Publisher = require('./Publisher.jsx');
var Author = require('./Author.jsx');
var Autocomplete = require('./Autocomplete.jsx');

var AddBook = React.createClass({
    getInitialState: function() {
        return {
            authorsAutocomplete: [],
            publishersAutocomplete: [],
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
    handleTitleChange: function(e){
        this.setState({
            title: e.target.value
        });
    },
    handlePagesChange: function(e){
        this.setState({
            pages: e.target.value
        });
    },
    handleIsbnChange: function(e){
        this.setState({
            isbn: e.target.value
        });
    },
    handleImageChange: function(e){
        this.setState({
            img: e.target.value
        });
    },
    handleAuthorChange: function(e){
        this.setState({
            authors: e.target.value
        });
    },
    handlePublisherChange: function(e){
        this.setState({
            publishers: e.target.value
        });
    },
    handleSubmit: function(e){
        this.setState({
            publishers: e.target.value
        });
    },
    render: function() {
        return (
            <div>
                <label>Title<input type="text" title={this.state.title} onChange={this.handleTitleChange} /></label>
                <label>Pages<input type="text" title={this.state.pages} onChange={this.handlePagesChange} /></label>
                <label>ISBN<input type="text" title={this.state.isbn} onChange={this.handleIsbnChange} /></label>
                <label>Image URL<input type="text" title={this.state.img} onChange={this.handleImageChange} /></label>
                <label>Authors<input type="text" title={this.state.authors} onChange={this.handleAuthorChange} /></label>
                <label>Publishers<input type="text" title={this.state.publishers} onChange={this.handlePublisherChange} /></label>
                <button onClick={handleSubmit}>Add</button>
            </div>
        );
    }
});

module.exports = AddBook;