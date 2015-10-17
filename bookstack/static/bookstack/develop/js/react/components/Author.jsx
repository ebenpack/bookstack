var React = require('react');
var Link = require('react-router').Link;

var Author = React.createClass({
    render: function() {
        return (
            <li className="author">
                <Link to={"/author/" + this.props.author.id}>
                    {this.props.author.name}
                </Link>
            </li>
        );
    }
});

module.exports = Author;