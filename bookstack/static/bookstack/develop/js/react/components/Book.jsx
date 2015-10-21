var React = require('react');

var Author = require('./Author.jsx');
var Publisher = require('./Publisher.jsx');

var Book = React.createClass({
    render: function() {
        var staticPath = this.props.staticPath;
        var className = (this.props.className === undefined) ?
                "book four columns" : 
                this.props.className;
        return (
            <div className={className}>
                <img src={this.props.book.img ? this.props.book.img : staticPath + 'bookstack/images/defaultbook.jpg'} />
                <div className="info">
                    <div className="title">{this.props.book.title}</div>
                    By: <ul className="authors">{this.props.book.authors.map(function(author, i) {
                        return (<Author key={i} author={author} />);
                    })}</ul>
                    {this.props.book.publishers.map(function(publisher, i) {
                        return (<Publisher key={i} publisher={publisher} />);
                    })}
                    <div className="pages">{this.props.book.pages} pages</div>
                    <div className="isbn">ISBN: {this.props.book.isbn}</div>
                </div>
            </div>
        );
    }
});

module.exports = Book;