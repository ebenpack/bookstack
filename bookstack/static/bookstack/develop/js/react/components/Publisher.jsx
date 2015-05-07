var React = require('react');

var Publisher = React.createClass({
    render: function() {
        return (
            <div className="publisher">
                {this.props.data}
            </div>
        );
    }
});

module.exports = Publisher;