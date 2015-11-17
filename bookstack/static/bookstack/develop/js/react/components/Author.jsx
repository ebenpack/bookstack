var React = require('react');
var Link = require('react-router').Link;

var Author = React.createClass({
    render: function() {
        var author = this.props.author.id ?
            <Link to={"/author/" + this.props.author.id}>
                {this.props.author.name}
            </Link> :
            this.props.author.name;
        return (
            <li className="author">
                {author}
            </li>
        );
    }
});

module.exports = Author;