var React = require('react');

var AppActions = require('../actions/AppActions.js');

var Login = React.createClass({
    getInitialState: function() {
        return {
            user: '',
            pass: '',
            save: true,
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
    handleSaveChange: function(e) {
        this.setState({
            save: e.target.checked
        });
    },
    handleSubmit: function(e) {
        AppActions.login(this.state.user, this.state.pass, this.state.save);
    },
    render: function() {
        return (
            <div>
                <div>Username:
                    <input onChange={this.handleUserChange} type='text' value={this.state.user} />
                </div>
                <div>Password:
                    <input onChange={this.handlePassChange} type='password' value={this.state.pass} />
                </div>
                <div>Stay logged in:
                    <input onChange={this.handleSaveChange} type='checkbox' checked='checked' />
                </div>
                <button onClick={this.handleSubmit}>Login</button>
            </div>
        );
    }
});

module.exports = Login;