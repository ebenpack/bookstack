var React = require('react');

var Link = require('react-router').Link;

var App = React.createClass({
    render: function() {
        var staticPath = this.props.staticPath;
        return (
            <div>
                <ul>
                    <li><Link to={"/list"}>View Stacks</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;