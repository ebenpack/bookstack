var React = require('react');
var Reflux = require('reflux');
var Book = require('../components/Book.jsx');
var AuthorDetailStore = require('../stores/AuthorDetailStore');
var AuthorDetailActions = require('../actions/AuthorDetailActions');

var AuthorDetail = React.createClass({
    mixins: [Reflux.connect(AuthorDetailStore)],
    getInitialState: function() {
        return {
            author: {
                name: "",
                id: 0,
                books: [],
            },
        };
    },
    componentDidMount: function() {
        if (this.props.params.id) {
            AuthorDetailActions.loadAuthor(this.props.params.id);
        }
    },
    render: function() {
        return (
            <div className="author">
                <h2>{this.state.author.name}</h2>
                {this.state.author.books.map(function(book){
                    return (<Book key={book.id} book={book} />);
                })}
            </div>
        );
    }
});

module.exports = AuthorDetail;