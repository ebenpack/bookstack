var React = require('react');

var Category = React.createClass({
    onClick: function(e) {
        if (this.props.onClick) {
            this.props.onClick(e, this.props.category.id);
        }
    },
    render: function() {
        return (
            <li key={this.props.category.id} className="category" onClick={this.onClick}>
                {this.props.category.category}
            </li>
        );
    }
});

module.exports = Category;