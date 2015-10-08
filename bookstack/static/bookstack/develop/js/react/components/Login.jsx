var React = require('react');

var AppActions = require('../actions/AppActions.js');

var Login = React.createClass({
    getInitialState: function() {
        return {
            user: '',
            pass: '',
        };
    },
    handleUserChange: function(e) {
        this.setState({
            user: e.target.value
        });
    },
    handlePassChange: function(e) {
        this.setState({
            pass: e.target.value
        });
    },
    handleSubmit: function(e) {
        AppActions.login(this.state.user, this.state.pass);
    },
    render: function() {
        return (
            <div>
                <div>Username:
                    <input onChange={this.handleUserChange} type='text' value={this.state.user} />
                </div>
                <div>Password:
                    <input onChange={this.handlePassChange} type='text' value={this.state.pass} />
                </div>
                <button onClick={this.handleSubmit}>Login</button>
            </div>
        );
    }
});

module.exports = Login;