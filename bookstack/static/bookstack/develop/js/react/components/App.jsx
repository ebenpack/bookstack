var React = require('react');
var Reflux = require('reflux');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Link = require('react-router').Link;

var App = React.createClass({
    mixins: [Reflux.connect(AppStore)],
    getInitialState: function() {
        return {
            token: '',
        };
    },
    componentDidMount: function() {
        AppActions.getToken();
    },
    handleClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        AppActions.logoff();
    },
    render: function() {
        var loggedIn = this.state.token !== '';
        var login = (
            loggedIn ?
            <li><a onClick={this.handleClick} href="#">Logoff</a></li> :
            <li><Link to={"/login"}>Login</Link></li>
        );
        return (
            <div className="container">
                <ul className="row menu">
                    <li><Link to={"/list"}>View Stacks</Link></li>
                    {login}
                    <li><Link to={"/addbook"}>Add Book</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;