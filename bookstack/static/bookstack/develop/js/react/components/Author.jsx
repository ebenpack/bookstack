var React = require('react');

var Author = React.createClass({
    render: function() {
        return (
            <li className="author">
                {this.props.data}
            </li>
        );
    }
});

module.exports = Author;