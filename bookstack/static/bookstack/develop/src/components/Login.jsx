import React from 'react';

import {login} from '../actions/AppActions.js';

import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {
        apiUrl: state.appStore.get('apiUrl'),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (apiUrl, user, pass,save) => dispatch(login(apiUrl, user, pass, save))
    };
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pass: '',
            save: true,
        };
    }

    handleUserChange(e) {
        this.setState({
            user: e.target.value
        });
    }

    handlePassChange(e) {
        this.setState({
            pass: e.target.value
        });
    }

    handleSaveChange(e) {
        this.setState({
            save: e.target.checked
        });
    }

    handleSubmit() {
        this.props.login(this.props.apiUrl, this.state.user, this.state.pass, this.state.save);
    }

    render() {
        return (
            <div>
                <div>Username:
                    <input onChange={e => this.handleUserChange(e)} type='text' value={this.state.user}/>
                </div>
                <div>Password:
                    <input onChange={e =>this.handlePassChange(e)} type='password' value={this.state.pass}/>
                </div>
                <div>Stay logged in:
                    <input onChange={e => this.handleSaveChange(e)} type='checkbox' checked='checked'/>
                </div>
                <button onClick={e => this.handleSubmit(e)}>Login</button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);