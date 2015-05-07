var React = require('react');

var Author = require('./Author.jsx');
var Publisher = require('./Publisher.jsx');

var Book = React.createClass({
    render: function() {
        var staticPath = this.props.staticPath;
        return (
            <div className="book">
                <img src={this.props.data.img ? this.props.data.img : staticPath + 'bookstack/images/defaultbook.jpg'} />
                <div className="info">
                    <div className="title">{this.props.data.title}</div>
                    By: <ul className="authors">{this.props.data.authors.map(function(author, i) {
                        return  <Author key={i} data={author} />
                    })}</ul>
                    {this.props.data.publishers.map(function(publisher, i) {
                        return  <Publisher key={i} data={publisher} />
                    })}
                    <div className="pages">{this.props.data.pages} pages</div>
                    <div className="isbn">ISBN: {this.props.data.isbn}</div>
                </div>
            </div>
        );
    }
});

module.exports = Book;