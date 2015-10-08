var React = require('react');
var Reflux = require('reflux');

var AppStore = require('../stores/AppStore');

var Link = require('react-router').Link;

var App = React.createClass({
    mixins: [Reflux.connect(AppStore)],
    render: function() {
        return (
            <div>
                <ul>
                    <li><Link to={"/list"}>View Stacks</Link></li>
                    <li><Link to={"/login"}>Login</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;