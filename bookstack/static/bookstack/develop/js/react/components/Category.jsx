var React = require('react');

var Category = React.createClass({
    render: function() {
        return (
            <li className="category">
                {this.props.data}
            </li>
        );
    }
});

module.exports = Category;