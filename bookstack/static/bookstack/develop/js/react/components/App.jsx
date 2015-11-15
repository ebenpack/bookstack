var React = require('react');
var Reflux = require('reflux');

var History = require('react-router').History;

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var Link = require('react-router').Link;

var App = React.createClass({
    mixins: [
        Reflux.connect(AppStore),
        History
    ],
    getInitialState: function() {
        return {
            token: '',
            bookSearch: '',
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
    handleSearch: function(e) {
        this.setState({
            bookSearch: e.target.value,
        });
    },
    handleKeyUp: function(e) {
        if (e.key === 'Enter') {
            this.history.pushState({foobar: "baz"}, '/addbook');
        }
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
                    <li>
                        <label>
                            Add Book <input
                                type="text"
                                title={this.state.bookSearch}
                                onChange={this.handleSearch}
                                onKeyUp={this.handleKeyUp} />
                        </label>
                    </li>
                    {login}
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;