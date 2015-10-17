var React = require('react');
var Link = require('react-router').Link;

var Publisher = React.createClass({
    render: function() {
        return (
            <div className="publisher">
                <Link to={"/publisher/" + this.props.publisher.id}>
                    {this.props.publisher.name}
                </Link>
            </div>
        );
    }
});

module.exports = Publisher;