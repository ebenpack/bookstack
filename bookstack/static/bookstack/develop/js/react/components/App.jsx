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
            search: '',
            searchFocus: false,
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
    handleKeyUp: function(e) {
        if (e.key === 'Enter') {
            this.history.pushState(null, '/booksearch?search=' + this.state.search);
        }
    },
    toggleFocus: function(e) {
        e.preventDefault();
        this.setState({
            searchFocus: !this.state.searchFocus,
        });
    },
    handleSearchChange: function(e) {
        var search = e.target.value;
        this.setState({
            search: search
        });
    },
    render: function() {
        var loggedIn = this.state.token !== '';
        var login = (
            loggedIn ?
            <li><a onClick={this.handleClick} href="#">Logoff</a></li> :
            <li><Link to={"/login"}>Login</Link></li>
        );
        var search = (
            this.state.searchFocus ?
            <label>Search<input
                type="text"
                value={this.state.search}
                onChange={this.handleSearchChange}
                onBlur={this.toggleFocus}
                onKeyUp={this.handleKeyUp} />
            </label> :
            <a href="#" onClick={this.toggleFocus}>Search Books</a>
        );
        return (
            <div className="container">
                <ul className="row menu">
                    <li><Link to={"/list"}>View Stacks</Link></li>
                    <li>
                        {search}
                    </li>
                    {login}
                </ul>
                {this.props.children}
            </div>
        );
    }
});

module.exports = App;