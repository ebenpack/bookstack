var React = require('react');
var Reflux = require('reflux');
var Book = require('../components/Book.jsx');
var PublisherDetailStore = require('../stores/PublisherDetailStore');
var PublisherDetailActions = require('../actions/PublisherDetailActions');

var PublisherDetail = React.createClass({
    mixins: [Reflux.connect(PublisherDetailStore)],
    getInitialState: function() {
        return {
            publisher: {
                name: "",
                id: 0,
                books: [],
            },
        };
    },
    componentDidMount: function() {
        if (this.props.params.id) {
            PublisherDetailActions.loadPublisher(this.props.params.id);
        }
    },
    render: function() {
        return (
            <div className="author">
                <h2>{this.state.publisher.name}</h2>
                {this.state.publisher.books.map(function(book){
                    return (<Book key={book.id} book={book} />);
                })}
            </div>
        );
    }
});

module.exports = PublisherDetail;